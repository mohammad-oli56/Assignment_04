import { Router } from "express";
import { categoryController } from "./category.controller";
import { auth } from "../../Middleware/veryfytoken";
import { Role } from "../../../generated/prisma/enums";

const router = Router()

router.post('/', auth(Role.ADMIN),categoryController.creteCategoryFromCotroller)
router.get('/',auth(Role.ADMIN,Role.LANDLORD),categoryController.getAllCategoryController)


export const Categoryrouter = router