/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import { Province } from "@/constants/api-interface";
import {
  FormSubmitEventType,
  OnchangeEventType,
} from "@/constants/interface/htmlEvents";
import { useUpdateProvinceMutation } from "@/features/province/province-api";
import useBaseDataEdit from "@/hooks/shared/useBaseDataEdit";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SaveAndBackButtons from "../core/buttons/SaveAndBackButtons";
import Input from "../core/form-elements/Input";
import DataRow from "../core/table/DataRow";

// edit form props type
type Props = {
  toggler: () => void;
};

// edit form input type
type TypeProvinceForm = {
  provinceName: string;
};

// edit form error type
type TypeProvinceErrorForm = {
  provinceName?: string;
};

// initial form input state
const initialState = {
  provinceName: "",
};

/**
 * @description Province edit form component
 */
const ProvinceEditForm = ({ toggler }: Props) => {
  // get selected edit data
  const { data } = useSelector((state: RootState) => state.modal?.editModal);

  // province data
  const modalData = data?.formData as unknown as Province;

  // base data for edit
  const [baseData] = useBaseDataEdit();

  // form state for edit
  const [formState, setFormState] = useState<TypeProvinceForm>(initialState);

  // form input error state
  const [inputError, setInputError] = useState<TypeProvinceErrorForm | null>(
    null
  );

  // get country id from url params
  const { countryId } = useParams<{ countryId: string }>();

  // update province mutation
  const [
    updateProvince,
    { data: provinceData, error, isError, isSuccess, status },
  ] = useUpdateProvinceMutation();

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
      ...modalData,
      ...formState,
      oid: String(modalData?.provinceId),
      countryId: countryId,
    };

    updateProvince({ key: Number(modalData?.provinceId), body: submitData });
  };

  // handle create side Effects
  useCreateSideEffects({
    error,
    isError,
    isSuccess,
    status,
    message: "province",
    messageType: "update",
    response: provinceData,
    initialState,
    isToggle: true,
    setFormState,
    toggler,
  });

  // set form state
  React.useEffect(() => {
    if (modalData) {
      setFormState({
        provinceName: modalData?.provinceName,
      });
    }
  }, [modalData]);

  return (
    <div>
      {/* COUNTRY NAME */}
      <DataRow
        title="Country Name"
        data={data?.countryName}
        className="mb-3"
      />{" "}
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

        {/* SAVE AND BACK BUTTON */}
        <div className="mt-6">
          <SaveAndBackButtons toggler={toggler} />
        </div>
      </form>
    </div>
  );
};

export default ProvinceEditForm;

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
