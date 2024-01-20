import { Request, Response } from "express"
import { hash } from "bcrypt"
import prisma from '../prisma'
import { CustomRequest } from "../middlewares/Auth"
import { GetAllUsers, GetUserById } from "../repositorys/UserRepository"

async function AllUsers(request:Request, response:Response){
    try {
        const AllUsers = await GetAllUsers()

        return response.status(200).json(AllUsers) 
    } catch (error) {
        return response.json(error)
    }
}


async function GetUser(request:CustomRequest, response:Response){
    try {
        const UserById = await GetUserById(request.userId)

        return response.status(200).json(UserById) 
    } catch (error) {
        return response.json(error)
    }
    
}


async function Update(request:Request, response:Response) {
    try {
        const { id } = request.params
        const { name, password, bio, email }= request.body
        
        let user = await prisma.user.findUnique({ where: { id: Number(id) } })

        if(user?.name === name){
            return response.json({ error: true, message: "Usuario já possui esse nome" })
        }

        // const hashPassword = await hash(password, 8)

        await prisma.user.update({
            where: { 
                id: Number(id) 
            },
            data: { 
                name, 
                bio,
                email,
                // password: hashPassword
            }
        })

        return response.status(200).json({ error: false, message: "Usuario alterado com sucesso" })
    
    } catch (error) {
        console.log(error)
        return response.status(400).json("erro")
    
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


export default { AllUsers, GetUser, Update, Delete }