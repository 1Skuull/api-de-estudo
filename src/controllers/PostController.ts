import { Request, Response } from "express";
import { prisma } from '../prisma'
import { CustomRequest } from "../middlewares/Auth";


async function GetAllUserPost(request:CustomRequest, response:Response){
    const GetPost = await prisma.post.findMany({
        where: { 
            author: { 
                id: request.userId 
            }
        },
        select: { 
            id: true,
            title: true,
            content: true,
        }
    })

    return response.status(200).json({ GetPost })
}


async function Create(request:Request, response:Response){
    try {
        const { title, content } = request.body
        const { id } = request.params

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
        return response.status(400).json({ error, message: "Error" })
    }
}



async function Update(request:Request, response:Response){}


async function Delete(request:Request, response:Response){}



export default { GetAllUserPost, Create, Update, Delete }