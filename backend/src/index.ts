import { app } from './app'
import http from 'http'

const PORT: number = 5000
const server = http.createServer(app)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})