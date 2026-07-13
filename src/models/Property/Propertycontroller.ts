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




//private
//Done
const createPropertycontroller =  catchAsync(async (req: Request, res: Response, nest: NextFunction) => {


    const result = await Propertyservice.createPropertyInDB(req.body,
        req.user?.id as string)


    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"property crate successfully",
        data:{result}
    })


})
//Done
const updatePropertyController =  catchAsync(async(req: Request, res: Response, nest: NextFunction) =>{
    
  const result = await Propertyservice.updatePropertyinDB(
  req.params?.id as string,
  req.user?.id as string,
  req.body
);

sendResponse(res,{
    success:true,
    statusCode:200,
    message:"update successfully",
    data:{result}
})

})
//Done
const deletePropertyController =  catchAsync(async(req: Request, res: Response, nest: NextFunction) =>{
      const result = await Propertyservice.deletePropertyinDB(
  req.params?.id as string,
  req.user?.id as string,
  
);

sendResponse(res,{
    success:true,
    statusCode:200,
    message:"delete successfully",
    data:null
})
})







export const PropertyController = {
    createPropertycontroller,
    updatePropertyController,
    deletePropertyController,
    getAllPropertyController,
    getSinglePropertyController
}