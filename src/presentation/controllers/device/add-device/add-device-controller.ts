import {
	ok,
	serverError
} from '../../../../presentation/helpers/http/http-helper'

import {
	Controller,
	HttpRequest,
	HttpResponse, Validation
} from '../../../protocols'

export class AddDeviceController implements Controller {
	private readonly validation: Validation
	private readonly addDevice: AddDevice

	constructor (validation: Validation, addDevice: AddDevice) {
		this.validation = validation
		this.addDevice = addDevice
	}

	async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const deviceRequest = httpRequest.body

			const device = await this.addDevice.add(deviceRequest)

			return ok(device)
		} catch (err: any) {
			return serverError(err)
		}
	}
}
