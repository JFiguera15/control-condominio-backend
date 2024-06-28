import { prisma } from '../config/config'

export const houseExistsForPayment = async (req, res, next) => {
	try {
		const { houseId } = req.body
		const house = await prisma.house.findFirst({
			where: {
				id: houseId,
			},
		})

		if (house) {
			return next()
		}

		res.status(400).json({
			message: 'House does not exist',
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Something is wrong, try again later' })
	}
}

export const houseExists = async (req, res, next) => {
	try {
		const house = await prisma.house.findFirst({
			where: {
				id: req.params.id,
			},
		})

		if (house) {
			return next()
		}

		res.status(400).json({
			message: 'House does not exist',
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Something is wrong, try again later' })
	}
}
