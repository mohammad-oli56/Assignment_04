import dotenv from 'dotenv'
import path from 'node:path'

dotenv.config({path:path.join(process.cwd(),".env")})

export default {
    PORT : process.env.PORT,
    APP_URL : process.env.APP_URL
};