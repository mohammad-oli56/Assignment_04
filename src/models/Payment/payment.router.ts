import { Router } from "express";
import { PaymentController } from "./payment.controller";

const router = Router()

router.post("/create",PaymentController.paymentCreate)
router.post("/confirm",PaymentController.paymentconfirm)
router.get("/",PaymentController.paymentHistory)
router.get("/:id",PaymentController.paymentDetails)

export const PaymentRouter = router