import { SmokingDetectionType, STATUS } from "@/typescript";
import db from "@/prisma/client";
import { HttpException } from "@/utils/HttpException.utils";

class SmokingDetectionService {
   protected static addSmokingDetectionService = async (smokingDetection: SmokingDetectionType) => {
      console.log("🟢 [SmokingDetectionService] Adding new smoking detection:", smokingDetection);

      try {
         // Check if park exists
         const parkExists = await db.parks.findFirst({
            where: { Id: smokingDetection.park_Id },
         });
         if (!parkExists) {
            console.error("❌ [SmokingDetectionService] Park not found with Id:", smokingDetection.park_Id);
            throw new HttpException(STATUS.BAD_REQUEST, "Park does not exist");
         }
         console.log("✅ [SmokingDetectionService] Park exists:", parkExists.park_english_name);

         // Check if camera exists
         const cameraExists = await db.park_cameras.findFirst({
            where: { Id: smokingDetection.camera_Id },
         });
         if (!cameraExists) {
            console.error("❌ [SmokingDetectionService] Camera not found with Id:", smokingDetection.camera_Id);
            throw new HttpException(STATUS.BAD_REQUEST, "Camera does not exist");
         }
         console.log("✅ [SmokingDetectionService] Camera exists:", cameraExists.camera_english_name);

         // Insert detection record
         const result = await db.parks_smoking_detection.create({
            data: {
               ...smokingDetection,
               createdAt: new Date(),
               updatedAt: new Date()
            },
         });

         console.log("🎉 [SmokingDetectionService] Smoking detection saved successfully:", result.Id);
         return result;

      } catch (error: any) {
         console.error("💥 [SmokingDetectionService] Error adding smoking detection:", error.message || error);
         throw new HttpException(STATUS.BAD_REQUEST, "Failed to add smoking detection");
      }
   }

   protected static viewSmokingDetectionsService = async () => {
      console.log("🟡 [SmokingDetectionService] Fetching all smoking detections...");

      try {
         const results = await db.parks_smoking_detection.findMany({
            include: {
               parks: {
                  select: {
                     park_english_name: true,
                     park_arabic_name: true,
                     latitude: true,
                     longitude: true
                  }
               },
               park_cameras: {
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

         console.log(`📦 [SmokingDetectionService] Retrieved ${results.length} smoking detections.`);
         return results;

      } catch (error: any) {
         console.error("💥 [SmokingDetectionService] Error fetching smoking detections:", error.message || error);
         throw new HttpException(STATUS.BAD_REQUEST, "Failed to fetch smoking detections");
      }
   }
}

export default SmokingDetectionService;
