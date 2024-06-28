import { Router } from 'express'
import {
	addPayment,
	getHousePayments,
	getUserPayments,
} from '../controllers/paymentController.js'
import { verifyToken } from '../middleware/GeneralMiddleware.js'
import { refExists } from '../middleware/paymentMiddleware.js'
import { houseExistsForPayment } from '../middleware/houseMiddelware.js'

const router = Router()

router.route('/').post(verifyToken, refExists, addPayment)
router
	.route('/house/:id')
	.get(verifyToken, houseExistsForPayment, getHousePayments)
router.route('/user').get(verifyToken, getUserPayments)

export default router
