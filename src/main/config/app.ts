import express, { json } from 'express'
import setupRoutes from './routes'
import { Server } from 'socket.io'
import http from 'http'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require('cors')
const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(cors())
app.use(json())

io.on('connection', (socket) => {
	console.log('Um cliente conectou')

	// Define um handler de eventos para o evento 'disconnect'
	socket.on('disconnect', () => {
		console.log('Um cliente desconectou')
	})
})

setupRoutes(app)

export { server, io }
