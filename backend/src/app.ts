import express, { Express, Request, Response } from 'express'
import './db/db'
import userRouter from './routers/userRouter'
import expenseRouter from './routers/expenseRouter'


const app: Express = express()

app.use(express.json())
app.use((req, res, next) => {
    console.log(req.method, req.path)
    next()
})
app.use(userRouter)
app.use(expenseRouter)


export { app }