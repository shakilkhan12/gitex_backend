import { ParkController } from "@/controllers";
import { parkValidations } from "@/validations";
import { Router } from "express";
const parkRouter  = Router();
parkRouter.post('/add', parkValidations, ParkController.addPark)
export default parkRouter;