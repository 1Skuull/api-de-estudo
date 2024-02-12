import { Request, Response } from "express";
import prisma from '../prisma'
import { CustomRequest } from "../middlewares/Auth";
import { GetAllPosts, GetPostById, createPost, deletePost, updatePost } from "../repositorys/PostRepository";


async function GetAll(request:CustomRequest, response:Response){
    const GetAllPost = await GetAllPosts()

    return response.status(200).json(GetAllPost)
}

async function Get(request:CustomRequest, response:Response){
    const { id } = request.params

    const GetPost = await GetPostById(parseInt(id))

    return response.status(200).json(GetPost)
}


async function Create(request:Request, response:Response){
    try {
        const { title, content } = request.body
        const { id } = request.params

        if (!content || !id) {
            return response.status(400).json({ error: true, message: "Dados inválidos" });
        }

        await createPost({
            title, 
            content,
            published: true,
            author: { 
                connect: { 
                    id : parseInt(id) 
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

    const findId = await GetPostById(parseInt(id))

    if(!findId){
        return response.status(200).json({ error: true, message: "Post nao existe"})
    }

    await updatePost(Number(id), { title, content })

    return response.status(200).json({ error: false, message: "Post atualizado" })
}


async function Delete(request:Request, response:Response){
    const { id } = request.params

    const findId = await GetPostById(parseInt(id))

    if(!findId){
        return response.status(200).json({ error: true, message: "Post nao existe"})
    }

    await deletePost(parseInt(id))

    return response.status(200).json({ error: false, message: "Post deletado" })
}


export default { Get, GetAll, Create, Update, Delete }