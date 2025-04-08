import { jwtCheck } from './../middleware/auth';
import express from "express";
import MyUserController from "../controllers/MyUserController";

const router = express.Router();


// Once the request coming from /api/my/user is a post request, it get's forwarded to "MyUserController.createCurrentUser"
router.post("/", jwtCheck, MyUserController.createCurrentUser);

export default router;
