import { Router } from "express";
import { addHouse, getHouseById, getHousesFromUser } from "../controllers/houseController.js";
import { verifyToken } from "../middleware/GeneralMiddleware.js";

const router = Router();

router.route("/").get(verifyToken, getHousesFromUser)
router.route("/:id").get(verifyToken, getHouseById)
router.route("/").post(verifyToken, addHouse)

export default router;


