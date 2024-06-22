import { prisma } from '../config/config.js'
import { exclude } from '../middleware/GeneralMiddleware.js'

export async function getAllUsers(req, res) {
	const users = await prisma.user.findMany()

	if (users.length <= 0) {
		res.status(404).json({
			message: 'No users found',
		})
		return
	}

	res.json(users)
}

export async function addUser(req, res) {
	// Remove confirmPassword field from body
	const cleanUserInfo = exclude(req.body, ['confirmPassword'])
	const newUser = await prisma.user.create({
		data: cleanUserInfo,
	})
	res.status(201).json(newUser)
}

export async function getUser(req, res) {
	const user = await prisma.user.findFirst({
		where: {
			id: parseInt(req.params.id),
		},
	})
	const filteredUser = exclude(user, ['password'])
	res.json(filteredUser)
}
