import { Request, Response } from "express";
import prisma from '../prisma'


async function GetAllComments(request:Request, response:Response) {}

async function GetComment(request:Request, response:Response) {}

async function Create(request:Request, response:Response) {}

async function Update(request:Request, response:Response) {}

async function Delete(request:Request, response:Response) {}

export default { GetAllComments, GetComment, Create, Update, Delete }