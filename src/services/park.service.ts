import { ParkType, STATUS } from "@/typescript";
import db from "@/prisma/client";
import { HttpException } from "@/utils/HttpException.utils";

class ParkService {
   protected static addParkService = async (park: ParkType) => {
      const exist = await db.parks.findFirst({
               where: { park_Id: park.park_Id },
           });
      if(exist) {
         throw new HttpException(STATUS.BAD_REQUEST, "park id is already exist");
      }
      const result = await db.parks.create({
      data: {...park, createdAt: new Date()},
  });
  return result;
   }
   protected static viewParksService = async () => {
      return await db.parks.findMany();
   }
}
export default ParkService;