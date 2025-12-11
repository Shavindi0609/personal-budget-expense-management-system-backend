import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { createIncome, getIncomes, updateIncome, deleteIncome } from "../controllers/income.controller";

const router = Router();

router.use(authenticate);
router.get("/", getIncomes);
router.post("/", createIncome);
router.put("/:id", updateIncome);
router.delete("/:id", deleteIncome);

export default router;
