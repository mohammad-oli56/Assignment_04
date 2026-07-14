import { prisma } from "../../lib/prisma";
import { IProperty, IupdadeProperty } from "../Property/propertyInterface";


const createPropertyInDB = async (
    payload: IProperty,
    landlordId: string
) => {

    const category = await prisma.category.findUnique({
        where: {
            id: payload.categoryId,
        },
    });

    if (!category) {
        throw new Error("Category not found");
    }


    const checkPropertyExist = await prisma.property.findFirst({
        where: {
            title: payload.title,
            landlordId,
        },
    });

    if (checkPropertyExist) {
        throw new Error("Property already exists. change title name");
    }


    const result = await prisma.property.create({
        data: {
            title: payload.title,
            description: payload.description,
            price: payload.price,
            location: payload.location,
            address: payload.address,
            bedrooms: payload.bedrooms,
            bathrooms: payload.bathrooms,
            area: payload.area,
            images: payload.images,
            amenities: payload.amenities,
            categoryId: payload.categoryId,
            landlordId,
        },
    });

    return result;
};


const updatePropertyinDB = async (
    propertyId: string,
    landlordId: string,
    payload: IupdadeProperty
) => {

    const property = await prisma.property.findUnique({
        where: {
            id: propertyId,
        },
    });

    if (!property) {
        throw new Error("Property not found");
    }


    if (property.landlordId !== landlordId) {
        throw new Error("You are not authorized to update this property");
    }


    const category = await prisma.category.findUnique({
        where: {
            id: payload.categoryId,
        },
    });

    if (!category) {
        throw new Error("Category not found");
    }


    const result = await prisma.property.update({
        where: {
            id: propertyId,
        },
        data: {
            title: payload.title,
            description: payload.description,
            price: payload.price,
            location: payload.location,
            address: payload.address,
            bedrooms: payload.bedrooms,
            bathrooms: payload.bathrooms,
            area: payload.area,
            images: payload.images,
            amenities: payload.amenities,
            categoryId: payload.categoryId,
            isAvailable: payload.isAvailable,
        },
    });

    return result;
};


const deletePropertyinDB = async (
    propertyId: string,
    landlordId: string,

) => {

    const property = await prisma.property.findUnique({
        where: {
            id: propertyId,
        },
    });

    if (!property) {
        throw new Error("Property not found");
    }


    if (property.landlordId !== landlordId) {
        throw new Error("You are not authorized to update this property");
    }





    const result = await prisma.property.delete({
        where: {
            id: propertyId,
        },

    });

    return result;
};



const getAllRequestPropertyInDB = async (landlordId: string) => {

    const result = await prisma.rentalRequest.findMany({
        where: {
            property: {
                landlordId,
            },
        },
        include: {
            tenant: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phoneNumber: true,
                },
            },
            property: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return result


}


const updateRequestPropertyInDB = async (rentalId:string,landlordId:string,payload:any) => {
    const rental = await prisma.rentalRequest.findUnique({
        where: {
            id: rentalId,
        },
        include: {
            property: true,
        },
    });

    if (!rental) {
        throw new Error("Rental request not found");
    }

    if (rental.property.landlordId !== landlordId) {
        throw new Error("You are not authorized");
    }

    const result = await prisma.rentalRequest.update({
        where: {
            id: rentalId,
        },
        data: {
            status: payload.status,
        },
    });

    return result;
}


export const landlordRequestService = {
    createPropertyInDB,
    updatePropertyinDB,
    deletePropertyinDB,
    getAllRequestPropertyInDB,
    updateRequestPropertyInDB
}