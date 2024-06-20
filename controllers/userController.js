import { prisma } from "../config/config.js"
import { exclude } from "../middleware/GeneralMiddleware.js";

export async function getAllUsers(req, res) {
    const users = await prisma.user.findMany();
    res.json(users);
}

export async function addUser(req, res) {
    const newUser = await prisma.user.create({
        data: req.body
    })
    res.status(201).json(newUser)
}

export async function getUser(req, res) {
    const user = await prisma.user.findFirst({
        where: {
            id: parseInt(req.params.id)
        },
    })
    const filteredUser = exclude(user, ["password"])
    res.json(filteredUser)
}
