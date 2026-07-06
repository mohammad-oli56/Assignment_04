import app from "./app"
import config from "./config"
import { prisma } from "./lib/prisma"



async function main() {
    try {
        await prisma.$connect()
        console.log("prisma server connect sucssfully")

        app.listen(config.PORT,()=>{
            console.log(`server is runngin PORT ${config.PORT}`)
        })
    } catch (error) {
        console.log("server error",error)
         await prisma.$disconnect();
        process.exit(1)
    }
}

main()