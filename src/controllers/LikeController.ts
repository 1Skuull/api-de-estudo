import { Request, Response } from "express";
import prisma from '../prisma'
import { CustomRequest } from "../middlewares/Auth"

async function NewLike(request:CustomRequest, response:Response) {
    const { id } = request.params

    await prisma.like.create({
        data: {
            postId: parseInt(id),
            authorId: 1 
        },
    })
    return response.status(200).json({ error: false, message: "Bah like" })
}

async function AllLikes(request:Request, response:Response) { 
    const likes = await prisma.like.findMany({
        where: { postId: 1 },
        select: {
            author: { select: { name: true }}
        }
      });
    return response.status(200).json(likes)
}



export default { NewLike, AllLikes }