import { prisma } from '../config/config.js'
import { exclude } from '../middleware/GeneralMiddleware.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function getAllUsers(req, res) {
	const users = await prisma.user.findMany()

	if (users.length <= 0) {
		return res.status(404).json({
			message: 'No users found',
		})
	}

	const filteredUsers = users.map((user) => exclude(user, ['password']))

	res.json(filteredUsers)
}

export async function addUser(req, res) {
	const salt = bcrypt.genSaltSync(process.env.SALT_ROUNDS)
	const hashedPassword = bcrypt.hashSync(req.body.password, salt)
	// Remove confirmPassword field from body
	const cleanUserInfo = exclude(req.body, ['confirmPassword'])
	const hashedUser = { ...cleanUserInfo, password: hashedPassword }
	const newUser = await prisma.user.create({
		data: hashedUser,
	})
	const filteredUser = exclude(newUser, ['password'])
	res.status(201).json(filteredUser)
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

export async function login(req, res) {
	const { email, password } = req.body
	try {
		const user = await prisma.user.findFirst({
			where: {
				email: email,
			},
		})

		const validPass = bcrypt.compareSync(password, user.password)
		if (!validPass) {
			return res.status(400).json({
				message: 'Invalid password',
			})
		}
		const token = jwt.sign({ id: user.id }, process.env.SECRET_JWT_KEY, {
			expiresIn: '1d',
		})
		res
			.status(200)
			.cookie('access_token', token, { httpOnly: true })
			.json({ token: token })
	} catch (error) {
		res.status(401).send(error.message)
	}
}
