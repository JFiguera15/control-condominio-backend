import { Router } from 'express'
import { addUser, getAllUsers, getUser } from '../controllers/userController.js'
import { validateFields } from '../middleware/userMiddleware.js'

const router = Router()

router.route('/').get(getAllUsers)
router.route('/:id').get(getUser)
router.route('/').post(validateFields, addUser)

export default router
