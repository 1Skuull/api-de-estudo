import { Request, Response } from "express";
import prisma from '../prisma'
import { CustomRequest } from "../middlewares/Auth";
import { GetAllPosts, GetPostById } from "../repositorys/PostRepository";
import { GetFullUserById } from "../repositorys/UserRepository";


async function GetAllUserPost(request:CustomRequest, response:Response){
    const GetAllPost = await GetAllPosts()

    return response.status(200).json(GetAllPost)
}


async function GetUserPost(request:CustomRequest, response:Response){
    const { id } = request.params

    const GetPost = await GetPostById(id)

    return response.status(200).json(GetPost)
}


async function Create(request:Request, response:Response){
    try {
        const { title, content } = request.body
        const { id } = request.params

        if (!content || !id) {
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

    const findId = await prisma.post.findUnique({
        where: { 
            id: parseInt(id)
        }
    })

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