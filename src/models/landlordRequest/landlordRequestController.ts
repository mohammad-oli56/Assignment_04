import { NextFunction, Request, Response } from "express"
import { catchAsync, } from "../../utils/catchasync"
import { landlordRequestService } from "./landlordRequestService";
import { sendResponse } from "../../utils/sendResponse";

const createPropertycontroller =  catchAsync(async (req: Request, res: Response, nest: NextFunction) => {


    const result = await landlordRequestService.createPropertyInDB(req.body,
        req.user?.id as string)


    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"property crate successfully",
        data:{result}
    })


})

const updatePropertyController =  catchAsync(async(req: Request, res: Response, nest: NextFunction) =>{
    
  const result = await landlordRequestService.updatePropertyinDB(
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
      const result = await landlordRequestService.deletePropertyinDB(
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


const landlordRequestPropertyController =  catchAsync(async (req: Request, res: Response, nest: NextFunction) => {



    const result = await landlordRequestService.getAllRequestPropertyInDB(req.user?.id as string);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "All property get request",
        data: { result }
    })

})


const updateRequestPropertyController =  catchAsync(async (req: Request, res: Response, nest: NextFunction) => {
   
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
        message: "property update successfully",
        data: { result }
    })

})


export const LandloerRequestController = {
    createPropertycontroller,
    updatePropertyController,
    deletePropertyController,
    landlordRequestPropertyController,
    updateRequestPropertyController
}
