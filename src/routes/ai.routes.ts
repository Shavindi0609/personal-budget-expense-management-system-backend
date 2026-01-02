import { Router } from "express";
import { financeChat } from "../controllers/ai.controller";

const router = Router();

// ✅ POST /api/v1/ai/chat
router.post("/chat", financeChat);

export default router;
