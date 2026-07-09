import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma/enums";
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config";
import { prisma } from "../lib/prisma";

declare global {
    namespace Express {
        interface Request {
            user?: {
                email: string
                name: string
                id: string
                role: Role
                phoneNumber : string
            }
        }
    }
}

export const auth = (...requiredRoles: Role[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // console.log(req.cookies.AccessToken);

        // Token verify
        const token =
            req.cookies.AccessToken
                ? req.cookies.AccessToken
                : req.headers.authorization?.startsWith("Bearer")
                    ? req.headers.authorization.split(" ")[1]
                    : undefined;

        if (!token) {
            throw new Error("you are not logged in")
        }


        const verifiedToken = jwt.verify(token, config.JWT_ACCESS_SECRET)

        console.log(verifiedToken)

        const { id, name, email, phoneNumber, role } = verifiedToken as JwtPayload

        if (requiredRoles.length && !requiredRoles.includes(role)) {
            throw new Error("forbidden .You dont have permission to access")
        }

        const user = await prisma.user.findUnique({
            where: {
                id,
                email,
            }
        })

        if (!user) {
            throw new Error("user not found")
        }

        if (user.status === "BLOCKED") {
            throw new Error(" your account blocked .please contact support ")
        }


        req.user = {
            email,
            name,
            id,
            role,
            phoneNumber
        }


        
        next();
    };
};