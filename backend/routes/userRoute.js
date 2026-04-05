
import express from "express"
import { getUser } from "../controllers/userController.js";
import { isAuthenticate } from "../middleware/authMiddleware.js";

const router = express.Router()

router.get("/get-user", isAuthenticate, getUser)

export default router;