import { Router } from 'express'
import { addUser, getAllUsers, getUser, login } from '../controllers/userController.js'
import { userExists, validateFields } from '../middleware/userMiddleware.js'

const router = Router()

router.route('/').get(getAllUsers)
router.route('/:id').get(getUser)
router.route('/').post(userExists, validateFields, addUser)
router.route('/token').post(login)

export default router
