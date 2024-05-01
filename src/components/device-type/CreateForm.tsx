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
import { useCreateDeviceTypeMutation } from "@/features/device-type/device-type-api";
import useBaseDataCreate from "@/hooks/shared/useBaseDataCreate";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { useState } from "react";
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

// Device Type Create Form
const DeviceTypeCreateForm = ({ toggler }: Props) => {
  const [baseData] = useBaseDataCreate();

  // form state
  const [formState, setFormState] = useState<TypeDeviceTypeForm>(initialState);

  // input error state
  const [inputError, setInputError] = useState<TypeDeviceTypeErrorForm | null>(
    null
  );

  // create device type mutation
  const [
    createDeviceType,
    { data: deviceData, status, isError, error, isSuccess },
  ] = useCreateDeviceTypeMutation();

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
      ...formState,
    };

    createDeviceType(submitData);
  };

  // side effects after creating device type
  useCreateSideEffects({
    error,
    isError,
    isSuccess,
    status,
    message: "device type",
    messageType: "create",
    response: deviceData,
    initialState,
    isToggle: true,
    setFormState,
    toggler,
  });

  return (
    // FORM
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4">
        {/* DEVICE TYPE */}
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

export default DeviceTypeCreateForm;

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
