import { ParkAttendanceType, STATUS } from "@/typescript";
import db from "@/prisma/client";
import { HttpException } from "@/utils/HttpException.utils";
import { formatDate, formatTime } from "@/utils/dateTime.utils";
import { format } from "date-fns";

class ParkAttendanceService {
   protected static addParkAttendanceService = async (attendance: ParkAttendanceType) => {
      console.log("🟢 [ParkAttendanceService] Adding new park attendance:", attendance);

      try {
         // Check if park exists
         const parkExists = await db.parks.findFirst({
            where: { Id: attendance.park_Id },
         });
         if (!parkExists) {
            console.error("❌ [ParkAttendanceService] Park not found with Id:", attendance.park_Id);
            throw new HttpException(STATUS.BAD_REQUEST, "Park does not exist");
         }
         console.log("✅ [ParkAttendanceService] Park exists:", parkExists.park_english_name);

         const result = await db.parks_attendance.create({
            data: {
               ...attendance,
               createdAt: new Date(),
               updatedAt: new Date()
            },
         });

         console.log("🎉 [ParkAttendanceService] Park attendance saved successfully:", result.Id);
         return result;

      } catch (error: any) {
         console.error("💥 [ParkAttendanceService] Error adding park attendance:", error.message || error);
         throw new HttpException(STATUS.BAD_REQUEST, "Failed to add park attendance");
      }
   }

