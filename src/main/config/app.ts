import express, { json } from 'express'
import setupRoutes from './routes'
import { Server } from 'socket.io'
import http from 'http'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require('cors')
const app = express()
const server = http.createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
	console.log(`Socket ${socket.id} connected`)

	// enviar mensagem para o cliente conectado
	socket.emit('message', 'Hello from server!')
})

app.use(cors())
app.use(json())

setupRoutes(app)

export default app
