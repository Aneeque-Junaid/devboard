
import { Router } from "express"
import { forgotPasswordController, getMeController, loginWithEmailController, OAuthController, registerWithEmailController, resetPasswordController } from "./auth.controller"
import { protect } from "../../middleware/auth.middlerware"
import passport from "passport"
import { githubCallbackMiddleware, githubMiddleware, googleCallbackMiddleware, googleMiddleware } from "../../middleware/oauth.middleware"
const router = Router()

router.post('/login', loginWithEmailController)
router.post('/register', registerWithEmailController)
router.get('/oauth/google', googleMiddleware())
router.get('/oauth/google/callback', googleCallbackMiddleware(), OAuthController)
router.get('/oauth/github', githubMiddleware())
router.get('/oauth/github/callback', githubCallbackMiddleware(), OAuthController)
router.post('/forgot-password', forgotPasswordController)
router.post('/reset-password', resetPasswordController)
router.post('/me', protect, getMeController)




export default router;