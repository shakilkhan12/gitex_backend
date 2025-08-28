import { OfficeAttendanceType, STATUS } from "@/typescript";
import db from "@/prisma/client";
import { HttpException } from "@/utils/HttpException.utils";

class OfficeAttendanceService {
   protected static addOfficeAttendanceService = async (attendance: OfficeAttendanceType) => {
      // Check if office exists
      const officeExists = await db.offices.findFirst({
         where: { Id: attendance.office_Id },
      });
      if (!officeExists) {
         throw new HttpException(STATUS.BAD_REQUEST, "Office does not exist");
      }

      const result = await db.offices_attendance.create({
         data: {
            ...attendance,
            createdAt: new Date(),
            updatedAt: new Date()
         },
      });
      return result;
   }

   protected static viewOfficeAttendancesService = async () => {
      return await db.offices_attendance.findMany({
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
   }
}

export default OfficeAttendanceService; 