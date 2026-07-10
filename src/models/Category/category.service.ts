import { prisma } from "../../lib/prisma"
import { ICreatePayload } from "./categoryInterface";



const createCategoryINdb = async (payload: ICreatePayload) => {


    const checkCategory = await prisma.category.findUnique({
        where: {
            name: payload.name,
        },
    });

    if (checkCategory) {
        throw new Error("This category already exists!");
    }

    const result = await prisma.category.create({
        data: {
            name: payload.name,
            description: payload.description,
        },
    });

    return result;

}


const getAllCategoryFromDB = async () => {
    const result = await prisma.category.findMany({
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            name: true,
            description: true,
        },
    })

    return result
}


export const categoryService = {
    createCategoryINdb,
    getAllCategoryFromDB
}