import { Router } from "express";
import { auth } from "../../Middleware/veryfytoken";
import { Role } from "../../../generated/prisma/enums";
import { reviewController } from "./review.controller";

const router = Router();
router.post("/", auth(Role.TENANT),reviewController.addReview);

export const reviewRoutes = router;