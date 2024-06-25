import { Router } from "express";
import { addPayment, getHousePayments, getUserPayments } from "../controllers/paymentController.js";
import { verifyToken } from "../middleware/GeneralMiddleware.js";

const router = Router();

router.route("/").post(verifyToken, addPayment)
router.route("/house/:id").get(verifyToken, getHousePayments)
router.route("/user").get(verifyToken, getUserPayments)

export default router

