import { Request, Response } from "express";
import prisma from '../prisma'


async function GetAll(request:Request, response:Response) {
    try {
        const comment = await prisma.comment.findMany()
    
        return response.status(200).json(comment)
    } catch (error) {
        return console.log(error)        
    }
}


async function Get(request:Request, response:Response) {
    try {
        const { id } = request.params 
    
        const comment = await prisma.comment.findMany({
            where: {
                post: {
                    id: parseInt(id)
                }
            }
        })
    
        return response.status(200).json(comment)
    } catch (error) {
        return console.log(error)        
    }
}

async function Create(request:Request, response:Response) {
    const { comment } = request.body  
    const { id } = request.params 
    
    const postExisting = await prisma.post.findFirst({
        where: {
            id: parseInt(id)
        }
    })    

    if(!postExisting){
        return response.status(400).json({message: "Post não existe"}) 
    }
    
    const teste = await prisma.comment.create({
        data: {
            comment, 
            published: true,
            postId: Number(id),
            userId: Number(2)
        }, 
        
    })

    return response.status(400).json({teste, message: "Teste dos comentarios"})
}

async function Update(request:Request, response:Response) {}

async function Delete(request:Request, response:Response) {}

export default { GetAll, Get, Create, Update, Delete }