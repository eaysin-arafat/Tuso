/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import { DeviceType } from "@/constants/api-interface";
import {
  FormSubmitEventType,
  OnchangeEventType,
} from "@/constants/interface/htmlEvents";
import { useUpdateDeviceTypeMutation } from "@/features/device-type/device-type-api";
import useBaseDataEdit from "@/hooks/shared/useBaseDataEdit";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import SaveAndBackButtons from "../core/buttons/SaveAndBackButtons";
import Input from "../core/form-elements/Input";

// props type
type Props = {
  toggler: () => void;
};

// form state types
type TypeDeviceTypeForm = {
  deviceTypeName: string;
};

// form error types
type TypeDeviceTypeErrorForm = {
  deviceTypeName?: string;
};

// form state
const initialState = {
  deviceTypeName: "",
};

// Device Type Edit Form
const DeviceTypeEditForm = ({ toggler }: Props) => {
  // edit modal data
  const { data } = useSelector((state: RootState) => state.modal?.editModal);

  // modal data
  const modalData = data as unknown as DeviceType;

  // base data for edit
  const [baseData] = useBaseDataEdit();

  // form state
  const [formState, setFormState] = useState<TypeDeviceTypeForm>(initialState);

  // input error state
  const [inputError, setInputError] = useState<TypeDeviceTypeErrorForm | null>(
    null
  );

  // update device type mutation
  const [
    updateDeviceType,
    { data: deviceData, status, isError, error, isSuccess },
  ] = useUpdateDeviceTypeMutation();

  // form input change handler
  const handleFormChange = (e: OnchangeEventType) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setInputError((prev) => ({ ...prev, [name]: "" }));
  };

  // form submit handler
  const handleSubmit = (e: FormSubmitEventType) => {
    e.preventDefault();

    const { isValid, errors } = deviceTypeValidator({
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

    updateDeviceType({ key: Number(modalData?.oid), body: submitData });
  };

  // side effect after update
  useCreateSideEffects({
    error,
    isError,
    isSuccess,
    status,
    message: "device type",
    messageType: "update",
    response: deviceData,
    initialState,
    isToggle: true,
    setFormState,
    toggler,
  });

  // set form state on modal data change
  React.useEffect(() => {
    if (modalData) {
      setFormState({
        deviceTypeName: modalData?.deviceTypeName,
      });
    }
  }, [modalData]);

  return (
    // FORM
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4">
        {/* DEVICE TYPE NAME */}
        <Input
          label="Device Type"
          required
          name="deviceTypeName"
          value={formState?.deviceTypeName}
          errMsg={inputError?.deviceTypeName}
          onChange={handleFormChange}
        />
      </div>

      {/* SAVE AND BACK BUTTONS */}
      <div className="mt-6">
        <SaveAndBackButtons toggler={toggler} />
      </div>
    </form>
  );
};

export default DeviceTypeEditForm;

// Country Validator
// eslint-disable-next-line react-refresh/only-export-components
export const deviceTypeValidator = (formState: TypeDeviceTypeForm) => {
  const errors: TypeDeviceTypeErrorForm = {};

  if (!formState?.deviceTypeName) errors.deviceTypeName = "Required";

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
