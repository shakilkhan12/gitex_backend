import { Router } from "express";
import parkRouter from "./park.routes";
import officesRouter from "./offices.routes";
const mainRouter = Router();
mainRouter.use('/parks', parkRouter)
mainRouter.use('/offices', officesRouter)
export default mainRouter;
