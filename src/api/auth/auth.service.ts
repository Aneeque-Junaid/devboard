import prisma from "../../services/prisma"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import config from "../../config"
import crypto from "crypto"


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

export const forgotPasswordService = async(email: string) => {
    const user = prisma.user.findUnique({where : {email}})
    if(!user) return

    const resetToken = crypto.randomBytes(32).toString('hex')

    const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    const passwordResetTokenExpires = new Date(Date.now() + 10 * 60 * 1000)

    await prisma.user.update({
        where: {email},
        data: {
            passwordResetToken,
            passwordResetTokenExpires
        }
    })

    console.log('--- Password Reset Email ---');
    console.log(`To: ${email}`);
    console.log('Click this link to reset your password:');
    console.log(`http://localhost:3000/reset-password?token=${resetToken}` );
    console.log('--------------------------');

    return { resetToken }
}

export const resetPasswordService = async(token: string, newPassword: string) => {

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

    const user = await prisma.user.findFirst({
        where: {
            passwordResetToken: hashedToken,
            passwordResetTokenExpires: {
                gte: new Date()
            }
        }
    })

    if(!user){
        throw new Error('Token is invalid or expired')
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await prisma.user.update({
        where: {id: user.id},
        data: {
            password: hashedPassword,
            passwordResetToken: null,
            passwordResetTokenExpires: null
        }
    })

    return {success: true}

}

export const getMeService = async(userId: string) => {
    const currentUser = await prisma.user.findUnique({
        where: {id: userId},
        select: {id: true, email: true, name: true, role: true}
    })

    if(!currentUser) {
        throw new Error('User not found')
    }
    
    return currentUser

}