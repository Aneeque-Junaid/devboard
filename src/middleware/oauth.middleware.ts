import passport from "passport"

export const googleMiddleware = () => passport.authenticate('google', {session: false, scope: ['profile', 'email']})


export const googleCallbackMiddleware = () => passport.authenticate('google', {session: false, failureRedirect: '/login'})


export const githubMiddleware = () => passport.authenticate('github', {session: false, scope: ['user:email']})


export const githubCallbackMiddleware = () => passport.authenticate('github', {session: false, failureRedirect: '/login'})
