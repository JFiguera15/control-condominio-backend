import { prisma } from '../config/config.js'

export const refExists = async (req, res, next) => {
	try {
		const ref = await prisma.payment.findUnique({
			where: {
				ref: req.body.ref,
			},
		})
		if (!ref) {
			return next()
		}

		res.status(400).json({
			message: 'Ref already exists',
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Something is wrong, try again later' })
	}
}
