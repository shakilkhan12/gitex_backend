import { LitterDetectionType, STATUS } from "@/typescript";
import db from "@/prisma/client";
import { HttpException } from "@/utils/HttpException.utils";

class LitterDetectionService {
   protected static addLitterDetectionService = async (litterDetection: LitterDetectionType) => {
      // Check if park exists
      const parkExists = await db.parks.findFirst({
         where: { Id: litterDetection.park_Id },
      });
      if (!parkExists) {
         throw new HttpException(STATUS.BAD_REQUEST, "Park does not exist");
      }

      const result = await db.parks_litter_detection.create({
         data: {
            ...litterDetection,
            createdAt: new Date(),
            updatedAt: new Date()
         },
      });
      return result;
   }

   protected static viewLitterDetectionsService = async () => {
      return await db.parks_litter_detection.findMany({
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

export default LitterDetectionService; 