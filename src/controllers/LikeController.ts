import { Request, Response } from "express";
import prisma from '../prisma'
import { CustomRequest } from "../middlewares/Auth"

async function NewLike(request:CustomRequest, response:Response) {
    try {
        const { id } = request.params

        const post = await prisma.post.findUnique({
            where: { id: Number(id) },
        });

        if (!post) {
            return response.status(404).json({ error: true, message: 'Post não encontrado' });
        }
    
        const existingLike = await prisma.like.findFirst({
            where: {
                postId: Number(id),
                authorId: Number(request.userId),
            },
        });
    
        if (existingLike) {
            return response.status(400).json({ error: true, message: 'Você já curtiu esse post' });
        }
    
        await prisma.like.create({
            data: {
                postId: Number(id),
                authorId: Number(request.userId) 
            },
        })
        return response.status(200).json({ error: false, message: "Bah like" })
    } catch (error) {
        console.error(error)
        return response.status(200).json({ error: true, message: "Não dá pra curtir doidão" })
    }
}

async function AllLikes(request:Request, response:Response) { 
    const likes = await prisma.like.findMany({
        where: { postId: 2 },
        select: {
            author: { select: { name: true }}
        }
      });
    return response.status(200).json(likes)
}

async function RemoveLike(request:Request, response:Response) {
    const { id } = request.params

    await prisma.like.delete({ where: { id: Number(id) } })

    return response.status(200).json({ error: false, message: "Like Removido" })
}

export default { NewLike, AllLikes, RemoveLike }