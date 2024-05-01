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
import { useCreateDistrictMutation } from "@/features/district/district-api";
import useBaseDataCreate from "@/hooks/shared/useBaseDataCreate";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { useState } from "react";
import { useParams } from "react-router-dom";
import SaveAndBackButtons from "../core/buttons/SaveAndBackButtons";
import Input from "../core/form-elements/Input";

// props type
type Props = {
  toggler: () => void;
};

// form state types
type TypeDistrictForm = {
  districtName: string;
};

// form error types
type TypeDistrictErrorForm = {
  districtName?: string;
};
// form state
const initialState = {
  districtName: "",
};

/**
 * @description District Create Form component
 */
const DistrictCreateForm = ({ toggler }: Props) => {
  // base data for create
  const [baseData] = useBaseDataCreate();

  // form state
  const [formState, setFormState] = useState<TypeDistrictForm>(initialState);

  // input error state
  const [inputError, setInputError] = useState<TypeDistrictErrorForm | null>(
    null
  );

  // province from url params
  const { provinceId } = useParams<{ provinceId: string }>();

  // country id from url param
  const { countryId } = useParams<{ countryId: string }>();

  // create district mutation
  const [
    createDistrict,
    { data: districtData, error, isError, isSuccess, status },
  ] = useCreateDistrictMutation();

  // form input change handler
  const handleFormChange = (e: OnchangeEventType) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setInputError((prev) => ({ ...prev, [name]: "" }));
  };

  // form submit handler
  const handleSubmit = (e: FormSubmitEventType) => {
    e.preventDefault();

    const { isValid, errors } = districtValidator({
      ...formState,
    });
    if (!isValid) {
      setInputError(errors);
      return;
    }

    const submitData = {
      ...baseData,
      ...formState,
      provinceId,
      countryId,
    };

    createDistrict(submitData);
  };

  // handle create side Effects
  useCreateSideEffects({
    error,
    isError,
    isSuccess,
    status,
    message: "district",
    messageType: "create",
    response: districtData,
    initialState,
    isToggle: true,
    setFormState,
    toggler,
  });

  return (
    <div>
      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          {/* DISTRICT NAME */}
          <Input
            label="District Name"
            required
            name="districtName"
            max={90}
            onChange={handleFormChange}
            value={formState?.districtName}
            errMsg={inputError?.districtName}
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

export default DistrictCreateForm;

// Country Validator
// eslint-disable-next-line react-refresh/only-export-components
export const districtValidator = (formState: TypeDistrictForm) => {
  const errors: TypeDistrictErrorForm = {};

  if (!formState?.districtName) errors.districtName = "Required";

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
