
import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"
import prisma from "../services/prisma"
import config from "../config"
import { Role } from "@prisma/client"

export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: string;
    } | any
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token 

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{

            token = req.headers.authorization.split(" ")[1]

            if(!token) {
                res.status(401).json({message: "Not authorized, no token"})
                return
            }

            const decoded = jwt.verify(token, config.jwtSecret) as {id: string, email: string}

            const user = await prisma.user.findUnique({
                where: {id: decoded.id},
                select: {id: true, email: true, name: true, role: true}
            })

            if(!user){
                res.status(401).json({message: 'Not authorized, user not found'})
                return
            }

            req.user = user;
            next()
        } catch (err: any) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if(!token){
        res.status(401).json({message: "Not authorized, no token"})
    }
}

export const authorize = (roles: Role[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if(!req.user){
            res.status(401).json({message: "Not authorized, no user data"})
            return
        }

        if(roles.includes(req.user.role as Role)){
            next()
            return
        }

        if(req.params.id && req.params.id === req.user.id){
            next()
            return
        }

        res.status(403).json({message: 'Forbidden: You do not have permission to perform this action'})
    }
}