import {
  TypeItExpertErrorForm,
  TypeItExpertForm,
} from "@/constants/form-interface/it-expert";

export const itExpertValidator = (formState: TypeItExpertForm) => {
  const errors: TypeItExpertErrorForm = {};

  if (!formState?.expertId) errors.expertName = "Required";

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
