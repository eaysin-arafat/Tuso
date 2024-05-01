/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import { Districts } from "@/constants/api-interface";
import {
  FormSubmitEventType,
  OnchangeEventType,
} from "@/constants/interface/htmlEvents";
import { useUpdateDistrictMutation } from "@/features/district/district-api";
import useBaseDataEdit from "@/hooks/shared/useBaseDataEdit";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SaveAndBackButtons from "../core/buttons/SaveAndBackButtons";
import Input from "../core/form-elements/Input";
import DataRow from "../core/table/DataRow";

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

// District Edit Form component
const DistrictEditForm = ({ toggler }: Props) => {
  // selected edit data
  const { data } = useSelector((state: RootState) => state.modal?.editModal);

  // modal data
  const modalData = data?.formData as unknown as Districts;

  // base data for edit
  const [baseData] = useBaseDataEdit();

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

  // update district mutation
  const [
    updateDistrict,
    { data: districtData, error, isError, isSuccess, status },
  ] = useUpdateDistrictMutation();

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
      ...modalData,
      ...formState,
      oid: modalData?.id,
      provinceId,
      countryId,
    };

    delete submitData.id;

    updateDistrict({ key: Number(modalData?.id), body: submitData });
  };

  // handle create side Effects
  useCreateSideEffects({
    error,
    isError,
    isSuccess,
    status,
    message: "district",
    messageType: "update",
    response: districtData,
    initialState,
    isToggle: true,
    setFormState,
    toggler,
  });

  // set form data on modal data change
  React.useEffect(() => {
    if (modalData) {
      setFormState({ ...modalData });
    }
  }, [modalData]);

  return (
    <div>
      {/* COUNTRY NAME */}
      <DataRow title="Country Name" data={data?.countryName} />

      {/* PROVINCE NAME */}
      <DataRow
        title="Province Name"
        data={data.provinceName}
        className="mb-3"
      />

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

export default DistrictEditForm;

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
