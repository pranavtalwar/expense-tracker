import express, { Express, Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import './db/db'
import userRouter from './routers/userRouter'
import expenseRouter from './routers/expenseRouter'


const app: Express = express()

app.use(express.json())
app.use(cors())

// own logger
// app.use((req: Request, res: Response, next: NextFunction): void => {
//     console.log(req.method, req.path, req.body)
//     next()
// })

app.use(morgan('tiny'))
app.use(userRouter)
app.use(expenseRouter)
app.get('/hello', (req, res) => {
    res.send('hello')
})


export { app }