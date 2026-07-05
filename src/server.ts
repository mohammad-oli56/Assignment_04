import app from "./app"
import config from "./config"



async function main() {
    try {
        app.listen(config.PORT,()=>{
            console.log(`server is runngin PORT ${config.PORT}`)
        })
    } catch (error) {
        console.log("server error",error)
        process.exit(1)
    }
}

main()