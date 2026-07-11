import { Router } from "express";
import { LandloerRequestController } from "./landlordRequestController";
import { auth } from "../../Middleware/veryfytoken";
import { Role } from "../../../generated/prisma/enums";

const router = Router()

router.get('/requests',auth(Role.ADMIN,Role.LANDLORD),LandloerRequestController.landlordRequestPropertyController)
router.patch('/requests/:id',auth(Role.ADMIN,Role.LANDLORD),LandloerRequestController.updateRequestPropertyController)


export const landlordRouter = router