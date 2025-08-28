import { ParkSentimentAnalysisType, STATUS } from "@/typescript";
import db from "@/prisma/client";
import { HttpException } from "@/utils/HttpException.utils";

class ParkSentimentAnalysisService {
   protected static addParkSentimentAnalysisService = async (sentimentAnalysis: ParkSentimentAnalysisType) => {
      // Check if park exists
      const parkExists = await db.parks.findFirst({
         where: { Id: sentimentAnalysis.park_Id },
      });
      if (!parkExists) {
         throw new HttpException(STATUS.BAD_REQUEST, "Park does not exist");
      }

      // Check if entry camera exists
      const entryCameraExists = await db.park_cameras.findFirst({
         where: { Id: sentimentAnalysis.entry_camera_Id },
      });
      if (!entryCameraExists) {
         throw new HttpException(STATUS.BAD_REQUEST, "Entry camera does not exist");
      }

      // Check if exit camera exists (if provided)
      if (sentimentAnalysis.exit_camera_Id) {
         const exitCameraExists = await db.park_cameras.findFirst({
            where: { Id: sentimentAnalysis.exit_camera_Id },
         });
         if (!exitCameraExists) {
            throw new HttpException(STATUS.BAD_REQUEST, "Exit camera does not exist");
         }
      }

      const result = await db.parks_sentiment_analysis.create({
         data: {
            ...sentimentAnalysis,
            createdAt: new Date(),
            updatedAt: new Date()
         },
      });
      return result;
   }

   protected static viewParkSentimentAnalysesService = async () => {
      return await db.parks_sentiment_analysis.findMany({
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
   }
}

export default ParkSentimentAnalysisService; 