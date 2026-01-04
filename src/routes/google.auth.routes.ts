import express from "express";
import { googleLogin } from "../controllers/googleAuth.controller";

const router = express.Router();

// Existing login/register routes...
router.post("/google-login", googleLogin);

export default router;
