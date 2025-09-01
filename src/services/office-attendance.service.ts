import { OfficeAttendanceType, STATUS } from "@/typescript";
import db from "@/prisma/client";
import { HttpException } from "@/utils/HttpException.utils";
import { formatDate, formatTime } from "@/utils/dateTime.utils";

class OfficeAttendanceService {
   protected static addOfficeAttendanceService = async (attendance: OfficeAttendanceType) => {
      console.log("🟢 [OfficeAttendanceService] Adding new office attendance:", attendance);

      try {
         // Check if office exists
         const officeExists = await db.offices.findFirst({
            where: { Id: attendance.office_Id },
         });
         if (!officeExists) {
            console.error("❌ [OfficeAttendanceService] Office not found with Id:", attendance.office_Id);
            throw new HttpException(STATUS.BAD_REQUEST, "Office does not exist");
         }
         console.log("✅ [OfficeAttendanceService] Office exists:", officeExists.office_english_name);

         const result = await db.offices_attendance.create({
            data: {
               ...attendance,
               createdAt: new Date(),
               updatedAt: new Date()
            },
         });

         console.log("🎉 [OfficeAttendanceService] Office attendance saved successfully:", result.Id);
         return result;

      } catch (error: any) {
         console.error("💥 [OfficeAttendanceService] Error adding office attendance:", error.message || error);
         throw new HttpException(STATUS.BAD_REQUEST, "Failed to add office attendance");
      }
   }

   protected static viewOfficeAttendancesService = async () => {
      console.log("🟡 [OfficeAttendanceService] Fetching all office attendances...");

      try {
         const results = await db.offices_attendance.findMany({
            include: {
               offices: {
                  select: {
                     office_english_name: true,
                     office_arabic_name: true,
                     latitude: true,
                     longitude: true
                  }
               }
            },
            orderBy: {
               createdAt: 'desc'
            }
         });

         // Get user details for each attendance record
         const attendanceWithUsers = await Promise.all(
            results.map(async (attendance) => {
               // Find the user by emp_Id (which should match person_Id)
               const user = await db.users.findFirst({
                  where: { emp_Id: attendance.person_Id },
                  include: {
                     users_roles: {
                        select: {
                           role_name: true
                        }
                     }
                  }
               });

               return {
                  ...attendance,
                  user: user ? {
                     Id: user.Id,
                     emp_Id: user.emp_Id,
                     emp__eng_name: user.emp__eng_name,
                     emp__arabic_name: user.emp__arabic_name,
                     gender: user.gender,
                     country_code: user.country_code,
                     phone: user.phone,
                     email: user.email,
                     dep_eng_name: user.dep_eng_name,
                     dep_arabic_name: user.dep_arabic_name,
                     desig_eng_name: user.desig_eng_name,
                     desig_arabic_name: user.desig_arabic_name,
                     unit_eng_name: user.unit_eng_name,
                     unit_arabic_name: user.unit_arabic_name,
                     committe_eng_name: user.committe_eng_name,
                     committe_arabic_name: user.committe_arabic_name,
                     ai_engine_access: user.ai_engine_access,
                     last_login: user.last_login,
                     role: user.users_roles?.role_name,
                     createdAt: user.createdAt,
                     updatedAt: user.updatedAt
                  } : null
               };
            })
         );

         // Format the dates and times
         const formattedResults = attendanceWithUsers.map(attendance => ({
            ...attendance,
            check_in_date: formatDate(attendance.check_in_date),
            check_in_time: formatTime(attendance.check_in_time),
            check_out_date: formatDate(attendance.check_out_date),
            check_out_time: formatTime(attendance.check_out_time)
         }));

         console.log(`📦 [OfficeAttendanceService] Retrieved ${formattedResults.length} office attendances with user details.`);
         return formattedResults;

      } catch (error: any) {
         console.error("💥 [OfficeAttendanceService] Error fetching office attendances:", error.message || error);
         throw new HttpException(STATUS.BAD_REQUEST, "Failed to fetch office attendances");
      }
   }
}

export default OfficeAttendanceService; 