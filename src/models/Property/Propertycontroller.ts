import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchasync";
import { Propertyservice } from "./property.service";
import { sendResponse } from "../../utils/sendResponse";


//public
//Done
const getAllPropertyController =  catchAsync(async (req: Request, res: Response, nest: NextFunction) =>{
    
    const result = await Propertyservice.getAllPropertyinDB(req.query)

    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"property crate successfully",
        data:{result}
    })
})

//Done
const getSinglePropertyController =  catchAsync(async (req: Request, res: Response, nest: NextFunction) =>{
    const result = await Propertyservice.getSinglePropertyinDB(req.params.id as string)

     sendResponse(res,{
        success:true,
        statusCode:200,
        message:"property crate successfully",
        data:{result}
    })

})













export const PropertyController = {

    getAllPropertyController,
    getSinglePropertyController
}