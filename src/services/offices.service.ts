import { ParkType, STATUS, ParkZone, ParkCamera, SettingInputTypes, OfficeType, OfficeCamera } from "@/typescript";
import db from "@/prisma/client";
import { HttpException } from "@/utils/HttpException.utils";

class OfficesService {
   // add park service
   protected static addOfficeService = async (office: OfficeType) => {
      const officeExist = await db.offices.findFirst({
               where: { office_Id:  office.office_Id},
           });
      if(officeExist) {
         throw new HttpException(STATUS.BAD_REQUEST, `${office.office_Id} office id is already exist`);
      }
      const result = await db.offices.create({
      data: {...office, createdAt: new Date()},
  });
  return result;
   }
   // get parks service
   protected static getOfficesService = async () => {
      return await db.offices.findMany({
         include: {
          offices_cameras: true,
    },
      });
   }
//    // get park zones service
//    protected static getParkZonesService = async (park_Id: number) => {
//       if(!park_Id) {
//           throw new HttpException(STATUS.BAD_REQUEST, `park id is required`)
//       }
//    return await db.park_zones.findMany({
//       where: {
//          park_Id: Number(park_Id)
//       }
//    });
//    }
//    // get park cameras service
//     protected static getParkCamerasService = async (park_Id: number) => {
//       if(!park_Id) {
//           throw new HttpException(STATUS.BAD_REQUEST, `park id is required`)
//       }
//     return await db.park_cameras.findMany({
//       where: {
//          park_Id: Number(park_Id)
//       }
//    });
//    }
//    // add park zone service
//    protected static addParkZoneService = async (zoneData: ParkZone) => {
//       const zoneExist = await db.park_zones.findFirst({
//                where: { zone_Id: zoneData.zone_Id },
//            });
//       if(zoneExist) {
//          throw new HttpException(STATUS.BAD_REQUEST, `${zoneData.zone_Id} zone id is already exist`);
//       }
//       const result = await db.park_zones.create({
//          data: {...zoneData, createdAt: new Date() }
//       });
//   return result;
//    }
   // add park camera service
   protected static addOfficeCameraService = async (cameraData: OfficeCamera) => {
      const cameraExist = await db.offices_cameras.findFirst({
               where: { camera_Id: cameraData.camera_Id },
           });
      if(cameraExist) {
         throw new HttpException(STATUS.BAD_REQUEST, `${cameraData.camera_Id} camera id is already exist`);
      }
      const result = await db.offices_cameras.create({
         data: {...cameraData, office_Id: Number(cameraData.office_Id), createdAt: new Date()}
      })
      return result;
   }
//    protected static changeParkCameraFunctionalityService = async ({fieldName, fieldValue, camera_Id}: {fieldName: string, fieldValue: any, camera_Id: string}) => {
//         const result = db.park_cameras.update({
//         where: { camera_Id: String(camera_Id) },
//         data: {
//         [fieldName]: fieldValue,
//         updatedAt: new Date(),
//       },
//     });
//     return result;
//    }
//    protected static changeParkSettingService = async (setting: SettingInputTypes) => {
//       const {password, stream_api_key, stream_path, stream_url} = setting;
//       const result = db.park_cameras.update({
//         where: { camera_Id: setting.camera_Id },
//         data: {
//         password,
//         stream_api_key,
//         stream_path,
//         stream_url
//       },
//     });
//     return result;
//    }
   
}
export default OfficesService;