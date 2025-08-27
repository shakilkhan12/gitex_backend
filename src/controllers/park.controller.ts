import { ParkService } from "@/services";
import { ParkType, STATUS } from "@/typescript";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

class ParkController extends ParkService {
   public static addPark = async (req: Request<{}, {}, ParkType>, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
       try {
        if(errors.isEmpty()) {
           const park = await ParkService.addParkService(req.body)
          return res.status(STATUS.CREATED).json(park)
        } else {
          return res.status(STATUS.BAD_REQUEST).json({errors: errors.array()});
        }
       } catch (error) {
         next(error)
       }
   }
   public static viewParks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parks = await ParkService.viewParksService();
      return res.status(STATUS.SUCCESS).json(parks);
    } catch (error) {
      next(error)
    }
   }
}
export default ParkController;
