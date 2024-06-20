import { prisma } from "../config/config.js"
import { exclude } from "../middleware/GeneralMiddleware.js";

export async function getHousesFromUser(req, res) {
    const houses = await prisma.house.findMany({
        where: {
            userId: parseInt(req.params.id)
        },
        include: {
            payments: true
        }
    })
    res.json(houses)
}

export async function addHouse(req, res){
    const newHouse = await prisma.house.create({
        data: req.body
    })
    res.status(201).json(newHouse)
}