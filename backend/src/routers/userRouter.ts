import express, { Router, Request, Response, RequestHandler } from 'express'
import User from '../models/User'
import { IUserDocument, IUser, IUserModel } from '../models/UserInterfaces'

const router: Router = express.Router()

router.post('/signup', async (req: Request, res: Response) => {
    const user: IUser = new User(req.body)

    try {
        await user.save()
        const token = await user.generateToken()
        res.status(201).send({ user, token })
    } catch(error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.post('/login', async (req: Request, res: Response) => {
    const { email, password }: { email: string, password: string} = req.body
    try {
        const user: IUserDocument = await User.findByCredentials(email, password)
        const token = await (user as IUser).generateToken()
        res.send({ user, token })
    } catch(error) {
        res.status(400).send()
    } 
})

router.get('/users', async (req: Request, res: Response) => {
    try {
        const users: IUserDocument[] = await User.find({})
        res.status(200).send(users)
    } catch(error) {
        res.status(500).send()
    }
})

router.get('/users/:id', async (req: Request, res:Response) => {
    const { id }: { id: string } = req.params as { id: string }
    try {
        const user: IUserDocument | null = await User.findById(id)
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch(error) {
        res.status(500).send()
    }
    
})

router.patch('/users/:id', async (req: Request, res: Response) => {
    const { id }: { id: string } = req.params as { id: string }
    
    const updates: string[] = Object.keys(req.body)
    const allowedUpdates: string[] = ['firstName', 'lastName', 'password', 'age']
    const isAllowed: boolean = updates.every((update: string) => allowedUpdates.includes(update))

    if(!isAllowed) {
        return res.status(400).send()
    } 

    try {
        const user: IUserDocument | null = await User.findById(id)
        if(!user) {
            return res.status(404).send()
        }
        const updatedUser: IUserDocument | null = await User.findByIdAndUpdate(id, req.body , { runValidators: true, new: true })
        res.send(updatedUser)
    } catch(error) {
        res.status(500).send()
    }
})

router.delete('/users/:id', async (req: Request, res: Response) => {
    const id: string = req.params.id
    const user: IUserDocument | null = await User.findByIdAndDelete(id)

    if(!user) {
        return res.status(404).send()
    }
    res.send(user)
})

export default router
