import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import UserRoutes from './routes/userRoutes.js'
import authUser from './routes/authUser.js'

dotenv.config();
mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MOngoDb');
}).catch((err) => {
    console.log(err);
})

const app = express()

app.use(express.json())
app.use(cookieParser());


app.get('/api/test-cookies', (req, res) => {
    console.log("Test Cookies: ", req.cookies);
    res.status(200).json(req.cookies);
});
app.use('/api', UserRoutes)
app.use('/api', authUser)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || "Internal server error";
    return res.status(statusCode).json({
        success: false,
        errorMessage,
        statusCode
    })
})

app.listen(3000, () => {
    console.log('Subh Suruvat');
})