import { DeleteDevice } from '../../../../domain/use-cases/device/delete-device'
import { noContent, serverError } from '../../../helpers/http/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'

export class DeleteDeviceController implements Controller {
	private readonly deleteDevice: DeleteDevice

	constructor (deleteDevice: DeleteDevice) {
		this.deleteDevice = deleteDevice
	}

	async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const {
				id
			} = httpRequest.params

			await this.deleteDevice.delete(id)

			return noContent()
		} catch (err: any) {
			return serverError(err)
		}
	}
}
