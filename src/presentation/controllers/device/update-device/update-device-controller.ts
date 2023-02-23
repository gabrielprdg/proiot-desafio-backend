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

			const deviceCreateRequest = httpRequest.body
			console.log(deviceCreateRequest)
			await this.updateDevice.update(id, deviceCreateRequest)

			return noContent()
		} catch (err: any) {
			return serverError(err)
		}
	}
}
