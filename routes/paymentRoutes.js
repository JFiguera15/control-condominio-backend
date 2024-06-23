import { Router } from "express";
import { addPayment, getHousePayments, getUserPayments } from "../controllers/paymentController.js";

const router = Router();

router.route("/").post(addPayment)
router.route("/house/:id").get(getHousePayments)
router.route("/user/:id").get(getUserPayments)

export default router