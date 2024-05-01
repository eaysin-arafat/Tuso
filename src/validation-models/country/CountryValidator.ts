import {
  TypeCountryErrorForm,
  TypeCountryForm,
} from "@/constants/form-interface/Country";

export const countryValidators = (formState: TypeCountryForm) => {
  const errors: TypeCountryErrorForm = {};

  if (!formState?.countryName) errors.countryName = "Required";
  if (!formState?.isoCodeAlpha2) {
    errors.isoCodeAlpha2 = "Required";
  } else if (formState.isoCodeAlpha2.length > 5) {
    errors.isoCodeAlpha2 = "Maximum length is 5 characters";
  }
  if (!formState?.countryCode) {
    errors.countryCode = "Required";
  } else if (formState.countryCode.length > 4) {
    errors.countryCode = "Maximum length is 4 characters";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
