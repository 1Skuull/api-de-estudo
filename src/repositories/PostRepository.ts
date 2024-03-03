import { Post } from '@prisma/client'
import prisma from '../prisma'


export async function GetPostById(id:number):Promise<any>{
    return await prisma.post.findFirst({ where: { id } })
}


export async function GetAllPosts():Promise<any>{
    const GetAllPosts = await prisma.post.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        select: { 
            id: true,
            title: true,
            content: true,
            author: {
                select: { 
                    id: true,
                    name: true 
                }
            },
            createdAt: true
        }
    })

    return GetAllPosts
}


export async function GetPostsByIdOfUser(id:number):Promise<any>{
    const GetPosts = await prisma.post.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        where: { 
            userId: Number(id)
        },
        select: { 
            id: true,
            title: true,
            content: true,
            createdAt: true,
            author: {
                select: { 
                    id: true,
                    image: true,
                    name: true 
                }
            },
            _count: {
                select: {
                    likes: true, 
                    comment: true
                }
            },
        }
    })

    return GetPosts
}

export async function createPost(id:number, body:any):Promise<Post | null>{
    return await prisma.post.create({ 
        data: {
            ...body, 
            published: true,
            userId: Number(id)
        }
    })
}


export async function updatePost(id:number, data:any):Promise<Post | null>{
    return await prisma.post.update({
        where: {
            id
        },
        data
    })
}


export async function deletePost(id:number):Promise<Post | null>{
    return await prisma.post.delete({
        where: {
            id
        },
    })
}