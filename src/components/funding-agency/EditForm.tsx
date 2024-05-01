/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import { FundingAgency } from "@/constants/api-interface";
import {
  FormSubmitEventType,
  OnchangeEventType,
} from "@/constants/interface/htmlEvents";
import { useUpdateFundingAgencyMutation } from "@/features/funding-agency/funding-agency-api";
import useBaseDataEdit from "@/hooks/shared/useBaseDataEdit";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import SaveAndBackButtons from "../core/buttons/SaveAndBackButtons";
import Input from "../core/form-elements/Input";
import Select from "../core/form-elements/Select";

// edit funding agency prop types
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

// Funding Agency Edit Form Component
const FundingAgencyEditForm = ({ toggler }: Props) => {
  // get edit data from store
  const { data } = useSelector((state: RootState) => state.modal?.editModal);

  // get systems from store
  const { systems } = useSelector((state: RootState) => state?.clientForm);

  // modal data
  const modalData = data as unknown as FundingAgency;

  // base data for edit
  const [baseData] = useBaseDataEdit();

  // form state
  const [formState, setFormState] =
    useState<TypeFundingAgencyForm>(initialState);

  // input error state
  const [inputError, setInputError] =
    useState<TypeFundingAgencyErrorForm | null>(null);

  // update funding agency mutation
  const [
    updateFundingAgency,
    { data: findingAgencyData, error, isError, isSuccess, status },
  ] = useUpdateFundingAgencyMutation();

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
      ...modalData,
      ...formState,
      projectId: Number(formState.projectId),
    };

    updateFundingAgency({ key: Number(modalData?.oid), body: submitData });
  };

  // handle create side Effects
  useCreateSideEffects({
    error,
    isError,
    isSuccess,
    status,
    message: "funding agency",
    messageType: "update",
    response: findingAgencyData,
    initialState,
    isToggle: true,
    setFormState,
    toggler: toggler,
  });

  // handle side effect on modal data change
  React.useEffect(() => {
    if (modalData) {
      setFormState({
        fundingAgencyName: modalData?.fundingAgencyName,
        projectId: String(modalData?.projectId),
      });
    }
  }, [modalData]);

  return (
    // Funding Agency Edit Form
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

export default FundingAgencyEditForm;

// country validator
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
