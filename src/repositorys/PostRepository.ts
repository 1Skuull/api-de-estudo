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
            }
        }
    })

    return GetAllPosts
}


export async function GetPostById(id:any):Promise<any>{
    const GetPost = await prisma.post.findFirst({
        where: { 
            author: { 
                id: parseInt(id)
            }
        },
        select: { 
            id: true,
            title: true,
            content: true,
            likes: {
                select: {
                    author: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            },
            comment: true,
            author: {
                select: { 
                    id: true,
                    image: true,
                    name: true 
                }
            }
        }
    })

    return GetPost
}