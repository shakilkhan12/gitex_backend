import { ParkController } from "@/controllers";
import { parkValidations } from "@/validations";
import { Router } from "express";
const parkRouter  = Router();
parkRouter.post('/add', parkValidations, ParkController.addPark)
parkRouter.get('/get', ParkController.viewParks)
export default parkRouter;