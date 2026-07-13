import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";

import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchasync";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
// console.log(req.body)

    const result = await authService.createUserIntoDB(req.body);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User registered successfully",
      data: result,
    });
  }
);




const loginUser =  async (req: Request, res: Response) => {
  try {
    const result = await authService.loginuserBydb(req.body);

    res.cookie("AccessToken", result, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    res.status(200).json({
      success: true,
      message: "User login successfully",
      data: {
        accessToken: result,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
      data: null,
    });
  }
};


const myAccount = async(req: Request, res: Response)=>{
  
 const profile = await authService.findMYAccountINdb(req.user?.id as string)
  
 sendResponse(res,{
  success:true,
  statusCode:200,
  message:"found user successfully",
  data :{profile}
 })

}

export const authController = {
  createUser,
  loginUser,
  myAccount
};