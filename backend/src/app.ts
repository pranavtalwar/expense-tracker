import express from 'express'
import './db/db'

const app: express.Express = express()

app.use(express.json())

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World')
})

export { app }