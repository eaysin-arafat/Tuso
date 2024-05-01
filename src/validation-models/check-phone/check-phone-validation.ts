type PhoneValidationType = {
  phone: string;
  phoneKey: string;
  code: string;
  codeKey: string;
  errors: object;
  required: boolean;
};

/**
 * @useCase Form validation for cellphone and country code
 * @param phone Phone number value,
 * @param phoneKey Phone number phoneKey name
 * @param code  Country code
 * @param codeKey Country code phoneKey name
 * @param errors Errors object
 * @param required  If field is Required
 * @returns
 */
export const checkPhoneNumber = ({
  phone,
  phoneKey,
  code,
  codeKey,
  errors,
  required,
}: PhoneValidationType) => {
  if (required) {
    if (!phone) errors[phoneKey] = "Required";
    if (!code) errors[codeKey] = "Required";
    if (!code || !phone) return;
  }

  // "Zambian Valid cellphone number start with a '0' and should not exceed 10 digits in length or not exceed 9 digits";
  if (phone && code == "+260") {
    if (!/^0?\d{9}$/.test(phone)) {
      errors[phoneKey] = "Please write a valid cellphone number";
    }
  }

  if (phone && code != "+260") {
    if (!/^\d{9,11}$/.test(phone)) {
      errors[phoneKey] = "Please write a valid cellphone number";
    }
  }
};
