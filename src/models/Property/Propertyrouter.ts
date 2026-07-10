import { Router } from "express";
import { PropertyController } from "./Propertycontroller";
import { auth } from "../../Middleware/veryfytoken";
import { Role } from "../../../generated/prisma/enums";

const router = Router()

router.get("/", PropertyController.getAllPropertyController)
router.get("/:id", PropertyController.getSinglePropertyController)


router.post("/properties",auth(Role.LANDLORD,Role.ADMIN), PropertyController.createPropertycontroller)
router.put('/properties/:id',auth(Role.LANDLORD,Role.ADMIN),PropertyController.updatePropertyController)
router.delete('/properties/:id',auth(Role.ADMIN,Role.LANDLORD),PropertyController.deletePropertyController)
router.get('/requests',auth(Role.ADMIN,Role.LANDLORD),PropertyController.getAllRequestPropertyController)
router.patch('/requests/:id',auth(Role.ADMIN,Role.LANDLORD),PropertyController.updateRequestPropertyController)


export const PropertyRouter = router