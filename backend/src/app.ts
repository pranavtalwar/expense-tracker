import express, { Express, Request, Response } from 'express'
import './db/db'
import userRouter from './routers/userRouter'

const app: Express = express()

app.use(express.json())
app.use(userRouter)

export { app }