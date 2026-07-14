import { Router } from "express";
import { LandloerRequestController } from "./landlordRequestController";
import { auth } from "../../Middleware/veryfytoken";
import { Role } from "../../../generated/prisma/enums";

const router = Router()

router.post("/properties",auth(Role.LANDLORD,Role.ADMIN), LandloerRequestController.createPropertycontroller)
router.put('/properties/:id',auth(Role.LANDLORD,Role.ADMIN),LandloerRequestController.updatePropertyController)
router.delete('/properties/:id',auth(Role.ADMIN,Role.LANDLORD),LandloerRequestController.deletePropertyController)
router.get('/requests',auth(Role.ADMIN,Role.LANDLORD),LandloerRequestController.landlordRequestPropertyController)
router.patch('/requests/:id',auth(Role.ADMIN,Role.LANDLORD),LandloerRequestController.updateRequestPropertyController)


export const landlordRouter = router