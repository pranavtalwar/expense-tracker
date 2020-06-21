import express from 'express'
import User, { IUser } from './models/User'
import './db/db'


const app: express.Express = express()

app.use(express.json())

app.post('/users', async (req: express.Request, res: express.Response) => {
    const user: IUser = new User(req.body)

    try {
        await user.save()
        res.status(201).send()
    } catch(error) {
        res.status(500).send()
    }
})

app.get('/users', (req: express.Request, res: express.Response) => {
    
})

export { app }