import { Request, Response } from "express"
import { hash } from "bcrypt"
import prisma from '../prisma'
import { CustomRequest } from "../middlewares/Auth"
import { GetAllUsers, GetUserById, GetUserByIdWithPassword, deleteUser, updateUser } from "../repositorys/UserRepository"


async function GetAll(request:Request, response:Response){
    try {
        const page = parseInt(request.query.page as string) || 1;
        
        const AllUsers = await GetAllUsers(page, request.query.orderBy)

        return response.status(200).json(AllUsers) 
    } catch (error) {
        return response.json(error)
    }
}


async function Get(request:CustomRequest, response:Response){
    try {
        const UserById = await GetUserById(Number(request.userId))

        return response.status(200).json(UserById) 
    } catch (error) {
        return response.json(error)
    }
    
}


async function Update(request:Request, response:Response) {
    try {
        const { id } = request.params
        const { name, password, bio, email }= request.body
        
        let user = await GetUserByIdWithPassword(Number(id))

        if(user?.name === name){
            return response.json({ error: true, message: "Usuario já possui esse nome" })
        }

        // const hashPassword = await hash(password, 8)


        await updateUser(Number(id), { 
            name, 
            bio,
            email,
            // password: hashPassword
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
    
        const user = await GetUserById(Number(id))
    
        if(!user){
            return response.json({ error: true, message: "Usuario não existe" })
        }
    
        await deleteUser(Number(id))
        
        return response.status(200).json({ error: false, message: "Usuarios deletado com sucesso" }) 
    
    } catch (error) {
        
        return response.json(error)
    
    }
}


export default { GetAll, Get, Update, Delete }