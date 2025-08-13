
import { Router } from "express"
import { loginWithEmailController, registerWithEmailController } from "./auth.controller"

const router = Router()

router.post('/login', loginWithEmailController)
router.post('/register', registerWithEmailController)
// router.post('/oauth/google')
// router.post('/oauth/github')
// router.post('/forgot-password')
// router.post('/reset-password')
// router.post('/me')




export default router;