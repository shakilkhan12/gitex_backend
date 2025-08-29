import { OfficesController } from "@/controllers";
import { officeBasicInfoValidations, officeValidations } from "@/validations";
import { Router } from "express";
const officesRouter  = Router();
officesRouter.post('/add',officeValidations, OfficesController.addOffice)
officesRouter.post('/add-office-camera', officeValidations, OfficesController.addOfficeCamera)
officesRouter.put("/update-office-camera-function",OfficesController.changeOfficeCameraFunctionality)
officesRouter.put('/update-office-settings', OfficesController.updateOfficeSetting)
officesRouter.put('/update-office-basic-info', officeBasicInfoValidations, OfficesController.updateOfficeBasicInfo);
officesRouter.get('/get', OfficesController.getOffices)
officesRouter.get('/get-office-cameras/:officeId', OfficesController.getOfficeCameras)
export default officesRouter;