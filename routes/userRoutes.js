import { Router } from 'express'
import {
	addUser,
	getAllUsers,
	getUser,
	login,
	logout,
} from '../controllers/userController.js'
import {
	userDoesNotExist,
	userExists,
	validateFields,
} from '../middleware/userMiddleware.js'

const router = Router()

router.route('/').get(getAllUsers)
router.route('/:id').get(getUser)
router.route('/').post(userDoesNotExist, validateFields, addUser)
router.route('/token').post(userExists, login)
router.route('/clear').delete(logout)

export default router
