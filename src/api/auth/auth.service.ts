import prisma from "../../services/prisma"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import config from "../../config"


export const registerService = async(name: string, email: string, password: string) => {

    if(!name || !email || !password) throw new Error("All fields are required")

    const existingUser = await prisma.user.findUnique({ where: { email }})

    if(existingUser) throw new Error("User already Exists")

    const hashedPassword = await bcrypt.hash(password, 10)
    
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })
    return user
}

export const loginService = async(email: string, password: string) => {
    const user = await prisma.user.findUnique({where: { email }})
        if(!user) throw new Error("Invalid Credentials")
        if (!user.password) {
            throw new Error("This account does not have a password set");
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) throw new Error("Invalid Credentials")
        const token = jwt.sign(
            {id: user.id, email: user.email},
            config.jwtSecret,
            {expiresIn: '1d'})

        return {token, user}
}