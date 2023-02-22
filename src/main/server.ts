import * as dotenv from 'dotenv'
import { Server } from 'socket.io'
import WebSocket from 'ws'
import { mongoHelper } from '../infra/db/mongo/helper/mongo-helper'
dotenv.config()

mongoHelper.connect(`${process.env.MONGO_URL as string}`)
	.then(async () => {
		const app = (await import('./config/app')).default
		app.listen(process.env.PORT, () => {
			console.log(`Server Running at ${process.env.PORT as string}!`)
		})
	}).catch(err => {
		console.log(err)
	})
