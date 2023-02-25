import { io } from '../../main/config/app'
import { Emitter } from '../../data/protocols/socket/emitter'

export class SocketIoAdapter implements Emitter {
	private readonly eventName: string
	constructor (eventName: string) {
		this.eventName = eventName
	}

	emitEvent (data: any): void {
		io.emit(this.eventName, data)
	}
}
