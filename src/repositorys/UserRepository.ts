import { User } from '@prisma/client'
import prisma from '../prisma'


export async function GetAllUsers():Promise<any>{
    const GetAll = await prisma.user.findMany({
        select: {
            id: true,
            image: true,
            name: true,
            email: true, 
        }})

    return GetAll
}

export async function GetUserById(id:number):Promise<any>{
    const GetById = await prisma.user.findUnique({ 
        where: { 
            id: Number(id) 
        },
        select: {
            id: true,
            image: true,
            name: true,
            email: true,
            bio: {
                select:{ 
                   text: true 
                }
            },
            posts: false,
        }
    })

    return GetById
}


export async function GetFullUserById(id:number):Promise<any>{
    return await prisma.user.findUnique({ 
        where: { 
            id: Number(id) 
        },
    })
}