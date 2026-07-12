import { NextFunction, Request, Response } from "express";
import { catchasync } from "../../utils/catchasync";

const paymentCreate = await catchasync(async(req:Request,res:Response,next:NextFunction)=>{

})


const paymentconfirm = await catchasync(async(req:Request,res:Response,next:NextFunction)=>{

})



const paymentHistory = await catchasync(async(req:Request,res:Response,next:NextFunction)=>{

})


const paymentDetails = await catchasync(async(req:Request,res:Response,next:NextFunction)=>{

})

export const PaymentController = {
    paymentCreate,
    paymentconfirm,
    paymentHistory,
    paymentDetails
}

