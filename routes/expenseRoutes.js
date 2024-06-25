import { Router } from "express";
import { addExpense, getUserExpenses } from "../controllers/expenseController.js";
import { verifyToken } from "../middleware/GeneralMiddleware.js";

const router = Router();

router.route("/").post(verifyToken, addExpense)
router.route("/").get(verifyToken, getUserExpenses)

export default router