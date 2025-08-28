import { ParkController } from "@/controllers";
import { parkCameraValidations, parkValidations, parkZoneValidations } from "@/validations";
import { Router } from "express";
const parkRouter  = Router();
parkRouter.post('/add', parkValidations, ParkController.addPark)
parkRouter.post('/add-park-zone', parkZoneValidations, ParkController.addParkZone)
parkRouter.post('/add-park-camera', parkCameraValidations, ParkController.addParkCamera)
parkRouter.put("/update-park-camera-function",ParkController.changeParkCameraFunctionality)
parkRouter.put('/update-park-camera-settings', ParkController.updateSetting)
parkRouter.get('/get', ParkController.getParks)
parkRouter.get('/get-park-zones/:parkId', ParkController.getParkZones)
parkRouter.get('/get-park-cameras/:parkId', ParkController.getParkCameras)
export default parkRouter;