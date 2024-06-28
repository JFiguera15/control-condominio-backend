import { Router } from 'express'
import {
	addHouse,
	getHouseById,
	getHousesFromUser,
} from '../controllers/houseController.js'
import { verifyToken } from '../middleware/GeneralMiddleware.js'
import { houseExists } from '../middleware/houseMiddelware.js'

const router = Router()

router.route('/').get(verifyToken, getHousesFromUser)
router.route('/:id').get(verifyToken, houseExists, getHouseById)
router.route('/').post(verifyToken, addHouse)

export default router
