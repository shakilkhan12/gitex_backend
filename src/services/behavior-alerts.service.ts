import { BehaviorAlertType, STATUS } from "@/typescript";
import db from "@/prisma/client";
import { HttpException } from "@/utils/HttpException.utils";

class BehaviorAlertsService {
   protected static addBehaviorAlertService = async (behaviorAlert: BehaviorAlertType) => {
      // Check if park exists
      const parkExists = await db.parks.findFirst({
         where: { Id: behaviorAlert.park_Id },
      });
      if (!parkExists) {
         throw new HttpException(STATUS.BAD_REQUEST, "Park does not exist");
      }

      // Check if camera exists
      const cameraExists = await db.park_cameras.findFirst({
         where: { Id: behaviorAlert.camera_Id },
      });
      if (!cameraExists) {
         throw new HttpException(STATUS.BAD_REQUEST, "Camera does not exist");
      }

      const result = await db.parks_behaviour_alerts.create({
         data: {
            ...behaviorAlert,
            createdAt: new Date(),
            updatedAt: new Date()
         },
      });
      return result;
   }

   protected static viewBehaviorAlertsService = async () => {
      return await db.parks_behaviour_alerts.findMany({
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
   }
}

export default BehaviorAlertsService; 