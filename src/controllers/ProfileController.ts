import { Request, Response } from "express";
import { prisma } from '../prisma'
import { CustomRequest } from "../middlewares/Auth";


async function GetProfile(request:CustomRequest, response:Response) {
    const GetProfile = await prisma.profile.findMany({ 
        where: { 
            author: { 
                id: request.userId 
            }
        },
        select: {
            id: true, 
            bio: true
        } 
    })

    return response.status(200).json({})
}

async function Create(request:Request, response:Response) {
    try {
        const { bio } = request.body

        // await prisma.profile.create({ data: { bio } })    

    } catch (error) {
        
    }
}

async function Update(request:Request, response:Response) {}

async function Delete(request:Request, response:Response) {}

export default { GetProfile, Create, Update, Delete }