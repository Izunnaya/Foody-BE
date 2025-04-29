import { validateMyUserRequest } from './../middleware/validate';
import { jwtCheck, jwtParse } from './../middleware/auth';
import express from "express";
import MyUserController from "../controllers/MyUserController";

const router = express.Router();


// Once the request coming from /api/my/user is a post request, it get's forwarded to "MyUserController.createCurrentUser"
router.post("/", jwtCheck, MyUserController.createCurrentUser);
router.put("/", jwtCheck, jwtParse, validateMyUserRequest, MyUserController.updateCurrentUser);

export default router;
