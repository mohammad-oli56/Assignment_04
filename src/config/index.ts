import dotenv from 'dotenv'
import { SignOptions } from 'jsonwebtoken';
import path from 'node:path'

dotenv.config({path:path.join(process.cwd(),".env")})

export default {
    PORT : process.env.PORT,
    APP_URL : process.env.APP_URL,
    BCRYPT_SALT_ROUNDS : process.env.BCRYPT_SALT_ROUNDS,
    JWT_ACCESS_SECRET : process.env.JWT_ACCESS_SECRET!,
    JWT_EXPIRES_IN : process.env.JWT_EXPIRES_IN!,
    STORE_ID : process.env.STORE_ID!,
    STORE_PASSWORD : process.env.STORE_PASSWORD!
};