import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { IProperty, IupdadeProperty } from "./propertyInterface";


const getAllPropertyinDB = async (query: any) => {
    const where: Prisma.PropertyWhereInput = {};

    // Location Filter
    if (query.location) {
        where.location = {
            contains: query.location,
            mode: "insensitive",
        };
    }

    // Category Filter
    if (query.categoryId) {
        where.categoryId = query.categoryId;
    }

    // Price Filter
    if (query.minPrice || query.maxPrice) {
        where.price = {};

        if (query.minPrice) {
            where.price.gte = Number(query.minPrice);
        }

        if (query.maxPrice) {
            where.price.lte = Number(query.maxPrice);
        }
    }

    const result = await prisma.property.findMany({
        where,
        include: {
            category: true,
            landlord: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return result;
};

const getSinglePropertyinDB = async (propertyId: string) => {
  const result = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
    include: {
      category: true,
      landlord: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!result) {
    throw new Error("Property not found");
  }

  return result;
};

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








export const Propertyservice = {
    createPropertyInDB,
    updatePropertyinDB,
    deletePropertyinDB,
    getAllPropertyinDB,
    getSinglePropertyinDB,
   
}