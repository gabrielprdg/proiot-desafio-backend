import { Emitter } from '../../data/protocols/socket/emitter'

export const mockEmitter = (): Emitter => {
	class EmitterStub implements Emitter {
		emitEvent (data: any): void {
			return null
		}
	}

	return new EmitterStub()
}
