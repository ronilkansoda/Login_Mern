import express from "express";
import { signIn, signUp, google } from "../controllers/authControllers.js";

const router = express.Router()

router.post('/signUp',signUp)
router.post('/signIn',signIn)
router.post('/google',google)

export default router