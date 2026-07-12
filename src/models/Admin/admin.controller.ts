import { NextFunction, Request, Response } from "express";
import { catchasync } from "../../utils/catchasync";
import { AdminService } from "./admin.service";
import { sendResponse } from "../../utils/sendResponse";

const Get_all_users = await catchasync(async(req:Request,res:Response,next :NextFunction)=>{
   
    console.log(req.user)

   const result = await AdminService.getAllUsersInDB()

       sendResponse(res, {
           success: true,
           statusCode: 200,
           message: "property crate successfully",
           data: { result }
       })

})


const Update_user_status = await catchasync(async(req:Request,res:Response,next :NextFunction)=>{
    // console.log()

     const result = await AdminService.updateUserStatusInDB(req.params?.id as string,req.body,req.user?.id as string)

       sendResponse(res, {
           success: true,
           statusCode: 200,
           message: "property crate successfully",
           data: { result }
       })

})


const Get_all_properties = await catchasync(async(req:Request,res:Response,next :NextFunction)=>{

    const result = await AdminService.getAllPropertiesInDB()

       sendResponse(res, {
           success: true,
           statusCode: 200,
           message: "property crate successfully",
           data: { result }
       })

})


const 	Get_all_rental_requests = await catchasync(async(req:Request,res:Response,next :NextFunction)=>{
    const result = await AdminService.getAllRentalsInDB()

       sendResponse(res, {
           success: true,
           statusCode: 200,
           message: "property crate successfully",
           data: { result }
       })
})

export const AdminController = {
    Get_all_users,
    Update_user_status,
    Get_all_properties,
    Get_all_rental_requests
} 