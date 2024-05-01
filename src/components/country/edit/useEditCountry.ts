/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import { Country } from "@/constants/api-interface";
import {
  TypeCountryErrorForm,
  TypeCountryForm,
} from "@/constants/form-interface/Country";
import {
  FormSubmitEventType,
  OnchangeEventType,
} from "@/constants/interface/htmlEvents";
import { useUpdateCountryMutation } from "@/features/country/country-api";
import useBaseDataEdit from "@/hooks/shared/useBaseDataEdit";
import useCloseModal from "@/hooks/shared/useCloseModal";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { countryValidators } from "@/validation-models/country/CountryValidator";
import React, { useState } from "react";
import { useSelector } from "react-redux";

// form initial state
const initialState = {
  countryName: "",
  isoCodeAlpha2: "",
  countryCode: "",
};

// edit country hook
const useEditCountry = () => {
  // selected edit data from redux store
  const { data } = useSelector((state: RootState) => state.modal?.editModal);

  // modal data
  const modalData = data as unknown as Country;

  // base data for edit record
  const [baseData] = useBaseDataEdit();

  // modal toggler
  const { toggler } = useCloseModal();

  // form state
  const [formState, setFormState] = useState<TypeCountryForm>(initialState);

  // input error state
  const [inputError, setInputError] = useState<TypeCountryErrorForm | null>(
    null
  );

  // update country mutation
  const [
    updateCountry,
    { data: countryDataRes, status, isError, error, isSuccess },
  ] = useUpdateCountryMutation();

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
      ...modalData,
      ...formState,
    };

    updateCountry({ key: modalData?.oid, body: submitData });
  };

  // handle side effects
  useCreateSideEffects({
    error,
    isError,
    isSuccess,
    message: "country",
    messageType: "update",
    response: countryDataRes,
    status,
    initialState,
    isToggle: true,
    setFormState,
    toggler,
  });

  // set form state from modal data
  React.useEffect(() => {
    if (modalData) {
      setFormState({
        countryName: modalData?.countryName,
        isoCodeAlpha2: modalData?.isoCodeAlpha2,
        countryCode: modalData?.countryCode,
      });
    }
  }, [modalData]);

  return {
    handleSubmit,
    formState,
    handleFormChange,
    inputError,
  };
};

export default useEditCountry;
