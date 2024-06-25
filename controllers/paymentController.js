import { prisma } from '../config/config.js'

export async function addPayment(req, res) {
    const newPayment = await prisma.payment.create({
        data: req.body
    })
    res.status(201).json(newPayment)
}

export async function getHousePayments(req, res) {
    const payments = await prisma.payment.findMany({
        where: {
            userId: parseInt(req.session.user.id),
            houseId: parseInt(req.params.id)
        }
    })
    res.json(payments)
}

export async function getUserPayments(req, res) {
    const payments = await prisma.payment.findMany({
        where: {
            userId: parseInt(req.session.user.id)
        }
    })
    res.json(payments)
}