import { User } from '@prisma/client';
import prisma from '../prisma'


export async function GetAllUsers(page:number, order:any):Promise<any>{

    const GetAll = await prisma.user.findMany({
        orderBy: {
            name: order
        },
        select: {
            id: true,
            image: true,
            name: true,
            email: true,
            password: false,
            createdAt: true,
            updatedAt: true,
        },
        skip: (page - 1) * 10,
        take: 10,
    })

    return GetAll
}

export async function GetUserById(id:number):Promise<any>{
    const GetById = await prisma.user.findFirst({ 
        where: { 
            id 
        },
        select: {
            id: true,
            image: true,
            name: true,
            email: true,
            password: false,
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

export async function createUser(data:any):Promise<User | null>{
    return await prisma.user.create({ data })
}

export async function updateUser(id:number, data:any):Promise<User | null>{
    return await prisma.user.update({
        where: {
            id
        },
        data
    })
}

export async function deleteUser(id:number):Promise<User | null>{
    return await prisma.user.delete({
        where: {
            id
        },
    })
}

export async function GetUserByIdWithPassword(id:number):Promise<User | null>{
    return await prisma.user.findUnique({ 
        where: { 
            id 
        },
    })
}


export async function GetUserByEmailWithPassword(email:string):Promise<User | null>{
    return await prisma.user.findUnique({ 
        where: { 
            email
        },
    })
}