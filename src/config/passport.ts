import passport from 'passport'
import { Strategy as GithubStrategy } from 'passport-github2'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import prisma from '../services/prisma'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID as string
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET as string

passport.use(
    new GoogleStrategy(
        {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/api/v1/auth/oauth/google',
        scope: ['profile', 'email']
        },
        async (accessToken, refreshToken, profile, done) => {
            const email = profile.emails?.[0]?.value;
            if (!email) {
                throw new Error('Google OAuth did not return an email address.');
            }
            try{

                let user = await prisma.user.findUnique({
                    where: {provider_providerId: {provider: 'google', providerId: profile.id}}
                })
                
                if(!user){
                    user = await prisma.user.create({
                        data: {
                            name: profile.displayName,
                            email,
                            provider: 'google',
                            providerId: profile.id
                        }
                    })
                }
                return done(null, user);
            } catch (err: any){
                return done(err, false);
            }
        }
    )
)

passport.use(
    new GithubStrategy(
        {
            clientID: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/api/v1/auth/oauth/github'
        },
        async (accessToken, refreshToken, profile, done) => {
            try{
                const email = profile.emails![0]?.value || `${profile.username}@github.com`
                let user = await prisma.user.findUnique({
                    where : {provider_providerId: { provider: 'github', providerId: profile.id}}
                })

                if(!user){
                    user = await prisma.user.create({
                        data: {
                            name: profile.displayName,
                            email,
                            provider: 'github',
                            providerId: profile.id
                        }
                    })
                }
                done(null, user)
            } catch (err: any){
                done(err, false)
            }
        }
    )
)

// These functions are not strictly needed for stateless JWT auth, but are good practice for Passport

passport.serializeUser((user: any, done) => {
    done(null, user.id)
})

passport.deserializeUser(async(id: string, done) => {
    try{
        const user = await prisma.user.findUnique({
            where: { id }
        })
        done(null, user)
    }  catch(err: any){
        done(err, null)
    }
})