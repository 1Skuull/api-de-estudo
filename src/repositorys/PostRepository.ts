import { Post } from '@prisma/client'
import prisma from '../prisma'


export async function GetAllPosts():Promise<any>{
    
    const GetAllPosts = await prisma.post.findMany({
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


export async function GetPostById(id:number):Promise<any>{
    const GetPost = await prisma.post.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        where: { 
            author: { 
                id: Number(id)
            }
        },
        select: { 
            id: true,
            title: true,
            content: true,
            comment: true,
            createdAt: true,
            likes: {
                orderBy: {
                    author: {
                        createdAt: 'desc'
                    }
                },
            },
            author: {
                select: { 
                    id: true,
                    image: true,
                    name: true 
                }
            },
        }
    })

    return GetPost
}

export async function createPost(data:any):Promise<Post | null>{
    return await prisma.post.create({ data })
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