import { Request, Response } from "express";
import prisma from '../prisma'
import { CustomRequest } from "../middlewares/Auth";


async function GetAllComments(request:Request, response:Response) {}

async function GetComments(request:CustomRequest, response:Response) {}

async function Create(request:Request, response:Response) {}

async function Update(request:Request, response:Response) {}

async function Delete(request:Request, response:Response) {}

export default { GetAllComments, GetComments, Create, Update, Delete }