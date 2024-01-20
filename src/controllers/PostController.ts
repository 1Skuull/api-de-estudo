import { Request, Response } from "express";
import prisma from '../prisma'
import { CustomRequest } from "../middlewares/Auth";


async function GetAllUserPost(request:CustomRequest, response:Response){
    const GetAllPost = await prisma.post.findMany({
        select: { 
            id: true,
            title: true,
            content: true,
            author: {
                select: { 
                    id: true,
                    name: true 
                }
            }
        }
    })

    return response.status(200).json({ GetAllPost })
}


async function GetUserPost(request:CustomRequest, response:Response){
    const { id } = request.params

    const GetPost = await prisma.post.findMany({
        where: { 
            author: { 
                id: parseInt(id)
            }
        },
        select: { 
            id: true,
            title: true,
            content: true,
            likes: true,
            comment: true,
            author: {
                select: { 
                    id: true,
                    image: true,
                    name: true 
                }
            }
        }
    })

   

    return response.status(200).json({ GetPost })
}


async function Create(request:Request, response:Response){
    try {
        const { title, content } = request.body
        const { id } = request.params

        if (!title || !content || !id) {
            return response.status(400).json({ error: true, message: "Dados inválidos" });
        }


        await prisma.post.create({ 
            data: {
                title, 
                content,
                published: true,
                author: { 
                    connect: { 
                        id : parseInt(id) 
                    }
                }
            }
        })

        return response.status(200).json({ error: false, message: "Post criado com sucesso" })
    } catch (error) {
        console.error(error)

        return response.status(400).json({ error: true, message: "Erro interno do servidor" })
    }
}



async function Update(request:Request, response:Response){
    const { title, content } = request.body
    const { id } = request.params

    const findId = await prisma.post.findUnique({where: { id: parseInt(id)}})

    if(!findId){
        return response.status(200).json({ error: true, message: "Post nao existe"})
    }

    await prisma.post.update({
        where: { id: Number(id) },
        data: { title, content }
    })

    return response.status(200).json({ error: false, message: "Post atualizado" })
}


async function Delete(request:Request, response:Response){
    const { id } = request.params

    const findId = await prisma.post.findUnique({where: { id: parseInt(id)}})

    if(!findId){
        return response.status(200).json({ error: true, message: "Post nao existe"})
    }

    await prisma.post.delete({
        where: { 
            id: parseInt(id)
        }
    })

    return response.status(200).json({ error: false, message: "Post deletado" })
}





export default { GetUserPost, GetAllUserPost, Create, Update, Delete }