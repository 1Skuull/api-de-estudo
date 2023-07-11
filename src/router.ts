import { Response, Router } from "express";
import { CustomRequest, verifyToken }   from "./middlewares/Auth"
import { prisma } from "./prisma";

import Auth from "./controllers/AuthController";
import User from "./controllers/UserController"
import Post  from "./controllers/PostController"
import Profile from "./controllers/ProfileController";

const router = Router()

//Auth

router.get("/verify", verifyToken, async (request: CustomRequest, response:Response) => {

    // const User = await prisma.user.findUnique({ where: { id: Number(request.userId) }})
  
    return response.status(200).json({ auth: true, msg : `Bem vindos`, user: request.userId })
})
// Authetication

router.post("/login", Auth.login)

router.post("/register", Auth.register)

router.get("/logout", verifyToken, Auth.logout);

//Users

router.get("/user", verifyToken, User.GetUser)

router.get("/users", User.GetAllUsers)

router.put("/user/:id", User.Update)

router.delete("/user/:id", User.Delete)

//Posts

router.get("/post", verifyToken, Post.GetAllUserPost)

router.post("/post/:id", Post.Create)

// Profile

router.get("/profile", verifyToken, Profile.GetProfile)


export { router } 