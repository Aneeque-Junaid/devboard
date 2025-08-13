
import { Router } from "express"
import { forgotPasswordController, loginWithEmailController, registerWithEmailController, resetPasswordController } from "./auth.controller"

const router = Router()

router.post('/login', loginWithEmailController)
router.post('/register', registerWithEmailController)
// router.post('/oauth/google')
// router.post('/oauth/github')
router.post('/forgot-password', forgotPasswordController)
router.post('/reset-password', resetPasswordController)
// router.post('/me')




export default router;