   protected static viewParkAttendancesService = async () => {
      console.log("🟡 [ParkAttendanceService] Fetching summarized park attendances...");
    
      try {
        // First, fetch all park attendance records with park details
        const results = await db.parks_attendance.findMany({
          include: {
            parks: {
              select: {
                park_english_name: true,
                park_arabic_name: true,
                latitude: true,
                longitude: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        });
    
        // Get all unique person IDs from the results
        const personIds: string[] = [];
        results.forEach(att => {
          if (att.person_Id && !personIds.includes(att.person_Id)) {
            personIds.push(att.person_Id);
          }
        });
        
        // Fetch all users in a single query
        const users = await db.users.findMany({
          where: { 
            emp_Id: { 
              in: personIds.length > 0 ? personIds : [''] 
            } 
          },
        });
    
        // Create a map for quick user lookup
        const userMap = new Map();
        users.forEach(user => {
          userMap.set(user.emp_Id, user);
        });
    
        // Function to handle time conversion from UTC to local time correctly
        const convertTimeToString = (timeValue: any, originalTimeString?: string): string => {
          if (!timeValue) return "--";
          
          // If we have the original time string from database, use it directly
          if (originalTimeString && typeof originalTimeString === 'string') {
            return originalTimeString;
          }
          
          // If it's already a string, return it
          if (typeof timeValue === 'string') {
            return timeValue;
          }
          
          // If it's a Date object, handle the timezone conversion
          if (timeValue instanceof Date) {
            // For time values, we want to return the original UTC time
            const utcHours = timeValue.getUTCHours().toString().padStart(2, '0');
            const utcMinutes = timeValue.getUTCMinutes().toString().padStart(2, '0');
            const utcSeconds = timeValue.getUTCSeconds().toString().padStart(2, '0');
            return `${utcHours}:${utcMinutes}:${utcSeconds}`;
          }
          
          return "--";
        };
    
        // Function to convert Date objects back to date strings
        const convertDateToString = (dateValue: any): string => {
          if (!dateValue) return "No date";
          
          // If it's already a string, return it
          if (typeof dateValue === 'string') {
            return dateValue;
          }
          
          // If it's a Date object, format it as YYYY-MM-DD using UTC date
          if (dateValue instanceof Date) {
            const year = dateValue.getUTCFullYear();
            const month = (dateValue.getUTCMonth() + 1).toString().padStart(2, '0');
            const day = dateValue.getUTCDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
          }
          
          return "No date";
        };
    
        // Format date for display
        const formatDateForDisplay = (dateString: string): string => {
          if (!dateString || dateString === "No date") return "No date";
          
          try {
            const [year, month, day] = dateString.split('-');
            const monthNames = [
              "January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"
            ];
            
            const monthIndex = parseInt(month) - 1;
            if (monthIndex < 0 || monthIndex > 11) return dateString;
            
            return `${parseInt(day)} ${monthNames[monthIndex]} ${year}`;
          } catch (error) {
            return dateString;
          }
        };
    
        // Function to calculate time difference in minutes
        const calculateTimeDifference = (startTime: string, endTime: string): number => {
          if (!startTime || !endTime || startTime === "--" || endTime === "--") return 0;
          
          try {
            const [startHours, startMinutes, startSeconds] = startTime.split(':').map(Number);
            const [endHours, endMinutes, endSeconds] = endTime.split(':').map(Number);
            
            const startTotalMinutes = startHours * 60 + startMinutes + startSeconds / 60;
            const endTotalMinutes = endHours * 60 + endMinutes + endSeconds / 60;
            
            return Math.max(0, endTotalMinutes - startTotalMinutes);
          } catch (error) {
            return 0;
          }
        };
    
        // Group by person_Id safely
        const grouped: Record<string, any[]> = {};
        results.forEach((att) => {
          const key = att.person_Id ?? "UNKNOWN_USER";
          if (!grouped[key]) grouped[key] = [];
          
          // Add user info to each attendance record
          const user = userMap.get(att.person_Id);
          grouped[key].push({ ...att, user });
        });
    
        // Transform each group into summary object
        const summaries = Object.values(grouped).map((records: any[]) => {
          const personId = records[0].person_Id;
          const user = records[0].user;
          
          // Use the raw database values if available, otherwise convert from Date objects
          const firstEntry = convertTimeToString(records[0]?.check_in_time, records[0]?.check_in_time);
          const finalExit = convertTimeToString(records[records.length - 1]?.check_out_time, records[records.length - 1]?.check_out_time);
          const rawDate = convertDateToString(records[0]?.check_in_date);
          const formattedDate = formatDateForDisplay(rawDate);
    
          // Calculate actual working time based on check-in and check-out times
          let totalWorkingMinutes = 0;
          
          // Calculate total time spent for all entries
          records.forEach(record => {
            if (record.check_in_time && record.check_out_time) {
              const checkInTime = convertTimeToString(record.check_in_time, record.check_in_time);
              const checkOutTime = convertTimeToString(record.check_out_time, record.check_out_time);
              totalWorkingMinutes += calculateTimeDifference(checkInTime, checkOutTime);
            }
          });
    
          // Convert minutes to hours and minutes
          const workingHours = Math.floor(totalWorkingMinutes / 60);
          const workingMinutes = totalWorkingMinutes % 60;
          const totalWorkingHours = workingHours + (workingMinutes / 60);
    
          // Calculate percentages (assuming 8-hour work day as standard)
          const standardWorkDayHours = 8;
          const workingPercent = Math.min(100, Math.round((totalWorkingHours / standardWorkDayHours) * 100));
          
          // For break time, we can assume some logic based on working patterns
          // For simplicity, let's assume 10% break time of total working time
          const breakMinutes = Math.round(totalWorkingMinutes * 0.1);
          const breakPercent = 10; // Fixed percentage for simplicity
    
          // Determine status based on current time and last activity
          const currentTime = new Date();
          const currentHours = currentTime.getHours();
          const isWorkingHours = currentHours >= 9 && currentHours < 17; // 9 AM to 5 PM
          const status = isWorkingHours ? "Working" : "Off Duty";
          const breakStatus = breakMinutes > 0 ? "On Break" : "No Break";
    
          // Determine if user is employee or visitor
          const isEmployee = personId.startsWith('EMP');
          const displayName = user?.emp__eng_name || user?.emp__arabic_name || 
                             (isEmployee ? `Employee ${personId}` : `Visitor ${personId}`);
    
          return {
            id: personId,
            name: displayName,
            status: records[records.length - 1]?.check_out_time ? "Outside" : "Inside",
            avatarUrl: user?.avatarUrl || `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 50)}.jpg`,
            department: user?.dep_eng_name || user?.dep_arabic_name || (isEmployee ? "Unknown Department" : "Visitor"),
            date: formattedDate,
            firstEntry: firstEntry,
            entryCount: records.length,
            finalExit: finalExit,
            exitCount: records.filter((r) => r.check_out_time).length,
            summary: {
              workingPercent: workingPercent,
              workingHours: parseFloat(totalWorkingHours.toFixed(1)),
              breakPercent: breakPercent,
              breakMinutes: breakMinutes,
              status: status,
              breakStatus: breakStatus,
            },
          };
        });
    
        console.log(`📦 [ParkAttendanceService] Built ${summaries.length} summarized attendances.`);
        return summaries;
    
      } catch (error: any) {
        console.error("💥 [ParkAttendanceService] Error fetching summarized attendances:", error.message || error);
        throw new HttpException(STATUS.BAD_REQUEST, "Failed to fetch park attendances summary");
      }
    }
}

export default ParkAttendanceService; 