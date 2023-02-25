import { DeviceModel } from '../models/device'
import { AddDeviceParams } from '../use-cases/device/add-device'
import { UpdateDeviceParams } from '../use-cases/device/update-device'

export const mockDeviceModel = (): DeviceModel => ({
	name: 'any_name',
	status: 'any_status',
	description: 'any_description',
	temperature: 'any_temperature',
	humidity: 'any_humidity',
	brightness: 500,
	created_at: new Date(),
	id: 'any_id'
})

export const mockDevices = (): DeviceModel[] => {
	return [
		{
			name: 'any_name',
			status: 'any_status',
			description: 'any_description',
			temperature: 'any_temperature',
			humidity: 'any_humidity',
			brightness: 400,
			created_at: new Date(),
			id: 'any_id'
		},
		{
			name: 'another_name',
			status: 'another_status',
			description: 'another_description',
			temperature: 'another_temperature',
			humidity: 'another_humidity',
			brightness: 34,
			created_at: new Date(),
			id: 'another_id'
		}
	]
}

export const mockAddDeviceParams = (): AddDeviceParams => ({
	name: 'any_name',
	status: 'any_status',
	description: 'any_description',
	temperature: 'any_temperature',
	humidity: 'any_humidity',
	brightness: 500
})

export const mockUpdateDeviceParams = (): UpdateDeviceParams => ({
	name: 'any_name_2',
	status: 'any_status_2',
	description: 'any_description_2'
})
