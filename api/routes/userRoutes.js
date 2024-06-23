import express from "express";
import { test, updateUser } from "../controllers/userControllers.js";
import { verifyToken } from "../utilities/verifyToken.js";

const router = express.Router()

router.get('/user',test)
router.post('/update/:id',verifyToken,updateUser)

export default router