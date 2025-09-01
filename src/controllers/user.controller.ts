import { UserService } from "@/services";
import { STATUS } from "@/typescript";
import { NextFunction, Request, Response } from "express";

class UserController extends UserService {
   public static getUserDetailsWithAttendance = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { personId } = req.params;
         
         if (!personId) {
            return res.status(STATUS.BAD_REQUEST).json({ 
               error: "personId parameter is required" 
            });
         }

         const userDetails = await UserService.getUserDetailsWithAttendanceService(personId);
         return res.status(STATUS.SUCCESS).json(userDetails);
      } catch (error) {
         next(error);
      }
   }

   public static getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const users = await UserService.getAllUsersService();
         return res.status(STATUS.SUCCESS).json(users);
      } catch (error) {
         next(error);
      }
   }

   public static getUserById = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { userId } = req.params;
         
         if (!userId || isNaN(Number(userId))) {
            return res.status(STATUS.BAD_REQUEST).json({ 
               error: "Valid userId parameter is required" 
            });
         }

         const user = await UserService.getUserByIdService(Number(userId));
         return res.status(STATUS.SUCCESS).json(user);
      } catch (error) {
         next(error);
      }
   }
}

export default UserController;
