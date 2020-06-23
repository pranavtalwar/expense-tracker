import express, { Router, Request, Response } from 'express'
import User, { IUser } from '../models/User'

const router: Router = express.Router()

router.post('/users', async (req: Request, res: Response) => {
    const user: IUser = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch(error) {
        res.status(500).send(error)
    }
})

router.get('/users', async (req: Request, res: Response) => {
    try {
        const users: IUser[] = await User.find({})
        res.status(200).send(users)
    } catch(error) {
        res.status(500).send()
    }
})

router.get('/users/:id', async (req: Request, res:Response) => {
    const { id }: { id: string } = req.params as { id: string }
    try {
        const user: IUser | null = await User.findById(id)
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
        const user: IUser | null = await User.findById(id)
        if(!user) {
            return res.status(404).send()
        }
        const updatedUser: IUser | null = await User.findByIdAndUpdate(id, req.body , { runValidators: true, new: true })
        res.send(updatedUser)
    } catch(error) {
        res.status(500).send()
    }
})

router.delete('/users/:id', async (req: Request, res: Response) => {
    const id: string = req.params.id
    const user: any = await User.findByIdAndDelete(id)

    if(!user) {
        return res.status(404).send()
    }
    res.send(user)
})

export default router
