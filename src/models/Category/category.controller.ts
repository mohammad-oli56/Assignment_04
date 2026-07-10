import { NextFunction, Request, Response } from "express"
import { categoryService } from "./category.service"
import { sendResponse } from "../../utils/sendResponse"
import { catchasync } from "../../utils/catchasync"



// const creteCategoryFromCotroller = async (req :Request , res : Response)=>{

//     const result = await categoryService.createCategoryINdb(req.body)

//     console.log(result)

//     sendResponse(res,{
//         success:true,
//         statusCode:200,
//         message:`successfully create ${result.name} category`,
//         data:{result}
//     })
// }

const creteCategoryFromCotroller = await catchasync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await categoryService.createCategoryINdb(req.body)


    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: `successfully create ${result.name} category`,
        data: { result }
    })
})

const getAllCategoryController = await catchasync(async(req:Request,res:Response,next:NextFunction)=>{
    const result = await categoryService.getAllCategoryFromDB()
      sendResponse(res, {
        success: true,
        statusCode: 200,
        message: `successfully get category`,
        data: { result }
    })
})

export const categoryController = {
    creteCategoryFromCotroller,
    getAllCategoryController
}