/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import {
  TypeCountryErrorForm,
  TypeCountryForm,
} from "@/constants/form-interface/Country";
import {
  FormSubmitEventType,
  OnchangeEventType,
} from "@/constants/interface/htmlEvents";
import { useCreateCountryMutation } from "@/features/country/country-api";
import useBaseDataCreate from "@/hooks/shared/useBaseDataCreate";
import useCloseModal from "@/hooks/shared/useCloseModal";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { countryValidators } from "@/validation-models/country/CountryValidator";
import { useState } from "react";

// form state
const initialState = {
  countryName: "",
  isoCodeAlpha2: "",
  countryCode: "",
};

// create country hook
const useCreateCountry = () => {
  // base data for create record
  const [baseData] = useBaseDataCreate();

  // form state
  const [formState, setFormState] = useState<TypeCountryForm>(initialState);

  // input error state
  const [inputError, setInputError] = useState<TypeCountryErrorForm | null>(
    null
  );

  // create country mutation
  const [
    createCountry,
    { data: countryData, status, isError, error, isSuccess },
  ] = useCreateCountryMutation();

  // modal toggler
  const { toggler } = useCloseModal();

  // form input change handler
  const handleFormChange = (e: OnchangeEventType) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setInputError((prev) => ({ ...prev, [name]: "" }));
  };

  // form submit handler
  const handleSubmit = (e: FormSubmitEventType) => {
    e.preventDefault();

    const { isValid, errors } = countryValidators({
      ...formState,
    });

    if (!isValid) {
      setInputError(errors);
      return;
    }

    const submitData = {
      ...baseData,
      ...formState,
    };

    createCountry(submitData);
  };

  // handle side effects
  useCreateSideEffects({
    error,
    isError,
    isSuccess,
    message: "country",
    messageType: "create",
    response: countryData,
    status,
    initialState,
    isToggle: true,
    setFormState,
    toggler,
  });

  return {
    handleSubmit,
    formState,
    handleFormChange,
    inputError,
  };
};

export default useCreateCountry;
