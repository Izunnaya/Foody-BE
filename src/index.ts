import express from "express";
import cors from "cors"
import "dotenv/config";
import mongoose from "mongoose"
import MyUserRoute from "./routes/MyUserRoute";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
    console.log ("connected to the database")
})

const app = express();

// Once a request comes from the frontend through /api/my/user, it'll be forwarded to "MyUserRoute"
app.use("/api/my/users", MyUserRoute)

app.listen(7000, () => {
    console.log ("Server started on localhost:7000")
})