/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import {
  FormSubmitEventType,
  OnchangeEventType,
} from "@/constants/interface/htmlEvents";
import { useCreateFundingAgencyMutation } from "@/features/funding-agency/funding-agency-api";
import useBaseDataCreate from "@/hooks/shared/useBaseDataCreate";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { useState } from "react";
import { useSelector } from "react-redux";
import SaveAndBackButtons from "../core/buttons/SaveAndBackButtons";
import Input from "../core/form-elements/Input";
import Select from "../core/form-elements/Select";

// create funding agency prop types
type Props = {
  toggler: () => void;
};

// Funding Agency form types
type TypeFundingAgencyForm = {
  fundingAgencyName: string;
  projectId: string;
};

// Funding Agency error form types
type TypeFundingAgencyErrorForm = {
  fundingAgencyName?: string;
  projectId?: string;
};

// form state
const initialState = {
  fundingAgencyName: "",
  projectId: "",
};

// Funding Agency Create Form Component
const FundingAgencyCreateForm = ({ toggler }: Props) => {
  // form input state
  const [formState, setFormState] =
    useState<TypeFundingAgencyForm>(initialState);

  // input error state
  const [inputError, setInputError] =
    useState<TypeFundingAgencyErrorForm | null>(null);

  // base data for create
  const [baseData] = useBaseDataCreate();

  // get systems from store
  const { systems } = useSelector((state: RootState) => state?.clientForm);

  // create funding agency mutation
  const [
    createFundingAgency,
    { data: findingAgencyData, error, isError, isSuccess, status },
  ] = useCreateFundingAgencyMutation();

  // form input change handler
  const handleFormChange = (e: OnchangeEventType) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setInputError((prev) => ({ ...prev, [name]: "" }));
  };

  // form submit handler
  const handleSubmit = (e: FormSubmitEventType) => {
    e.preventDefault();

    const { isValid, errors } = fundingAgencyValidator({
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

    createFundingAgency(submitData);
  };

  // handle create side Effects
  useCreateSideEffects({
    error,
    isError,
    isSuccess,
    status,
    message: "funding agency",
    messageType: "create",
    response: findingAgencyData,
    initialState,
    isToggle: true,
    setFormState,
    toggler: toggler,
  });

  return (
    // FORM
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4">
        {/* FUNDING AGENCY NAME */}
        <Input
          label="Funding Agency"
          name="fundingAgencyName"
          value={formState?.fundingAgencyName}
          errMsg={inputError?.fundingAgencyName}
          onChange={handleFormChange}
        />

        {/* SYSTEM */}
        <Select
          label="System"
          name="projectId"
          value={formState?.projectId}
          errMsg={inputError?.projectId}
          onChange={handleFormChange}
        >
          {systems?.map((option) => (
            <option key={option?.oid} value={option?.oid}>
              {option?.title}
            </option>
          ))}
        </Select>
      </div>

      {/* SAVE AND BACK BUTTONS */}
      <div className="mt-6">
        <SaveAndBackButtons toggler={toggler} />
      </div>
    </form>
  );
};

export default FundingAgencyCreateForm;

// Funding Agency Validator
// eslint-disable-next-line react-refresh/only-export-components
export const fundingAgencyValidator = (formState: TypeFundingAgencyForm) => {
  const errors: TypeFundingAgencyErrorForm = {};

  if (!formState?.fundingAgencyName) errors.fundingAgencyName = "Required";
  if (!formState?.projectId) errors.projectId = "Required";

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
