import { Response, Router } from "express";
import { CustomRequest, verifyToken }   from "../middlewares/Auth"

import Auth from "../controllers/AuthController";
import User from "../controllers/UserController"
import Post  from "../controllers/PostController"
import Bio  from "../controllers/BioController"
import LikeController from "../controllers/LikeController";

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

router.get("/users", User.AllUsers)
router.get("/user", verifyToken, User.GetUser)
router.put("/user/:id", User.Update)
router.delete("/user/:id", User.Delete)

//Bio

router.get("/bios", Bio.GetAllBios)
router.get("/bio/:id", Bio.GetBio)
router.post("/bio/:id", Bio.Create)
router.put("/bio/:id", Bio.Update)
router.delete("/bio/:id", Bio.Delete)

//Posts

router.get("/posts", Post.GetAllUserPost)
router.get("/post/:id", Post.GetUserPost)
router.post("/post/:id", Post.Create)
router.put("/post/:id", Post.Update)
router.delete("/post/:id", Post.Delete)



router.get("/like/:id", verifyToken, LikeController.NewLike)
router.get("/likes", LikeController.AllLikes)
router.delete("/like/:id", LikeController.RemoveLike)

export default router  