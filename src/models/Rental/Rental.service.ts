import { prisma } from "../../lib/prisma"

interface IRentalCreate {
    propertyId: string
    moveInDate: string
    message: string
}

const createRentalinDB = async (TENANTId: string, payload: IRentalCreate) => {
    const PropertyIdCheck = await prisma.property.findUnique({
        where: {
            id: payload.propertyId
        }
    })

    if (!PropertyIdCheck) {
        throw new Error("Invalid Property ID You Request")
    }

    if (!PropertyIdCheck.isAvailable) {
        throw new Error("This property is not available");
    }


    const existingRequest = await prisma.rentalRequest.findFirst({
        where: {
            tenantId: TENANTId,
            propertyId: payload.propertyId,
        },
    });

    if (existingRequest) {
        throw new Error("You have already submitted a rental request for this property");
    }

    const result = await prisma.rentalRequest.create({
        data: {
            tenantId: TENANTId,
            propertyId: payload.propertyId,
            moveInDate:new Date(payload.moveInDate),
            message: payload.message
        }
    })


    return result

}



const getAllRentalinDB = async (TENANTId: string) => {
   const result = await prisma.rentalRequest.findMany({
  where: {
    tenantId: TENANTId,
  },
  include: {
    property: {
      include: {
        category: true,
      },
    },
  },
  orderBy: {
    createdAt: "desc",
  },
});

return result
}


const getSingleRentalinDB = async (
  TENANTId: string,
  rentalId: string
) => {
  const result = await prisma.rentalRequest.findFirst({
    where: {
      id: rentalId,
      tenantId: TENANTId,
    },
    include: {
      property: {
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
      },
    },
  });

  if (!result) {
    throw new Error("Rental request not found");
  }

  return result;
};

export const RentalService = {
    createRentalinDB,
    getAllRentalinDB,
    getSingleRentalinDB
}