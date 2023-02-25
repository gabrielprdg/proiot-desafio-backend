import { io } from '../../../../main/config/app'
import { UpdateDevice } from '../../../../domain/use-cases/device/update-device'
import { noContent, serverError } from '../../../helpers/http/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'

export class UpdateDeviceController implements Controller {
	private readonly updateDevice: UpdateDevice

	constructor (updateDevice: UpdateDevice) {
		this.updateDevice = updateDevice
	}

	async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const {
				id
			} = httpRequest.params

			const deviceUpdateRequest = httpRequest.body
			await this.updateDevice.update(id, deviceUpdateRequest)

			io.emit('some-event', { id, deviceUpdateRequest })
			return noContent()
		} catch (err: any) {
			return serverError(err)
		}
	}
}
