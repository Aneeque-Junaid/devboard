import { Request, Response } from "express"
import { registerService,loginService, forgotPasswordService, resetPasswordService, getMeService, OAuthService } from "./auth.service"
import { AuthRequest } from "../../middleware/auth.middlerware"

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

const forgotPasswordController = async(req: Request, res: Response) => {
    try{
        const { email } = req.body
        if(!email){
            return res.status(400).json({message: "Email is required"})
        }

        await forgotPasswordService(email);

        res.status(200).json({message: "if an account with that email exists, a password reset link has been sent."})

    } catch(err: any){
        res.status(500).json({message: err.message})
    }
}

const resetPasswordController = async(req: Request, res: Response) => {
    try {
        const {token, password} = req.body

        if(!token || !password) return res.status(400).json({message: "Token and new password are required"})
        
        await resetPasswordService(token, password);

        res.status(200).json({message: "Password has been reset successfully"})

    } catch (err: any){
        res.status(500). json({message: err.message})
    }
}

const getMeController = async(req: AuthRequest, res: Response) => {
    try{

        if(!req.user){
            return res.status(401).json({message: "Not authorized"})
        }

        const user = await getMeService(req.user.id)
        res.status(200).json(user)
    } catch(err: any){
        res.status(500).json({message: err.message})
    }
}

const OAuthController = (req: Request, res: Response) => {
    const token = OAuthService(req.user)
    res.json({token, user: req.user})
}


export { loginWithEmailController, registerWithEmailController, forgotPasswordController, resetPasswordController, getMeController, OAuthController }