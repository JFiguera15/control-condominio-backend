import { Router } from "express";
import { addHouse, getHousesFromUser } from "../controllers/houseController.js";

const router = Router();

router.route("/:id").get(getHousesFromUser)
router.route("/").post(addHouse)

export default router;


