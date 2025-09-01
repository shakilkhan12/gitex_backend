import { ParkType, STATUS } from "@/typescript";
import db from "@/prisma/client";
import { HttpException } from "@/utils/HttpException.utils";

class ParkService {
   protected static addParkService = async (park: ParkType) => {
      console.log("🟢 [ParkService] Adding new park:", park);

      try {
         const exist = await db.parks.findFirst({
            where: { park_Id: park.park_Id },
         });
         if (exist) {
            console.error("❌ [ParkService] Park ID already exists:", park.park_Id);
            throw new HttpException(STATUS.BAD_REQUEST, "park id is already exist");
         }
         console.log("✅ [ParkService] Park ID is unique:", park.park_Id);

         const result = await db.parks.create({
            data: { ...park, createdAt: new Date() },
         });

         console.log("🎉 [ParkService] Park saved successfully:", result.Id);
         return result;

      } catch (error: any) {
         console.error("💥 [ParkService] Error adding park:", error.message || error);
         throw new HttpException(STATUS.BAD_REQUEST, "Failed to add park");
      }
   }

   protected static viewParksService = async () => {
      console.log("🟡 [ParkService] Fetching all parks...");

      try {
         const results = await db.parks.findMany();

         console.log(`📦 [ParkService] Retrieved ${results.length} parks.`);
         return results;

      } catch (error: any) {
         console.error("💥 [ParkService] Error fetching parks:", error.message || error);
         throw new HttpException(STATUS.BAD_REQUEST, "Failed to fetch parks");
      }
   }
}

export default ParkService;