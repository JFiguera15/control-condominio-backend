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
