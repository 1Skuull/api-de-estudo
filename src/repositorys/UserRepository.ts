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

export async function GetUserById(id:any):Promise<any>{
    const GetById = await prisma.user.findUnique({ 
        where: { 
            id 
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