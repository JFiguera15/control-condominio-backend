import { Router } from "express";
import { addExpense, getUserExpenses } from "../controllers/expenseController.js";

const router = Router();

router.route("/").post(addExpense)
router.route("/:id").get(getUserExpenses)

export default router