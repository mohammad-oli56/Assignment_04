import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import config from './config'
import cookieParser from 'cookie-parser'
import { authRouts } from './models/auth/auth.router'
import { Categoryrouter } from './models/Category/category.router'

const app :Application = express()

app.use(cors({
    origin : config.APP_URL,
    credentials : true
}))

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
app.use(cookieParser())

app.get("/",(req : Request,res : Response)=>{
    res.send("Server is running!!!!!")
})


app.use("/api/auth",authRouts)
app.use("/api/categories",Categoryrouter)


export default app;