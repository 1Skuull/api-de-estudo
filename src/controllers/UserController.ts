import { Request, Response } from "express"
import { hash } from "bcrypt"
import prisma from '../prisma'
import { CustomRequest } from "../middlewares/Auth"

async function GetAllUsers(request:Request, response:Response){
    try {
        const allUsers = await prisma.user.findMany({ 
            select: {
                id: true,
                name: true,
                email: true,
                posts: { 
                    select: {
                        id: true,
                        title: true,
                        content: true
                    }
                },
                profile: {
                    select: { 
                        id: true,
                        bio: true
                    }
                }

            }
        })

        return response.status(200).json({ allUsers }) 
    
    } catch (error) {
        return response.json(error)
    }
}


async function GetUser(request:CustomRequest, response:Response){
    try {
        const GetUser = await prisma.user.findMany({ 
            where: { 
                id: request.userId 
            },
            select: {
                id: true,
                name: true,
                email: true,
                posts: true,
                profile: {
                    select: {
                        id: true,
                        bio: true
                    }
                }
            }
        })

        return response.status(200).json({ user: GetUser }) 
    
    } catch (error) {
        return response.json(error)
    }
    
}


async function Update(request:Request, response:Response) {
    try {
        const { id } = request.params
        const { name, password }= request.body
        
        const user = await prisma.user.findUnique({ where: { id: Number(id) } })

        if(user?.name === name){
            return response.json({ error: true, message: "Usuario já possui esse nome" })
        }

        const hashPassword = await hash(password, 8)

        await prisma.user.update({
            where: { 
                id: Number(id) 
            },
            data: { 
                name, 
                password: hashPassword 
            }
        })

        return response.status(200).json({ error: false, message: "Usuarios alterado com sucesso" })
    
    } catch (error) {
        return response.json(error)
    
    }
    
}


async function Delete(request:Request, response:Response) {
    try {
        const { id } = request.params
    
        let user = await prisma.user.findUnique({ where: { id: Number(id) } })
    
        if(!user){
            return response.json({ error: true, message: "Usuario não existe" })
        }
    
        user = await prisma.user.delete({ where: { id: Number(id) }})
        
        return response.status(200).json({ error: false, message: "Usuarios deletado com sucesso" }) 
    
    } catch (error) {
        
        return response.json(error)
    
    }
}


export default { GetAllUsers, GetUser, Update, Delete }