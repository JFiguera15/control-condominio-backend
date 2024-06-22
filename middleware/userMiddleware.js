import { prisma } from '../config/config.js'
import { userSignupSchema } from '../schemas/user.schemas.js'

export const validateFields = async (req, res, next) => {
	try {
		const result = userSignupSchema.safeParse(req.body)

		if (!result.success) {
			res.status(400).json(result.error)
			return
		}

		next()
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Something is wrong, try again later' })
	}
}

export const userExists = async (req, res, next) => {
	try {
		const { email } = req.body
		const user = await prisma.user.findFirst({
			where: {
				email: email,
			},
		})

		if (!user) next()

		res.status(400).json({
			message: 'User already exist',
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Something is wrong, try again later' })
	}
}
