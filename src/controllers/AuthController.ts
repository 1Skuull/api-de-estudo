import jwt from "jsonwebtoken"
import { Request, Response } from "express"
import bcrypt from "bcrypt"
import prisma  from '../prisma'


async function login(request:Request, response:Response){
    try {
        const { email, password } = request.body

        const User = await prisma.user.findUnique({ where: { email }})
        
        if(!password || !email){
            return response.json({ error: true, message: "Campo esta vazio" });
        }

        const isPassword = await bcrypt.compare(password, String(User?.password))

        if (!isPassword || User?.email !== email) {
            return response.json({ error: true, message: "Email ou senha incorreta" });
        }
        
        const token = jwt.sign({ id: User?.id, expiresIn: '1h' }, process.env.KEY_TOKEN as string );
        
        response.cookie('token', token, { maxAge: 3600000, httpOnly: false });
        
        return response.status(200).json({ error: false,  message: "Login efetuado com sucesso", token })
    
    } catch (error) {
        
        return response.json(error)
    
    }
}


async function logout(request: Request, response: Response) {
    response.clearCookie("token");
    return response.status(200).json({ message: "Cookie deletado." });
}


async function register(request:Request, response:Response){
    try {
        const { name, email, password, confirmPassword } = request.body

        let Users = await prisma.user.findUnique({ where: { email }})
        
        if(confirmPassword !== password){
            return response.json({ error: true, message: "As senhas são diferentes" })
        }

        if(Users){
            return response.json({ error: true, message: "Email ja cadastrado" })
        }
        
        const hashPassword = await bcrypt.hash(password, 8)

        Users = await prisma.user.create({ data: { name, email, password: hashPassword }})

        return response.status(200).json({ error: false, message: "Cadastrado com sucesso"})
    
    } catch (error) {
        
        return response.json(error)
    
    }
    
}

export default { logout, login, register }