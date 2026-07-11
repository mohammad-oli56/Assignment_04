import { NextFunction, Request, Response } from "express";
import { catchasync } from "../../utils/catchasync";
import { RentalService } from "./Rental.service";
import { sendResponse } from "../../utils/sendResponse";

const createRental = await catchasync(async(req:Request,res:Response,next:NextFunction)=>{

    const result = await RentalService.createRentalinDB(req.user?.id as string,req.body)

    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"crate new rental request",
        data:{result}
    })
})

const getMyRentals = await catchasync(async(req:Request,res:Response,next:NextFunction)=>{
     const result = await RentalService.getAllRentalinDB(req.user?.id as string)

    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"crate new rental request",
        data:{result}
    })
})


const getSingleRental = await catchasync(async(req:Request,res:Response,next:NextFunction)=>{

    // console.log(req.params.id)
    // console.log(req.user?.id)

         const result = await RentalService.getSingleRentalinDB(req.user?.id as string, req.params.id as string)

    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"crate new rental request",
        data:{result}
    })
})


export const RentalController ={
    createRental,
    getMyRentals,
    getSingleRental
}