import express, { Router, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import sharp, { Sharp } from 'sharp'
import multer from 'multer'
import User from '../models/User'
import { IUserDocument, IUser, IUserModel } from '../models/UserInterfaces'
import auth from '../auth/auth'
import {
    accountActivationEmail,
    welcomeEmail,
    passwordLostEmail,
    passwordChangedEmail
} from '../utils/sendEmail'
import { HookNextFunction } from 'mongoose'

const router: Router = express.Router()

// route for signing up a new user
router.post('/signup', async (req: Request, res: Response) => {
    const { email } : { email: string } = req.body
    try {

        const checkUser: IUserDocument | null = await User.findOne({ email })
        if(checkUser) {
            throw new Error('User exists')
        }
        const tokenBody: Object = req.body
        const token: string =  jwt.sign(tokenBody, process.env.JWT_SECRET as string, { expiresIn: '20m' })
        accountActivationEmail(email, token)
        res.status(200).send()
    } catch(error) {
        if(error.message === 'User exists') {
            return res.status(403).send()
        }
        res.status(500).send(error)
    }
})

router.post('/activation/:token', async (req: Request, res: Response) => {
    const { token }: { token : string } = req.params as { token : string }
    try {
        if(token) {
            const decodedUser: IUserDocument = jwt.verify(token, process.env.JWT_SECRET as string) as IUserDocument
            const user: IUser | null = await User.findOne({ email: decodedUser.email })
            if(user) {
                return res.status(403).send()
            }
            await new User(decodedUser).save()
            welcomeEmail(decodedUser.email, decodedUser.firstName)
            return res.status(201).send()
        }
    } catch(error) {
        console.log(error)
        return res.status(400).send(error)
    }
    
})

// route for logging in 
router.post('/login', async (req: Request, res: Response) => {
    const { email, password }: { email: string, password: string } = req.body
    try {
        const user: IUserDocument = await User.findByCredentials(email, password)
        const token = await (user as IUser).generateToken()
        res.send({ user, token })
    } catch(error) {
        res.status(400).send()
    } 
})

router.post('/logout', auth, async(req: Request, res: Response) => {
    const user: IUserDocument = res.locals.user
    const userToken: string = res.locals.token

    try {
        user.tokens = user.tokens.filter((token: { token: string}) => token.token !== userToken)
        await user.save()
        res.send()
    } catch(error) {
        res.status(500).send()
    }
})

router.post('/logoutAll', auth, async(req: Request, res: Response) => {
    const user: IUserDocument = res.locals.user

    try {
        user.tokens = []
        await user.save()
        res.send()
    } catch(error) {
        res.status(500).send()
    }
})

router.post('/forgot-password', async (req: Request, res:Response) => {
    const { email }: { email: string } = req.body
    try {
        const user: IUser | null = await User.findOne({ email })
        if(user) {
            const token: string =  jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '20m' })
            passwordLostEmail(email, token)
            return res.status(200).send()
        }
        return res.status(200).send()
    } catch(error) {
        res.status(500).send()
    }
})

router.post('/change-password/:token', async (req: Request, res: Response) => {
    const { token }: { token : string } = req.params as { token : string }
    const { password } = req.body
    try {
        if(token) {
            const { _id }: { _id: string } = jwt.verify(token, process.env.JWT_SECRET as string) as { _id: string}
            const user: IUser | null = await User.findById(_id)
            if(!user) {
                return res.status(403).send()
            }
            const hashedPassword: string = await bcrypt.hash(password, 8)
            await User.findByIdAndUpdate(_id, { password: hashedPassword })
            passwordChangedEmail(user.email)
            res.status(200).send()
        }
    }  catch(error) {
        res.status(500).send()
    }
})

// route to get user data
router.get('/users/me', auth, async (req: Request, res:Response) => {
    const user: IUserDocument = res.locals.user
    res.send(user)
})

router.patch('/users/me', auth, async (req: Request, res: Response) => {
    const updates: string[] = Object.keys(req.body)
    const allowedUpdates: string[] = ['firstName', 'lastName', 'age']
    const isAllowed: boolean = updates.every((update: string) => allowedUpdates.includes(update))

    if(!isAllowed) {
        return res.status(400).send({ error: 'Invalid updates' })
    } 

    const email: string = res.locals.user.email
    try {
        const updatedUser = await User.findOneAndUpdate({ email }, req.body, { runValidators: true, new:true })
        res.send(updatedUser)
    } catch(error) {
        console.log(error)
        res.status(500).send()
    }
})

router.delete('/users/me', auth, async (req: Request, res: Response) => {
    const user: IUserDocument = res.locals.user
    try {
        await user.remove()
        res.send(user)
    } catch(error) {
        console.log(error)
        res.status(500).send()
    }
})

const upload = multer({
    limits: {
        fileSize: 10000000
    },
    fileFilter(req: Request, file: Express.Multer.File, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('Please upload an image with a jpg, jpeg or a png extension.'))
        }
        cb(null, true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req: Request, res: Response) => {
    console.log('here')
    const buffer: Buffer = await sharp(req.file.buffer)
        .resize({ width: 250 , height: 250 })
        .png()
        .toBuffer()
    res.locals.user.avatar = buffer
    await res.locals.user.save()
    res.send()
}, (err: Error, req: Request, res: Response, next: HookNextFunction) => {
    res.status(400).send({ error: err.message })
})

router.delete('/users/me/avatar', auth, async (req: Request, res: Response) => {
    res.locals.user.avatar = undefined
    await res.locals.user.save()
    res.send()
})


router.get('/users/me/avatar', auth, async (req, res) => {
    try {
        const avatar: Buffer = res.locals.user.avatar
        console.log(typeof avatar)
        if(!avatar) {
            throw new Error()
        }

        res.send(avatar.toString('base64'))
    } catch(e) {
        res.status(404).send()
    }
})

export default router
