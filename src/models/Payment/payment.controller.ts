import { NextFunction, Request, Response } from "express";
import { catchAsync, } from "../../utils/catchasync";
import { PaymentService } from "./payment.service";
import { ItenantDetails } from "./paymentInterface";
import { sendResponse } from "../../utils/sendResponse";

const paymentCreate = catchAsync(async (req: Request, res: Response, next: NextFunction) => {


    const result = await PaymentService.createPaymentInDB(
        req.user as ItenantDetails,
        req.body.rentalRequestId
    );

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "payment create",
        data: { result }
    })


})


const paymentconfirm = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

})



const paymentHistory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   


    const result = await PaymentService.getAllPaymentHistoryDB(req.user?.id as string,);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "all Payment History",
        data: { result }
    })


})


const paymentDetails = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    console.log(req.params.id)
    console.log(req.user?.id)

     const result = await PaymentService.getSinglePaymentDetails( req.params.id as string,req.user?.id as string);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "all Payment History",
        data: { result }
    })

})

export const PaymentController = {
    paymentCreate,
    paymentconfirm,
    paymentHistory,
    paymentDetails
}

