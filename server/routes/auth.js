import express from "express";
import { login, refresh } from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.get("/refresh", verifyToken, refresh);

export default router;
