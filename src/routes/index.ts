import { Router } from "express";
import parkRouter from "./park.routes";
const mainRouter = Router();
mainRouter.use('/park', parkRouter)
export default mainRouter;