import { Request, Response } from "express";
import prisma from '../prisma'
import { CustomRequest } from "../middlewares/Auth";
import { GetUserById } from "../repositories/UserRepository";


async function GetAll(request:Request, response:Response) {
    const GetAllBios = await prisma.bio.findMany()

    return response.status(200).json(GetAllBios)
}

async function Get(request:CustomRequest, response:Response) {
    const { id } = request.params

    const GetBio = await prisma.bio.findMany({
        where: { 
            author: { 
                id: parseInt(id)
            }
        },
        select: { 
            text: true,
            author: {
                select: { 
                    id: true,
                    name: true 
                }
            }
        }
    })

    return response.status(200).json(GetBio)
}


async function Create(request:Request, response:Response) {
    try {
        const { text } = request.body;
        const { id } = request.params;

        if (!text || !id) {
            return response.status(400).json({ error: true, message: "Dados inválidos" });
        }

        await prisma.bio.create({
            data: {
                text,
                author: {
                    connect: {
                        id: Number(id)
                    }
                }
            }
        });

        return response.status(200).json({ error: false, message: "Bio criada com sucesso" });
    } catch (error) {
        console.error(error);

        return response.status(500).json({ error: true, message: "Erro interno do servidor" });
    }
}


async function Update(request:Request, response:Response) {
    const { text } = request.body
    const { id } = request.params

    const findById = await GetUserById(Number(id))

    if(!findById){
        return response.status(200).json({ error: true, message: "Usuario nao existe"})
    }

    await prisma.bio.update({ 
        where: { 
            userId: Number(id) 
        },
        data: { 
            text
        }
    })
    return response.status(200).json({ error: false, message: "Bio atualizada com sucesso" })
}


async function Delete(request:Request, response:Response) {
    const { id } = request.params

    const findById = await GetUserById(Number(id))

    if(!findById){
        return response.status(200).json({ error: true, message: "Bio nao existe"})
    }

    await prisma.bio.delete({
        where: { 
            userId: Number(id)
        }
    })

    return response.status(200).json({ error: false, message: "Bio limpa" })
}

export default { GetAll, Get, Create, Update, Delete }