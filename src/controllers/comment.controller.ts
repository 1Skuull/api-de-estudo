import { Request, Response } from "express";
import prisma from '../prisma'
import { CustomRequest } from "../middlewares/Auth";


async function GetAll(request:Request, response:Response) {
    try {
        const comment = await prisma.comment.findMany({
            select: {
                id: true,
                comment: true, 
                createdAt: true,
                updatedAt: true,
                author: {
                    select: {
                        id: true, 
                        name: true
                    }}, 
                post: {
                    select: {
                        id: true, 
                        content: true
                    }
                }
            }
        })
    
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
                postId: parseInt(id)
            },
            select: {
                id: true,
                comment: true, 
                createdAt: true,
                updatedAt: true,
                author: {
                    select: {
                        id: true, 
                        name: true
                    }}, 
                post: {
                    select: {
                        id: true, 
                        content: true
                    }
                }
            }
        })
    
        return response.status(200).json(comment)
    } catch (error) {
        return console.log(error)        
    }
}

async function Create(request:CustomRequest, response:Response) {
    const { comment } = request.body  
    const { id } = request.params 

    if (!comment || !id) {
        return response.status(400).json({ error: true, message: "Dados vazios" });
    }
    
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
            userId: Number(request.userId)
        }, 
        
    })

    return response.status(400).json({ teste, message: "Teste dos comentarios" })
}

async function Update(request:Request, response:Response) {}

async function Delete(request:Request, response:Response) {}

export default { GetAll, Get, Create, Update, Delete }