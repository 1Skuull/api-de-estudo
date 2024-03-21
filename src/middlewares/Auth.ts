import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

export interface CustomRequest extends Request {
  userId?: number;
}

export function verifyToken(request: CustomRequest, response: Response, next: NextFunction) {
  // const authHeader = request.headers.authorization;
  // const token = authHeader && authHeader.split(' ')[1];

  const token = request.cookies.token;

  if (!token) {
    response.clearCookie("token");
    return response.json({ auth: false, msg: 'Token inválido.' });
  }

  jwt.verify(token, process.env.KEY_TOKEN as string, (err: any, decoded: any) => {
    if (err) {
      response.clearCookie("token");
      return response.json({ auth: false, msg: 'Usuário não cadastrado! Token inválido.' });
    }
    
    request.userId = decoded.userId;
    next();
  });
}

