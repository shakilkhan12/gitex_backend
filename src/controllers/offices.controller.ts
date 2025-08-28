import { OfficesService, ParkService } from "@/services";
import { OfficeCamera, OfficeType, ParkCamera, ParkType, ParkZone, SettingInputTypes, STATUS } from "@/typescript";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

class OfficesController extends OfficesService {
  
  // add new park
   public static addOffice = async (req: Request<{}, {}, OfficeType>, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
       try {
        if(errors.isEmpty()) {
           const office = await OfficesService.addOfficeService(req.body)
          return res.status(STATUS.CREATED).json(office)
        } else {
          return res.status(STATUS.BAD_REQUEST).json({errors: errors.array()});
        }
       } catch (error) {
         next(error)
       }
   }
//    get all offices
   public static getOffices = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const offices = await OfficesService.getOfficesService();
      return res.status(STATUS.SUCCESS).json(offices);
    } catch (error) {
      next(error)
    }
   }
//   //  get all park zones
//   public static getParkZones = async (req: Request <{parkId: number}>, res: Response, next: NextFunction) => {
//     const parkId = req.params.parkId
//     try {
//       const parkZones = await ParkService.getParkZonesService(parkId);
//       return res.status(STATUS.SUCCESS).json(parkZones)
//     } catch (error) {
//       next(error)
//     }
//   }
//   // get all park cameras 
//     public static getParkCameras = async (req: Request <{parkId: number}>, res: Response, next: NextFunction) => {
//     const parkId = req.params.parkId
//     try {
//       const parkCameras = await ParkService.getParkCamerasService(parkId);
//       return res.status(STATUS.SUCCESS).json(parkCameras)
//     } catch (error) {
//       next(error)
//     }
//   }
//   //  add new park zone
//   public static addParkZone = async (req: Request <{}, {}, ParkZone>, res: Response, next: NextFunction) => {
//     const errors = validationResult(req)
//     try {
//       if(errors.isEmpty()) {
//         const parkZone = await ParkService.addParkZoneService(req.body);
//         return res.status(STATUS.CREATED).json(parkZone)
//       } else {
//         return res.status(STATUS.BAD_REQUEST).json({errors: errors.array()})
//       }
//     } catch (error) {
//       next(error)
//     }
//   }
  // add office camera
  public static addOfficeCamera = async (req: Request <{}, {}, OfficeCamera>, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    try {
      if(errors.isEmpty()) {
        const officeCamera = await OfficesService.addOfficeCameraService(req.body);
        return res.status(STATUS.CREATED).json(officeCamera)
      } else {
        return res.status(STATUS.BAD_REQUEST).json({errors: errors.array()})
      }
    } catch (error) {
      next(error)
    }
  }
//   // update park camera functionality
//   public static changeParkCameraFunctionality = async (req: Request, res: Response, next: NextFunction) => {
//     try {
// const { camera_Id, ...fields } = req.body;

//     const updatableFields = [
//       "attendance",
//       "footfall",
//       "behaviour",
//       "behaviour",
//       "irrigation",
//       "landscapping",
//       "litter_detection",
//       "intrusion",
//       "smooking_detection",
//     ];
//      if (!camera_Id) {
//       return res.status(STATUS.BAD_REQUEST).json({ message: "camera_Id is required" });
//     }

//     // Filter only allowed fields
//     const fieldsToUpdate = Object.keys(fields).filter((f) =>
//       updatableFields.includes(f)
//     );

//     // Ensure only one field is present
//     if (fieldsToUpdate.length !== 1) {
//       return res.status(STATUS.BAD_REQUEST).json({
//         message: "You must provide exactly one field to update",
//       });
//     }
//     const fieldName = fieldsToUpdate[0];
//     const fieldValue = fields[fieldName];
//     const updatedCamera = await ParkService.changeParkCameraFunctionalityService({fieldName, fieldValue, camera_Id})
//     return res.status(STATUS.CREATED).json(updatedCamera)
//     } catch (error) {
//       next(error)
//     }
//   }
//   // update setting 
//   public static updateSetting = async (req: Request <{}, {}, SettingInputTypes>, res: Response, next: NextFunction) => {
//     const cameraId = req.body.camera_Id
//     if(!cameraId) {
//       return res.status(STATUS.BAD_REQUEST).json({message: 'camera id is required'})
//     }
//     try {
//       const settingUpdated = await ParkService.changeParkSettingService(req.body);
//       return res.status(STATUS.CREATED).json(settingUpdated)
//     } catch (error) {
//       next(error)
//     }
//   }
}
export default OfficesController;
