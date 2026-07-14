import { Router } from "express";
import { PropertyController } from "./Propertycontroller";
import { auth } from "../../Middleware/veryfytoken";
import { Role } from "../../../generated/prisma/enums";

const router = Router()

router.get("/", PropertyController.getAllPropertyController)
router.get("/:id", PropertyController.getSinglePropertyController)












export const PropertyRouter = router