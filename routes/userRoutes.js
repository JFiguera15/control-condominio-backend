import { Router } from "express";
import { addUser, getAllUsers, getUser } from "../controllers/userController.js";

const router = Router()

router.route("/").get(getAllUsers);
router.route("/:id").get(getUser)
router.route("/").post(addUser)

export default router