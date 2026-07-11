import { prisma } from "../../lib/prisma";

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
    getAllRequestPropertyInDB,
    updateRequestPropertyInDB
}