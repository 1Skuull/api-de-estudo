import { Response, Router } from "express";
import { CustomRequest, verifyToken }   from "../middlewares/Auth"

import Auth from "../controllers/AuthController";
import User from "../controllers/UserController"
import Post from "../controllers/PostController"
import Bio from "../controllers/BioController"
import LikeController from "../controllers/LikeController";
import Comment from "../controllers/CommentController";

const router = Router()

//Auth

router.get("/verify", verifyToken, async (request: CustomRequest, response:Response) => {
    try {
        return response.status(200).json({ 
            auth: true, 
            msg : `Bem vindos`, 
            user: request.userId 
        })
    } catch (error) {
        console.log(error)
    }
})

// Authetication

router.post("/login", Auth.login)
router.post("/register", Auth.register)
router.get("/logout", verifyToken, Auth.logout);

//Users

router.get("/user", verifyToken, User.Get)
router.get("/users", User.GetAll)
router.put("/user/:id", User.Update)
router.delete("/user/:id", User.Delete)

//Bio

router.get("/bio/:id", Bio.Get)
router.get("/bio", Bio.GetAll)
router.post("/bio/:id", Bio.Create)
router.put("/bio/:id", Bio.Update)
router.delete("/bio/:id", Bio.Delete)

//Posts

router.get("/post/:id", Post.Get)
router.get("/posts", Post.GetAll)
router.post("/post/:id", Post.Create)
router.put("/post/:id", Post.Update)
router.delete("/post/:id", Post.Delete)

//Comments 

router.get("/comment/:id", Comment.Get)
router.get("/comment", Comment.GetAll)
router.post("/come/:id", Comment.Create)

//Like

router.get("/like/:id", verifyToken, LikeController.LikePost)
router.get("/likes/:id", LikeController.AllLikes)
router.delete("/like/:id", LikeController.RemoveLike)

export default router  