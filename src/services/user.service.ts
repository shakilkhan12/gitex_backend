import { STATUS } from "@/typescript";
import db from "@/prisma/client";
import { HttpException } from "@/utils/HttpException.utils";
import { formatDate, formatTime } from "@/utils/dateTime.utils";
import axios from "axios";

class UserService {

   protected static loginService = async (EmpCode: string, Password: string) => {
      console.log("🟢 [UserService] Attempting login for EmpCode:", EmpCode);

      try {
         // 1️⃣ Get SecretKey from Prisma
         const secretRecord = await db.access_secret.findFirst();
         if (!secretRecord?.value) {
            console.error("❌ [UserService] SecretKey not found in DB");
            throw new HttpException(STATUS.BAD_REQUEST, "Secret key not configured");
         }
         const secretKey = secretRecord.value;
         console.log("✅ [UserService] SecretKey retrieved successfully");

         // 2️⃣ Prepare payload for third-party API
         const payload = {
            EmpCode,
            Password,
            SecretKey: secretKey,
            Lang: "en"
         };
         console.log("📤 [UserService] Sending payload to third-party API:", payload);

         // 3️⃣ Call third-party API
         const response = await axios.post(
            "http://192.168.164.7/website_demo/middleware/?class=general&action=EmployeeLoginService",
            payload,
            {
               headers: { "Content-Type": "application/json" },
               timeout: 10000
            }
         );

         console.log("📥 [UserService] Third-party API response:", response.data);

         // 4️⃣ Return the response data
         return response.data;

      } catch (error: any) {
         console.error("💥 [UserService] Error during login:", error.message || error);
         throw new HttpException(STATUS.BAD_REQUEST, "Login failed");
      }
   }


   protected static getAllUsersWithRoleNestedService = async () => {
      console.log("🟢 [UserService] Fetching all users with role info (nested)");

      try {
         const users = await db.users.findMany({
            select: {
               Id: true,
               emp_Id: true,
               gender: true,
               emp__eng_name: true,
               emp__arabic_name: true,
               country_code: true,
               phone: true,
               email: true,
               dep_eng_name: true,
               dep_arabic_name: true,
               desig_eng_name: true,
               desig_arabic_name: true,
               unit_eng_name: true,
               unit_arabic_name: true,
               committe_eng_name: true,
               committe_arabic_name: true,
               ai_engine_access: true,
               last_login: true,
               createdAt: true,
               updatedAt: true,
               users_roles: {
                  select: {
                     role_name: true
                  }
               },
               live_stream_favourites: false,
               parks_attendance: false,
               offices_attendance: false,
               offices_footfall_analysis: false
            },
            orderBy: {
               emp__eng_name: 'asc'
            }
         })
         console.log(`✅ [UserService] Successfully fetched ${users.length} users with nested role info`);
         return users;

      } catch (error: any) {
         console.error("💥 [UserService] Error fetching users:", error.message || error);
         throw new HttpException(STATUS.INTERNAL_SERVER_ERROR, "Failed to fetch users");
      }
   }

   protected static updateUserRoleService = async (userId: number, roleId: number) => {
      console.log("🟢 [UserService] Updating user role:", { userId, roleId });

      try {
         // Validate that the role exists
         const roleExists = await db.users_roles.findUnique({
            where: { Id: roleId }
         });

         if (!roleExists) {
            console.error("❌ [UserService] Role not found:", roleId);
            throw new HttpException(STATUS.BAD_REQUEST, "Role not found");
         }

         // Validate that the user exists
         const userExists = await db.users.findUnique({
            where: { Id: userId }
         });

         if (!userExists) {
            console.error("❌ [UserService] User not found:", userId);
            throw new HttpException(STATUS.BAD_REQUEST, "User not found");
         }

         // Update the user's roleId
         const updatedUser = await db.users.update({
            where: { Id: userId },
            data: {
               role_Id: roleId,
               updatedAt: new Date()
            },
            include: {
               users_roles: {
                  select: {
                     role_name: true
                  }
               }
            }
         });

         console.log("✅ [UserService] User role updated successfully:", updatedUser);
         
         return {
            status: STATUS.SUCCESS,
            data: updatedUser,
            message: "User role updated successfully"
         };

      } catch (error: any) {
         console.error("💥 [UserService] Error updating user role:", error.message || error);
         
         if (error instanceof HttpException) {
            throw error;
         }
         
         throw new HttpException(
            STATUS.BAD_REQUEST,
            error.message || "Failed to update user role"
         );
      }
   }

}

export default UserService;
