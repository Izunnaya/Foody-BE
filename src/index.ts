import express, { Request, Response } from "express";
import cors from "cors"


const app = express();

app.get("/test", async (req: Request, res: Response) => {
    res.json({ message: "Hello" })
});

app.listen(7000, () => {
    console.log ("Server started on localhost:7000")
})