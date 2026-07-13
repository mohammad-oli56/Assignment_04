import { NextFunction, Request, Response } from "express";
import { catchasync } from "../../utils/catchasync";
import { PaymentService } from "./payment.service";
import { ItenantDetails } from "./paymentInterface";
import { sendResponse } from "../../utils/sendResponse";

const paymentCreate = await catchasync(async (req: Request, res: Response, next: NextFunction) => {
   
   
    const result = await PaymentService.createPaymentInDB(
        req.user as ItenantDetails,
        req.body.rentalRequestId
    );

sendResponse(res,{
    success:true,
    statusCode:200,
    message:"payment create",
    data:{result}
})


})


const paymentconfirm = await catchasync(async (req: Request, res: Response, next: NextFunction) => {

})



const paymentHistory = await catchasync(async (req: Request, res: Response, next: NextFunction) => {

})


const paymentDetails = await catchasync(async (req: Request, res: Response, next: NextFunction) => {

})

export const PaymentController = {
    paymentCreate,
    paymentconfirm,
    paymentHistory,
    paymentDetails
}

