import { Router } from "express";
import { authController } from "./auth.controller";
import { auth } from "../../Middleware/veryfytoken";
import { Role } from "../../../generated/prisma/enums";


const router = Router()

router.post('/register',authController.createUser)
router.post('/login',authController.loginUser)
router.get('/me',auth(Role.ADMIN,Role.TENANT),authController.myAccount)



export const authRouts = router

// 