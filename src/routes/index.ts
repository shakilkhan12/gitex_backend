import { Router } from "express";
import parkRouter from "./parks.routes";
import officesRouter from "./offices.routes";
const mainRouter = Router();
mainRouter.use('/parks', parkRouter)
mainRouter.use('/offices', officesRouter)
export default mainRouter;
