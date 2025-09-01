import { STATUS } from "@/typescript";
import db from "@/prisma/client";
import { HttpException } from "@/utils/HttpException.utils";
import { formatDate, formatTime } from "@/utils/dateTime.utils";

class UserService {
   protected static getUserDetailsWithAttendanceService = async (personId: string) => {
      console.log("🟢 [UserService] Getting user details with attendance for personId:", personId);

      try {
         // First, find the user by emp_Id (which should match personId)
         const user = await db.users.findFirst({
            where: { emp_Id: personId },
            include: {
               users_roles: {
                  select: {
                     role_name: true
                  }
               }
            }
         });

         if (!user) {
            console.error("❌ [UserService] User not found with emp_Id:", personId);
            throw new HttpException(STATUS.BAD_REQUEST, "User does not exist");
         }
         console.log("✅ [UserService] User found:", user.emp__eng_name);

         // Get office attendance records for this person
         const officeAttendance = await db.offices_attendance.findMany({
            where: { person_Id: personId },
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

         console.log(`✅ [UserService] Found ${officeAttendance.length} office attendance records`);

         // Format the office attendance data
         const formattedOfficeAttendance = officeAttendance.map(attendance => ({
            ...attendance,
            check_in_date: formatDate(attendance.check_in_date),
            check_in_time: formatTime(attendance.check_in_time),
            check_out_date: formatDate(attendance.check_out_date),
            check_out_time: formatTime(attendance.check_out_time)
         }));

         // Get park attendance records for this person
         const parkAttendance = await db.parks_attendance.findMany({
            where: { person_Id: personId },
            include: {
               parks: {
                  select: {
                     park_english_name: true,
                     park_arabic_name: true,
                     latitude: true,
                     longitude: true
                  }
               }
            },
            orderBy: {
               createdAt: 'desc'
            }
         });

         console.log(`✅ [UserService] Found ${parkAttendance.length} park attendance records`);

         // Format the park attendance data
         const formattedParkAttendance = parkAttendance.map(attendance => ({
            ...attendance,
            check_in_date: formatDate(attendance.check_in_date),
            check_in_time: formatTime(attendance.check_in_time),
            check_out_date: formatDate(attendance.check_out_date),
            check_out_time: formatTime(attendance.check_out_time)
         }));

         // Get office sentiment analysis records for this person
         const officeSentimentAnalysis = await db.offices_sentiment_analysis.findMany({
            where: { person_Id: personId },
            include: {
               offices: {
                  select: {
                     office_english_name: true,
                     office_arabic_name: true,
                     latitude: true,
                     longitude: true
                  }
               },
               offices_cameras_offices_sentiment_analysis_entry_camera_IdTooffices_cameras: {
                  select: {
                     camera_english_name: true,
                     camera_arabic_name: true,
                     ip_address: true
                  }
               },
               offices_cameras_offices_sentiment_analysis_exit_camera_IdTooffices_cameras: {
                  select: {
                     camera_english_name: true,
                     camera_arabic_name: true,
                     ip_address: true
                  }
               }
            },
            orderBy: {
               createdAt: 'desc'
            }
         });

         console.log(`✅ [UserService] Found ${officeSentimentAnalysis.length} office sentiment analysis records`);

         // Format the office sentiment analysis data
         const formattedOfficeSentimentAnalysis = officeSentimentAnalysis.map(record => ({
            ...record,
            check_in_date: formatDate(record.check_in_date),
            check_in_time: formatTime(record.check_in_time),
            check_out_date: formatDate(record.check_out_date),
            check_out_time: formatTime(record.check_out_time)
         }));

         // Get park sentiment analysis records for this person
         const parkSentimentAnalysis = await db.parks_sentiment_analysis.findMany({
            where: { person_Id: personId },
            include: {
               parks: {
                  select: {
                     park_english_name: true,
                     park_arabic_name: true,
                     latitude: true,
                     longitude: true
                  }
               },
               park_cameras_parks_sentiment_analysis_entry_camera_IdTopark_cameras: {
                  select: {
                     camera_english_name: true,
                     camera_arabic_name: true,
                     ip_address: true
                  }
               },
               park_cameras_parks_sentiment_analysis_exit_camera_IdTopark_cameras: {
                  select: {
                     camera_english_name: true,
                     camera_arabic_name: true,
                     ip_address: true
                  }
               }
            },
            orderBy: {
               createdAt: 'desc'
            }
         });

         console.log(`✅ [UserService] Found ${parkSentimentAnalysis.length} park sentiment analysis records`);

         // Format the park sentiment analysis data
         const formattedParkSentimentAnalysis = parkSentimentAnalysis.map(record => ({
            ...record,
            check_in_date: formatDate(record.check_in_date),
            check_in_time: formatTime(record.check_in_time),
            check_out_date: formatDate(record.check_out_date),
            check_out_time: formatTime(record.check_out_time)
         }));

         // Compile the complete user details with all attendance records
         const userDetailsWithAttendance = {
            user: {
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
            },
            office_attendance: formattedOfficeAttendance,
            park_attendance: formattedParkAttendance,
            office_sentiment_analysis: formattedOfficeSentimentAnalysis,
            park_sentiment_analysis: formattedParkSentimentAnalysis,
            summary: {
               total_office_attendance: formattedOfficeAttendance.length,
               total_park_attendance: formattedParkAttendance.length,
               total_office_sentiment_records: formattedOfficeSentimentAnalysis.length,
               total_park_sentiment_records: formattedParkSentimentAnalysis.length
            }
         };

         console.log("🎉 [UserService] User details with attendance retrieved successfully");
         return userDetailsWithAttendance;

      } catch (error: any) {
         console.error("💥 [UserService] Error getting user details with attendance:", error.message || error);
         throw new HttpException(STATUS.BAD_REQUEST, "Failed to get user details with attendance");
      }
   }

   protected static getAllUsersService = async () => {
      console.log("🟡 [UserService] Fetching all users...");

      try {
         const results = await db.users.findMany({
            include: {
               users_roles: {
                  select: {
                     role_name: true
                  }
               }
            },
            orderBy: {
               createdAt: 'desc'
            }
         });

         console.log(`📦 [UserService] Retrieved ${results.length} users.`);
         return results;

      } catch (error: any) {
         console.error("💥 [UserService] Error fetching users:", error.message || error);
         throw new HttpException(STATUS.BAD_REQUEST, "Failed to fetch users");
      }
   }

   protected static getUserByIdService = async (userId: number) => {
      console.log("🟡 [UserService] Fetching user by ID:", userId);

      try {
         const user = await db.users.findFirst({
            where: { Id: userId },
            include: {
               users_roles: {
                  select: {
                     role_name: true
                  }
               }
            }
         });

         if (!user) {
            console.error("❌ [UserService] User not found with ID:", userId);
            throw new HttpException(STATUS.BAD_REQUEST, "User does not exist");
         }

         console.log("✅ [UserService] User found:", user.emp__eng_name);
         return user;

      } catch (error: any) {
         console.error("💥 [UserService] Error fetching user by ID:", error.message || error);
         throw new HttpException(STATUS.BAD_REQUEST, "Failed to fetch user");
      }
   }
}

export default UserService;
