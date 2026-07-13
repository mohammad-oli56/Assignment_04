import { Router } from "express";
import { PaymentController } from "./payment.controller";
import { auth } from "../../Middleware/veryfytoken";
import { Role } from "../../../generated/prisma/enums";

const router = Router()

router.post("/create", auth(Role.TENANT),PaymentController.paymentCreate)
router.post("/confirm",PaymentController.paymentconfirm)
router.get("/",PaymentController.paymentHistory)
router.get("/:id",PaymentController.paymentDetails)

export const PaymentRouter = router