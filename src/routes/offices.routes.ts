import { OfficesController, ParkController } from "@/controllers";
import { officeValidations, parkCameraValidations, parkValidations, parkZoneValidations } from "@/validations";
import { Router } from "express";
const officesRouter  = Router();
officesRouter.post('/add',officeValidations, OfficesController.addOffice)
officesRouter.post('/add-park-zone', parkZoneValidations, ParkController.addParkZone)
officesRouter.post('/add-office-camera', officeValidations, OfficesController.addOfficeCamera)
officesRouter.put("/update-park-camera-function",ParkController.changeParkCameraFunctionality)
officesRouter.put('/update-park-camera-settings', ParkController.updateSetting)
officesRouter.get('/get', OfficesController.getOffices)
officesRouter.get('/get-park-zones/:parkId', ParkController.getParkZones)
officesRouter.get('/get-park-cameras/:parkId', ParkController.getParkCameras)
export default officesRouter;