import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchasync";
import { sendResponse } from "../../utils/sendResponse";
import { reviewService } from "./review.service";


const addReview = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
    const result = await reviewService.createReviewsInDB(req.body, req.user?.id as string);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "create review successfully",
        data: { result }
    })
});

export const reviewController = {
    addReview,
};