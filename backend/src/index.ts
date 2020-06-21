import express, { Express, Request, Response } from 'express'

const app: Express = express()

const PORT: number = 5000

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})