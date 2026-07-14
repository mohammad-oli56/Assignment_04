import { Router } from "express";
import { PaymentController } from "./payment.controller";
import { auth } from "../../Middleware/veryfytoken";
import { Role } from "../../../generated/prisma/enums";

const router = Router()

router.post("/create", auth(Role.TENANT),PaymentController.paymentCreate)


router.post("/conform",PaymentController.paymentconfirm)


router.get("/",auth(Role.TENANT),PaymentController.paymentHistory)
router.get("/:id",auth(Role.TENANT),PaymentController.paymentDetails)

export const PaymentRouter = router