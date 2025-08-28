import { ParkType, STATUS, ParkZone, ParkCamera, SettingInputTypes } from "@/typescript";
import db from "@/prisma/client";
import { HttpException } from "@/utils/HttpException.utils";

class ParkService {
   // add park service
   protected static addParkService = async (park: ParkType) => {
      const parkExist = await db.parks.findFirst({
               where: { park_Id: park.park_Id },
           });
      if(parkExist) {
         throw new HttpException(STATUS.BAD_REQUEST, `${park.park_Id} park id is already exist`);
      }
      const result = await db.parks.create({
      data: {...park, createdAt: new Date()},
  });
  return result;
   }
   // get parks service
   protected static getParksService = async () => {
      return await db.parks.findMany({
         include: {
         _count: {
         select: {
          park_zones: true,
          park_cameras: true,
        },
      },
    },
      });
   }
   // get park zones service
   protected static getParkZonesService = async (park_Id: number) => {
      if(!park_Id) {
          throw new HttpException(STATUS.BAD_REQUEST, `park id is required`)
      }
   return await db.park_zones.findMany({
      where: {
         park_Id: Number(park_Id)
      }
   });
   }
   // get park cameras service
    protected static getParkCamerasService = async (park_Id: number) => {
      if(!park_Id) {
          throw new HttpException(STATUS.BAD_REQUEST, `park id is required`)
      }
    return await db.park_cameras.findMany({
      where: {
         park_Id: Number(park_Id)
      }
   });
   }
   // add park zone service
   protected static addParkZoneService = async (zoneData: ParkZone) => {
      const zoneExist = await db.park_zones.findFirst({
               where: { zone_Id: zoneData.zone_Id },
           });
      if(zoneExist) {
         throw new HttpException(STATUS.BAD_REQUEST, `${zoneData.zone_Id} zone id is already exist`);
      }
      const result = await db.park_zones.create({
         data: {...zoneData, createdAt: new Date() }
      });
  return result;
   }
   // add park camera service
   protected static addParCameraService = async (cameraData: ParkCamera) => {
      const cameraExist = await db.park_cameras.findFirst({
               where: { camera_Id: cameraData.camera_Id },
           });
      if(cameraExist) {
         throw new HttpException(STATUS.BAD_REQUEST, `${cameraData.camera_Id} camera id is already exist`);
      }
      const result = await db.park_cameras.create({
         data: {...cameraData, createdAt: new Date()}
      })
      return result;
   }
   protected static changeParkCameraFunctionalityService = async ({fieldName, fieldValue, camera_Id}: {fieldName: string, fieldValue: any, camera_Id: string}) => {
        const result = db.park_cameras.update({
        where: { camera_Id: String(camera_Id) },
        data: {
        [fieldName]: fieldValue,
        updatedAt: new Date(),
      },
    });
    return result;
   }
   protected static changeParkSettingService = async (setting: SettingInputTypes) => {
      const {password, stream_api_key, stream_path, stream_url} = setting;
      const result = db.park_cameras.update({
        where: { camera_Id: setting.camera_Id },
        data: {
        password,
        stream_api_key,
        stream_path,
        stream_url
      },
    });
    return result;
   }
   
}
export default ParkService;