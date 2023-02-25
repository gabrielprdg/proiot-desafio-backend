import * as dotenv from 'dotenv'
import { mongoHelper } from '../infra/db/mongo/helper/mongo-helper'
import { server } from './config/app'
dotenv.config()

mongoHelper.connect(`${process.env.MONGO_URL}`)
	.then(async () => {
		server.listen(process.env.PORT, () => {
			console.log(`Server Running at ${process.env.PORT}!`)
		})
	}).catch(err => {
		console.log(err)
	})
