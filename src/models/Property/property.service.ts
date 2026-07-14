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













export const Propertyservice = {
   
  
    getAllPropertyinDB,
    getSinglePropertyinDB,
   
}