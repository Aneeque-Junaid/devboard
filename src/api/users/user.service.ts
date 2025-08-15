import prisma from "../../services/prisma";
import { User, Role } from "@prisma/client";

type UpdateUserDto = {
    name?: string,
    email?: string,
    role?: Role,
}

export const getUserByIdService = async(id: string) => {

    const user = await prisma.user.findUnique({
        where: { id },
        select: {id: true, name: true, email: true, role: true, createdAt: true}
    })

    if(!user){
        throw new Error('User not found')
    }

    return user

}

export const updateUserProfileService = async(id: string, data: UpdateUserDto) => {
    const user = await prisma.user.update({
        where: { id },
        data,
        select: {id: true, name: true, email: true, role: true, createdAt: true}
    })

    return user
}

export const deleteUserService = async (id: string) => {
    await prisma.user.delete({
        where: { id }
    })
    return {message: 'User deleted Successfully'}
}