import { Request, Response } from "express"
import { registerService,loginService } from "./auth.service"

const loginWithEmailController = async(req: Request, res: Response) => {
    
    try{
        const {email, password} = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const {user, token} = await loginService(email, password)
        res.status(201).json({ message: "Login Successful", token})
    } catch(err: any){
        // console.error(err)
        res.status(500).json({message: err.message})
    }

}

const registerWithEmailController = async(req: Request, res: Response) => {

    try{
        const {name, email, password} = req.body
        const user = await registerService(name, email, password)
        res.status(201).json({message: "User successfully created", user})
    } catch(err: any){
        // console.error(err)
        res.status(500).json({message: err.message})
    }
}


export { loginWithEmailController, registerWithEmailController }