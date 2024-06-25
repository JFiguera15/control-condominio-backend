import { prisma } from "../config/config.js"

export async function getHousesFromUser(req, res) {
    const houses = await prisma.house.findMany({
        where: {
            userId: parseInt(req.session.user.id)
        },
        include: {
            payments: true
        }
    })
    res.json(houses)
}

export async function getHouseById(req, res) {
    const house = await prisma.house.findFirst({
        where: {
            userId: parseInt(req.session.user.id),
            id: parseInt(req.params.id)
        },
        include: {
            payments: true
        }
    })
    res.json(house)
}

export async function addHouse(req, res){
    const newHouse = await prisma.house.create({
        data: req.body
    })
    res.status(201).json(newHouse)
}