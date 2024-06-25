import { prisma } from '../config/config.js'
import { exclude } from '../middleware/GeneralMiddleware.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

export async function getAllUsers(req, res) {
	const users = await prisma.user.findMany()

	if (users.length <= 0) {
		res.status(404).json({
			message: 'No users found',
		})
		return
	}

	const filteredUsers = users.map((user) => exclude(user, ['password']))

	res.json(filteredUsers)
}

export async function addUser(req, res) {
	// Remove confirmPassword field from body
	const cleanUserInfo = exclude(req.body, ['confirmPassword'])
	const salt = bcrypt.genSaltSync(process.env.SALT_ROUNDS)
	const newPass = bcrypt.hashSync(req.body.password, salt)
	const hashedUser = { ...cleanUserInfo, password: newPass }
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
				email: email
			}
		})
		if (!user) console.log("no existe")
		const validPass = bcrypt.compareSync(password, user.password)
		if (!validPass) console.log("contraseña incorrecta")
		const token = jwt.sign({ id: user.id }, process.env.SECRET_JWT_KEY, { expiresIn: "1d" })
		res.status(200).cookie("access_token", token, { httpOnly: true }).json({ token: token })
	} catch (error) {
		res.status(401).send(error.message)
	}
}