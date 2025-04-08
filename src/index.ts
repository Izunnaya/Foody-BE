
import dotenv from 'dotenv';
import express from "express";
import cors from "cors"
import mongoose from "mongoose"
import MyUserRoute from "./routes/MyUserRoute";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
    console.log ("connected to the database")
})

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json())
// Once a request comes from the frontend through /api/my/user, it'll be forwarded to "MyUserRoute"
app.use("/api/my/user", MyUserRoute)




app.listen(7000, () => {
    console.log ("Server started on localhost:7000")
})