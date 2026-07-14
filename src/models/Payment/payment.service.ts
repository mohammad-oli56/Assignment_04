import axios from "axios";
import crypto from "crypto";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { ItenantDetails } from "./paymentInterface";
import { PaymentProvider, PaymentStatus, RentalStatus } from "../../../generated/prisma/enums";


const createPaymentInDB = async (
  tenantDetails: ItenantDetails,
  rentalRequestId: string
) => {
  
  const rentalRequest = await prisma.rentalRequest.findFirst({
    where: {
      id: rentalRequestId,
      tenantId: tenantDetails.id,
    },
    include: {
      property: true,
    },
  });

  console.log(rentalRequest)

  if (!rentalRequest) {
    throw new Error("Rental request not found");
  }


  if (rentalRequest.status !== RentalStatus.APPROVED) {
    throw new Error("Rental request is not approved yet");
  }


  const existingPayment = await prisma.payment.findUnique({
    where: {
      rentalRequestId,
    },
  });

  if (existingPayment) {
    throw new Error("Payment already exists for this rental request");
  }


  const tranId = crypto.randomUUID();


  const paymentData = {
    store_id: config.STORE_ID,
    store_passwd: config.STORE_PASSWORD,

    total_amount: rentalRequest.property.price,
    currency: "BDT",
    tran_id: tranId,

    product_category: "Rental Property",

    success_url: "https://assignment-04-drab.vercel.app/api/payments/conform",
    fail_url: `${config.APP_URL}/api/payments/fail`,
    cancel_url: `${config.APP_URL}/api/payments/cancel`,

    cus_name: tenantDetails.name,
    cus_email: tenantDetails.email,
    cus_phone: tenantDetails.phoneNumber,

    cus_add1: "Dhaka",
    cus_city: "Dhaka",
    cus_country: "Bangladesh",

    ship_name: tenantDetails.name,
    ship_add1: "Dhaka",
    ship_city: "Dhaka",
    ship_country: "Bangladesh",
  };

  console.log(paymentData.success_url)

  const formData = new URLSearchParams();

  Object.entries(paymentData).forEach(([key, value]) => {
    formData.append(key, String(value));
  });

  
  const response = await axios.post(
    "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  
  if (response.data.status !== "SUCCESS") {
    throw new Error("Failed to create payment session");
  }


  await prisma.payment.create({
    data: {
      rentalRequestId,
      transactionId: tranId,
      amount: rentalRequest.property.price,
      provider: PaymentProvider.SSLCOMMERZ,
      status: PaymentStatus.PENDING,
    },
  });


  return {
    GatewayPageURL: response.data.GatewayPageURL,
  };
};


const paymentConfirmInDB = async (payload: any) => {
  console.log("SSL Payload:", payload);

  const tranId = payload.tran_id;

  if (!tranId) {
    throw new Error("Transaction id not found");
  }

  const payment = await prisma.payment.findUnique({
    where: {
      transactionId: tranId,
    },
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  if (payment.status === PaymentStatus.COMPLETED) {
    return payment;
  }

  const result = await prisma.payment.update({
    where: {
      transactionId: tranId,
    },
    data: {
      status: PaymentStatus.COMPLETED,
      paidAt: new Date(),
    },
  });

  return result;
};



const getAllPaymentHistoryDB = async (tenantId:string)=>{

 const payments = await prisma.payment.findMany({
   where:{
     rentalRequest:{
       tenantId: tenantId
     }
   }
 });

 if(payments.length === 0){
   throw new Error("Payment history not found for this tenant.");
 }

 return payments;
}


const getSinglePaymentDetails = async (
  paymentId: string,
  tenantId: string
) => {

  const paymentDetails = await prisma.payment.findFirst({
    where: {
      id: paymentId,
      rentalRequest: {
        tenantId: tenantId
      }
    },
    include: {
      rentalRequest: true
    }
  });

  if (!paymentDetails) {
    throw new Error("Payment not found for this tenant");
  }

  return paymentDetails;
};

export const PaymentService = {
  createPaymentInDB,
  getAllPaymentHistoryDB,
  getSinglePaymentDetails,
  paymentConfirmInDB
};