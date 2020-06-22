import express, { Express, Request, Response } from 'express'
import User, { IUser } from './models/User'
import Expense from './models/Expense'
import './db/db'
import { DocumentQuery } from 'mongoose'
import { timeStamp } from 'console'


const app: Express = express()

app.use(express.json())

app.post('/users', async (req: Request, res: Response) => {
    const user: any = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch(error) {
        res.status(500).send(error)
    }
})

app.get('/users', async (req: Request, res: Response) => {
    const users: Object[] = await User.find({})
    try {
        res.status(200).send(users)
    } catch(error) {
        res.status(500).send()
    }
})

app.get('/users/:id', async (req: Request, res:Response) => {
    const id: string = req.params.id
    const user: any = await User.findById(id)
    if(!user) {
        return res.status(404).send()
    }
    res.send(user)
})

app.patch('/users/:id', async (req: Request, res: Response) => {
    const id: string = req.params.id
    const user: any = await User.findById(id)
    const updates: string[] = Object.keys(req.body)
    const allowedUpdates: string[] = ['firstName', 'lastName', 'password', 'age']
    const isAllowed: boolean = updates.every((update: string) => allowedUpdates.includes(update))

    if(!user) {
        return res.status(404).send()
    } else if (!isAllowed) {
        return res.status(400).send({ error: 'Invalid updates'})
    }

    const updatedUser: any = await User.findByIdAndUpdate(id, req.body , { runValidators: true, new: true })
    res.send(updatedUser)

})

app.delete('/users/:id', async (req: Request, res: Response) => {
    const id: string = req.params.id
    const user: any = await User.findByIdAndDelete(id)

    if(!user) {
        return res.status(404).send()
    }
    res.send(user)

})

export { app }