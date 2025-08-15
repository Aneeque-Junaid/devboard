import { Response, Request } from "express";
import { AuthRequest } from "../../middleware/auth.middlerware";
import {
    getUserByIdService,
    updateUserProfileService,
    deleteUserService
} from './user.service'

export const getUserByIdController = async(req: AuthRequest, res: Response) => {
    try{
        if(!req.params.id) return res.status(400).json({message: "Invalid Request"})
        const user = await getUserByIdService(req.params.id)
    res.status(200).json(user)
    } catch(err: any){
        res.status(404).json({message: err.message})
    }
}


export const updateUserProfileController = async(req: AuthRequest, res: Response) => {
    try{
        const { name } = req.body
        if(!name) return res.status(400).json({message: 'Name is required fro update'})
        if(!req.params.id) return res.status(400).json({message: "Invalid Request"})

        const updatedUser = await updateUserProfileService(req.params.id, {name})
        res.status(200).json(updatedUser)
    } catch(err: any) {
        res.status(404).json({message: err.message})
    }
}


export const deleteUserController = async (req: AuthRequest, res: Response) => {
    try{
        if(!req.params.id) return res.status(400).json({message: "Invalid Request"})
        await deleteUserService(req.params.id)
        res.status(204).send()
    } catch(err: any){
        res.status(404).json({message: err.message})
    }
}