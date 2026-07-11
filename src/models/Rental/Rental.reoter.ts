import { Router } from "express";
import { auth } from "../../Middleware/veryfytoken";
import { Role } from "../../../generated/prisma/enums";
import { RentalController } from "./Rental.controller";

const router = Router()

router.post(
  "/",
  auth(Role.TENANT,Role.ADMIN),
  RentalController.createRental
);

router.get(
  "/",
  auth(Role.TENANT,Role.ADMIN),
  RentalController.getMyRentals
);

router.get(
  "/:id",
  auth(Role.TENANT,Role.ADMIN),
  RentalController.getSingleRental
);


export const RentalROuter = router