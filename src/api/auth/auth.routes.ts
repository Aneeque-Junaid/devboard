
import { Router } from "express"
import { forgotPasswordController, getMeController, loginWithEmailController, registerWithEmailController, resetPasswordController } from "./auth.controller"
import { protect } from "../../middleware/auth.middlerware"
const router = Router()

router.post('/login', loginWithEmailController)
router.post('/register', registerWithEmailController)
// router.post('/oauth/google')
// router.post('/oauth/github')
router.post('/forgot-password', forgotPasswordController)
router.post('/reset-password', resetPasswordController)
router.post('/me', protect, getMeController)




export default router;