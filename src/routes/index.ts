import { Router } from "express";
import parkRouter from "./park.routes";
const mainRouter = Router();
mainRouter.use('/parks', parkRouter)
export default mainRouter;