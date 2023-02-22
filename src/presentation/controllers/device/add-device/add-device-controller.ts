import { AddDevice } from '../../../../domain/use-cases/device/add-device'
import {
	badRequest,
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
			const error = this.validation.validate(httpRequest.body)
			if (error) {
				return badRequest(error)
			}

			const {
				name,
				status,
				description,
				temperature,
				humidity,
				brightness
			} = httpRequest.body

			const device = await this.addDevice.add({
				name,
				status,
				description,
				temperature,
				humidity,
				brightness,
				created_at: new Date()
			})

			return ok(device)
		} catch (err: any) {
			return serverError(err)
		}
	}
}
