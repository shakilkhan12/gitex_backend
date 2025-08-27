import { ParkService } from "@/services";
import { ParkType, STATUS } from "@/typescript";
import { HttpException } from "@/utils/HttpException.utils";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";


class ParkController extends ParkService {
   public static addPark = async (req: Request<{}, {}, ParkType>, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
       try {
        if(errors.isEmpty()) {
          //  const park = await ParkService.addParkService(req.body)
          return res.status(STATUS.CREATED).json('created')
        } else {
          return res.status(STATUS.BAD_REQUEST).json({errors: errors.array()});
        }
       } catch (error) {
         next(error)
       }
   }
}
export default ParkController;
