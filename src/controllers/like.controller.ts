import { Request, Response } from "express";
import prisma from '../prisma'
import { CustomRequest } from "../middlewares/Auth"



async function likePost(request:CustomRequest, response:Response) {
    try {
        const { id } = request.params

        const post = await prisma.post.findFirst({
            where: { 
                id: Number(id) 
            },
        });

        if (!post) {
            return response.status(404).json({ error: true, message: 'Post não encontrado' });
        }
    
        const existingLike = await prisma.like.findFirst({
            where: {
                postId: Number(id),
                userId: Number(request.userId),
            },
        });
    
        if (existingLike) {
            await prisma.like.delete({
                where: {
                    id: Number(existingLike.id),
                },
            });

            return response.status(200).json({ error: false, message: 'Deslike realizado com sucesso' });
        }
    
        await prisma.like.create({
            data: {
                postId: Number(id),
                userId: Number(request.userId) 
            },
        })

        return response.status(200).json({ error: false, message: "Bah like" })
    } catch (error) {
        console.error(error)
        return response.status(400).json({ error, message: "Deu erro na curtida doidão" })
    }
}


async function getAllLikesOfUser(request:Request, response:Response) { 
    const { id } = request.params
    
    const likes = await prisma.like.findMany({
        where: { 
            userId: parseInt(id) 
        },
        select: {
            post: {
                select: {
                    id: true,
                    image: true,
                    title: true,
                    content: true,
                    author: { 
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            },
            
        }
      });

    return response.status(200).json(likes)
}



export default { likePost, getAllLikesOfUser }