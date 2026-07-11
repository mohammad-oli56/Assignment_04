import { NextFunction, Request, Response } from "express"
import { catchasync } from "../../utils/catchasync"
import { landlordRequestService } from "./landlordRequestService";
import { sendResponse } from "../../utils/sendResponse";

const landlordRequestPropertyController = await catchasync(async (req: Request, res: Response, nest: NextFunction) => {



    const result = await landlordRequestService.getAllRequestPropertyInDB(req.user?.id as string);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "property crate successfully",
        data: { result }
    })

})


const updateRequestPropertyController = await catchasync(async (req: Request, res: Response, nest: NextFunction) => {
   
    console.log( req.params.id)
    console.log(req.user?.id)
    console.log(req.body)
   
    const result = await landlordRequestService.updateRequestPropertyInDB(
        req.params.id as string,
        req.user?.id as string,
        req.body
    );

       sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "property crate successfully",
        data: { result }
    })

})


export const LandloerRequestController = {
    landlordRequestPropertyController,
    updateRequestPropertyController
}
