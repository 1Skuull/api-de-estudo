import { Request, Response } from "express";
import { CustomRequest } from "../middlewares/Auth";
import { GetPostById, GetAllPosts, GetPostsByIdOfUser, createPost, deletePost, updatePost } from "../repositories/PostRepository";
import { GetUserById } from "../repositories/UserRepository";


async function GetAll(request:CustomRequest, response:Response){
    const GetAllPost = await GetAllPosts()

    return response.status(200).json(GetAllPost)
}

async function Get(request:CustomRequest, response:Response){
    const { id } = request.params

    const GetPost = await GetPostsByIdOfUser(Number(id))

    return response.status(200).json(GetPost)
}


async function Create(request:Request, response:Response){
    try {
        const { content, image } = request.body
        const { id } = request.params

        if (!content || !id) {
            return response.status(400).json({ error: true, message: "Dados inválidos" });
        }

        const userExist = await GetUserById(parseInt(id))

        if(!userExist){
            return response.status(400).json({ error: true, message: "Usuario não existe" });
        }

        await createPost(Number(id), { image,content })


        return response.status(201).json({ error: false, message: "Post criado com sucesso" })
    } catch (error) {
        console.error(error)
        return response.status(400).json({ error, message: "Error ao criar uma postagem" })
    }
}


async function Update(request:Request, response:Response){
    try {
        const { title, content } = request.body
        const { id } = request.params
    
        const PostById = await GetPostById(Number(id))
    
        if(!PostById){
            return response.status(400).json({ error: true, message: "Postagem nao existe"})
        }
    
        await updatePost(Number(id), { title, content })
    
        return response.status(200).json({ error: false, message: "Post atualizado" })
    } catch (error) {
        console.log(error)
        return response.status(400).json({ error, message: "Error ao atualiza postagem" })
    }
}


async function Delete(request:Request, response:Response){
    try {
        const { id } = request.params
    
        const PostById = await GetPostById(Number(id))
    
        if(!PostById){
            return response.status(400).json({ error: true, message: "Postagem nao existe"})
        }
    
        await deletePost(Number(id))
    
        return response.status(200).json({ error: false, message: "Post deletado" })
    } catch (error) {
        console.log(error)
        return response.status(400).json({ error, message: "Error ao deletar postagem" })
    }
}


export default { Get, GetAll, Create, Update, Delete }