import { Request, Response } from "express"
import { CustomRequest } from "../middlewares/Auth"
import { GetAllUsers, GetUserById, GetUserByIdWithPassword, deleteUser, updateUser } from "../repositories/UserRepository"
import bcrypt from "bcrypt"


async function GetAll(request:Request, response:Response){
    try {
        const page = parseInt(request.query.page as string) || 1;
        
        const AllUsers = await GetAllUsers(page, request.query.orderBy)

        return response.status(200).json(AllUsers) 
    } catch (error) {
        return response.status(400).json(error)
    }
}


async function Get(request:CustomRequest, response:Response){
    try {
        const UserById = await GetUserById(Number(request.userId))

        return response.status(200).json(UserById) 
    } catch (error) {
        return response.status(400).json(error)
    }
    
}


async function Update(request:Request, response:Response) {
    try {
        const { id } = request.params
        const { name, password, email }= request.body
        
        let user = await GetUserByIdWithPassword(Number(id))

        if(!user) {
            return response.status(400).json({ error: true, message: "Usuario não existe" })
        }

        if(user?.name === name){
            return response.status(400).json({ error: true, message: "Usuario já possui esse nome" })
        }

        await updateUser(Number(id), { 
            name, 
            email,
            // password: await bcrypt.hash(password, 8)
        })

        return response.status(201).json({ error: false, message: "Usuario alterado com sucesso" })
    } catch (error) {
        console.log(error)
        return response.status(400).json({error, message: "Erro ao atualiza usuario"})
    
    }
    
}


async function Delete(request:Request, response:Response) {
    try {
        const { id } = request.params
    
        const user = await GetUserById(Number(id))
    
        if(!user){
            return response.status(400).json({ error: true, message: "Usuario não existe" })
        }
    
        await deleteUser(Number(id))
        
        return response.status(200).json({ error: false, message: "Usuarios deletado com sucesso" }) 
    } catch (error) {
        return response.status(400).json(error)
    }
}


export default { GetAll, Get, Update, Delete }