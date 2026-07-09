import { NextFunction, Request, RequestHandler, Response } from "express";

export const catchasync = async (fn: RequestHandler) => {

    return async (req: Request, res: Response, next: NextFunction) => {

        try {
            await fn(req, res, next)
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message,
            })
    }

}}