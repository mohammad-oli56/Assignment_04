import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import config from './config'
import cookieParser from 'cookie-parser'
import { authRouts } from './models/auth/auth.router'
import { Categoryrouter } from './models/Category/category.router'
import { PropertyRouter } from './models/Property/Propertyrouter'
import { RentalController } from './models/Rental/Rental.controller'
import { RentalROuter } from './models/Rental/Rental.reoter'
import globalErrorHandler from './Middleware/globalErrorHandler'
import { landlordRouter } from './models/landlordRequest/landlordRequest.router'
import { AdminRouter } from './models/Admin/admin.router'
import { PaymentRouter } from './models/Payment/payment.router'
import { reviewRoutes } from './models/review/review.router'
import { notFound } from './Middleware/notFound'

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
app.use("/api/landlord",landlordRouter)
app.use("/api/properties",PropertyRouter)
app.use("/api/rentals",RentalROuter)
app.use("/api/admin",AdminRouter)
app.use("/api/payments",PaymentRouter)
app.use("/api/reviews",reviewRoutes)


app.use(notFound)
app.use(globalErrorHandler);

export default app;