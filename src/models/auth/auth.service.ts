import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";
import { ILogin, IRegisterUser } from "./authInterface";
import { Role, UserStatus } from "../../../generated/prisma/enums";
import jwt from "jsonwebtoken"



const createUserIntoDB = async (payload: IRegisterUser) => {
  const { name, email, phoneNumber, password, role } = payload;

  // Check email already exists
  const isUserExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isUserExists) {
    throw new Error("Email already exists");
  }

  // Validate phone number
  const isPhoneNumberValid = (phone: string): boolean => {
    return /^01\d{9}$/.test(phone);
  };

  if (!isPhoneNumberValid(phoneNumber)) {
    throw new Error("Phone number start with 01 and must be 11 digits");

  }

  const isPhoneExists = await prisma.user.findUnique({
    where: { phoneNumber },
  });

  if (isPhoneExists) {
    throw new Error("Phone number already exists");
  }


  const hashedPassword = await bcrypt.hash(password, Number(config.BCRYPT_SALT_ROUNDS));

  const result = await prisma.user.create({
    data: {
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    },
    omit: {
      password: true,
    },
  });




  return result;
};



const loginuserBydb = async (payload: ILogin) => {
  const { email, password } = payload

  const fintuserinbd = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (!fintuserinbd) {
    throw new Error("This email not have any account")

  }

  const matchPassword = await bcrypt.compare(
    password,
    fintuserinbd.password
  );

  if (!matchPassword) {
    throw new Error("password not match!")
  }
 

  if (fintuserinbd.status === UserStatus.BLOCKED) {
    throw new Error("Your accoutn BLOCKED by Admin")
  }
 
const jwtPayload = {
  id: fintuserinbd.id,
  email: fintuserinbd.email,
  phoneNumber: fintuserinbd.phoneNumber,
  role: fintuserinbd.role,
};

 const token = jwt.sign(
  jwtPayload,
  config.JWT_ACCESS_SECRET,
  {
    expiresIn: "7d",
  }
);

return token

  // end this section
}




export const authService = {
  createUserIntoDB,
  loginuserBydb
};