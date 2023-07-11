import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"

export const secretKey = 'AS2F5A5DDS542FG556ASDE78AF5F1V6ASDG5SCV1ESF8FDSFE589DF4SD6F4DS8F4SD656F46';

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

  verify(token, process.env.KEY_TOKEN as string, (err: any, decoded: any) => {
    if (err) {
      response.clearCookie("token");
      return response.json({ auth: false, msg: 'Usuário não cadastrado! Token inválido.' });
    }
    
    request.userId = decoded.id;
    next();

  });
}

