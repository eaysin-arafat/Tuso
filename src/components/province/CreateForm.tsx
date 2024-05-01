/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import {
  FormSubmitEventType,
  OnchangeEventType,
} from "@/constants/interface/htmlEvents";
import { useCreateProvinceMutation } from "@/features/province/province-api";
import useBaseDataCreate from "@/hooks/shared/useBaseDataCreate";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { useState } from "react";
import { useParams } from "react-router-dom";
import SaveAndBackButtons from "../core/buttons/SaveAndBackButtons";
import Input from "../core/form-elements/Input";

// form props type
type Props = {
  toggler: () => void;
};

// province form input type
type TypeProvinceForm = {
  provinceName: string;
};

// province form error type
type TypeProvinceErrorForm = {
  provinceName?: string;
};

// initial form state
const initialState = {
  provinceName: "",
};

/**
 * @description Province create form component
 */
const ProvinceCreateForm = ({ toggler }: Props) => {
  const [baseData] = useBaseDataCreate();

  // form input state
  const [formState, setFormState] = useState<TypeProvinceForm>(initialState);

  // form input error state
  const [inputError, setInputError] = useState<TypeProvinceErrorForm | null>(
    null
  );

  // get country id from url params
  const { countryId } = useParams<{ countryId: string }>();

  // create province mutation
  const [
    createProvince,
    { data: provinceData, status, isError, error, isSuccess },
  ] = useCreateProvinceMutation();

  // form input change handler
  const handleFormChange = (e: OnchangeEventType) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setInputError((prev) => ({ ...prev, [name]: "" }));
  };

  // form submit handler
  const handleSubmit = (e: FormSubmitEventType) => {
    e.preventDefault();

    const { isValid, errors } = provinceValidator({
      ...formState,
    });
    if (!isValid) {
      setInputError(errors);
      return;
    }

    const submitData = {
      ...baseData,
      ...formState,
      countryId: countryId,
    };

    createProvince(submitData);
  };

  // handle province create side effects
  useCreateSideEffects({
    error,
    isError,
    isSuccess,
    status,
    message: "province",
    messageType: "create",
    response: provinceData,
    initialState,
    isToggle: true,
    toggler,
    setFormState,
  });

  return (
    <div>
      {/* FORM */}
      <form onSubmit={handleSubmit}>
        {/* PROVINCE NAME */}
        <div className="grid gap-4">
          <Input
            label="Province Name"
            required
            name="provinceName"
            value={formState?.provinceName}
            errMsg={inputError?.provinceName}
            onChange={handleFormChange}
          />
        </div>

        {/* SAVE AND BACK BUTTONS */}
        <div className="mt-6">
          <SaveAndBackButtons toggler={toggler} />
        </div>
      </form>
    </div>
  );
};

export default ProvinceCreateForm;

// province form validator
// eslint-disable-next-line react-refresh/only-export-components
export const provinceValidator = (formState: TypeProvinceForm) => {
  const errors: TypeProvinceErrorForm = {};

  if (!formState?.provinceName) errors.provinceName = "Required";

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
