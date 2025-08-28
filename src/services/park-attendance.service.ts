import { ParkAttendanceType, STATUS } from "@/typescript";
import db from "@/prisma/client";
import { HttpException } from "@/utils/HttpException.utils";

class ParkAttendanceService {
   protected static addParkAttendanceService = async (attendance: ParkAttendanceType) => {
      // Check if park exists
      const parkExists = await db.parks.findFirst({
         where: { Id: attendance.park_Id },
      });
      if (!parkExists) {
         throw new HttpException(STATUS.BAD_REQUEST, "Park does not exist");
      }

      const result = await db.parks_attendance.create({
         data: {
            ...attendance,
            createdAt: new Date(),
            updatedAt: new Date()
         },
      });
      return result;
   }

   protected static viewParkAttendancesService = async () => {
      return await db.parks_attendance.findMany({
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
   }
}

export default ParkAttendanceService; 