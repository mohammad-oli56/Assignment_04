import { prisma } from "../../lib/prisma";
import { IUpdateUserStatus } from "./admin.interface";

const getAllUsersInDB = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phoneNumber: true,
      role: true,
      status: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};


const updateUserStatusInDB = async (
  userId: string,
  payload: IUpdateUserStatus,
  adminId : string
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.id === adminId) {
  throw new Error("You cannot update your own status");
}

  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      status: payload.status,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phoneNumber: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });

  return result;
};

const getAllPropertiesInDB = async () => {
  const result = await prisma.property.findMany({
    include: {
      category: true,
      landlord: {
        select: {
          id: true,
          name: true,
          email: true,
          phoneNumber: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

const getAllRentalsInDB = async () => {
  const result = await prisma.rentalRequest.findMany({
    include: {
      tenant: {
        select: {
          id: true,
          name: true,
          email: true,
          phoneNumber: true,
        },
      },
      property: {
        include: {
          category: true,
          landlord: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};


export const AdminService = {
    getAllUsersInDB,
    updateUserStatusInDB,
    getAllPropertiesInDB,
    getAllRentalsInDB

}