import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import './db/db'
import userRouter from './routers/userRouter'
import expenseRouter from './routers/expenseRouter'


const app: Express = express()

app.use(express.json())
app.use(cors())
app.use((req: Request, res: Response, next: NextFunction): void => {
    console.log(req.method, req.path)
    next()
})
app.use(userRouter)
app.use(expenseRouter)


export { app }