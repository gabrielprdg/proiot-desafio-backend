import { RequiredFieldsValidation } from '../../../../../validation/validators/required-fields-validation'
import { ValidationComposite } from '../../../../../validation/validators/validation-composite'
import { Validation } from '../../../../../presentation/protocols'

export const makeAddDeviceValidation = (): ValidationComposite => {
	// removing category and description because both fields are optional
	const validations: Validation[] = []
	for (const field of ['name', 'description', 'status', 'temperature', 'humidity', 'humidity', 'brightness']) {
		validations.push(new RequiredFieldsValidation(field))
	}
	return new ValidationComposite(validations)
}
