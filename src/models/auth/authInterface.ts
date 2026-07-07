import { Role } from "../../../generated/prisma/enums";

export interface IRegisterUser {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: Role;
}


export interface ILogin {
  email: string
  password: string
}