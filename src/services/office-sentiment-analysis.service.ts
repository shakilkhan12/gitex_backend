import { OfficeSentimentAnalysisType, STATUS } from "@/typescript";
import db from "@/prisma/client";
import { HttpException } from "@/utils/HttpException.utils";

class OfficeSentimentAnalysisService {
   protected static addOfficeSentimentAnalysisService = async (sentimentAnalysis: OfficeSentimentAnalysisType) => {
      // Check if office exists
      const officeExists = await db.offices.findFirst({
         where: { Id: sentimentAnalysis.office_Id },
      });
      if (!officeExists) {
         throw new HttpException(STATUS.BAD_REQUEST, "Office does not exist");
      }

      // Check if entry camera exists
      const entryCameraExists = await db.offices_cameras.findFirst({
         where: { Id: sentimentAnalysis.entry_camera_Id },
      });
      if (!entryCameraExists) {
         throw new HttpException(STATUS.BAD_REQUEST, "Entry camera does not exist");
      }

      // Check if exit camera exists (if provided)
      if (sentimentAnalysis.exit_camera_Id) {
         const exitCameraExists = await db.offices_cameras.findFirst({
            where: { Id: sentimentAnalysis.exit_camera_Id },
         });
         if (!exitCameraExists) {
            throw new HttpException(STATUS.BAD_REQUEST, "Exit camera does not exist");
         }
      }

      const result = await db.offices_sentiment_analysis.create({
         data: {
            ...sentimentAnalysis,
            createdAt: new Date(),
            updatedAt: new Date()
         },
      });
      return result;
   }

   protected static viewOfficeSentimentAnalysesService = async () => {
      return await db.offices_sentiment_analysis.findMany({
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
   }
}

export default OfficeSentimentAnalysisService; 