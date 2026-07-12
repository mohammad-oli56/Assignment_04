import { Router } from "express";
import { AdminController } from "./admin.controller";
import { auth } from "../../Middleware/veryfytoken";
import { Role } from "../../../generated/prisma/enums";

const router = Router()

router.get("/users",auth(Role.ADMIN),AdminController.Get_all_users)
router.patch("/users/:id",auth(Role.ADMIN),AdminController.Update_user_status)
router.get("/properties",auth(Role.ADMIN),AdminController.Get_all_properties)
router.get("/rentals",auth(Role.ADMIN),AdminController.Get_all_rental_requests)

export const AdminRouter = router