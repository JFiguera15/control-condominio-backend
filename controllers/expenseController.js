import { prisma } from '../config/config.js'

export async function addExpense(req, res) {
	const newExpense = await prisma.expense.create({
		data: req.body,
	})
	res.status(201).json(newExpense)
}

export async function getUserExpenses(req, res) {
	const expenses = await prisma.expense.findMany({
		where: {
			userId: req.session.user.id,
		},
	})
	res.json(expenses)
}
