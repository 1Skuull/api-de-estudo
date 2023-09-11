import { Response, Router } from "express";
import { CustomRequest, verifyToken }   from "./middlewares/Auth"

import Auth from "./controllers/AuthController";
import User from "./controllers/UserController"
import Post  from "./controllers/PostController"

const router = Router()

//Auth

router.get("/verify", verifyToken, async (request: CustomRequest, response:Response) => {
    return response.status(200).json({ 
        auth: true, 
        msg : `Bem vindos`, 
        user: request.userId 
    })
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

router.get("/post/:id", Post.GetAllUserPost)

router.post("/post/:id", Post.Create)

export { router } 