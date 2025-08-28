import express from "express";
import userController from "../controllers/userController.js";
import { verifyToken } from './../middlewares/verifyToken.js';


const router = express.Router();
router.get("/profile", verifyToken, userController.getProfile);

export default router;