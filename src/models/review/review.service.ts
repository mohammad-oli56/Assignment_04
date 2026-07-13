import { PaymentStatus, RentalStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { IaddReview } from "./review.interface";

const createReviewsInDB = async (
  payload: IaddReview,
  tenantId: string
) => {
  // Validation
  if (!payload.comment.trim()) {
    throw new Error("Comment is required");
  }

  if (!payload.rating || payload.rating < 1 || payload.rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  // Check Property
  const property = await prisma.property.findUnique({
    where: {
      id: payload.propertyId,
    },
  });

  if (!property) {
    throw new Error("Property not found");
  }

  // Check Approved Rental Request
  const rentalRequest = await prisma.rentalRequest.findFirst({
    where: {
      tenantId,
      propertyId: payload.propertyId,
      status:RentalStatus.APPROVED,
    },
    include: {
      payment: true,
    },
  });

  if (!rentalRequest) {
    throw new Error("You have not rented this property");
  }

  // Check Payment
  if (!rentalRequest.payment) {
    throw new Error("Payment not found");
  }

  if (rentalRequest.payment.status !== PaymentStatus.COMPLETED) {
    throw new Error("Please complete the payment first");
  }

  // Check Duplicate Review
  const existingReview = await prisma.review.findFirst({
    where: {
      tenantId,
      propertyId: payload.propertyId,
    },
  });

  if (existingReview) {
    throw new Error("You have already reviewed this property");
  }

  // Create Review
  const result = await prisma.review.create({
    data: {
      tenantId,
      propertyId: payload.propertyId,
      rating: payload.rating,
      comment: payload.comment,
    },
  });

  return result;
};


export const reviewService = {
    createReviewsInDB
}