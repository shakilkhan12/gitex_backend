import { Router } from "express";
import parksRouter from "./parks.routes";
import officesRouter from "./offices.routes";
const mainRouter = Router();
mainRouter.use('/parks', parksRouter)
mainRouter.use('/offices', officesRouter)
export default mainRouter;
