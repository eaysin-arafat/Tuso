/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import SaveAndBackButtons from "@/components/core/buttons/SaveAndBackButtons";
import Input from "@/components/core/form-elements/Input";
import DefaultModal from "@/components/core/modal/DefaultModal";
import { DeviceControlTypes } from "@/constants/api-interface";
import { useUpdateDeviceControlMutation } from "@/features/device-control/device-control-api";
import useBaseDataEdit from "@/hooks/shared/useBaseDataEdit";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

type Props = {
  toggler: () => void;
};

// Data type
type TypeDeviceTypeForm = {
  cpuUses: number;
  memoryUses: number;
};

// form state
const initialState = {
  cpuUses: 0,
  memoryUses: 0,
};

const EditDeviceParameter = ({ toggler }: Props) => {
  // modal data from redux store
  const { data } = useSelector((state: RootState) => state.modal?.editModal);
  const prevData = data?.data as unknown as DeviceControlTypes;

  // Base Data hook
  const [baseData] = useBaseDataEdit();

  // form state
  const [formState, setFormState] = useState<TypeDeviceTypeForm>({
    cpuUses: prevData?.[0]?.cpuUses,
    memoryUses: prevData?.[0]?.memoryUses,
  });

  // Update Device Control hook
  const [
    updateDeviceControl,
    { data: deviceControlRes, error, isError, isSuccess, status },
  ] = useUpdateDeviceControlMutation();

  // Validation Schema
  const schema = Joi.object({
    cpuUses: Joi.number().messages({
      "number.base": "Device Parameter should be a type of",
      "number.required": "Required",
    }),
    memoryUses: Joi.number().messages({
      "number.empty": "Required",
    }),
  });

  // Submit handler
  const onSubmit = (data: TypeDeviceTypeForm) => {
    const payload = {
      ...baseData,
      ...prevData[0],
      ...data,
    };

    updateDeviceControl({
      key: prevData?.[0]?.oid,
      body: payload,
    });
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TypeDeviceTypeForm>({
    defaultValues: formState,
    resolver: joiResolver(schema),
  });

  // handle create side Effects
  useCreateSideEffects({
    error,
    isError,
    isSuccess,
    status,
    message: "device parameter",
    messageType: "update",
    response: deviceControlRes,
    setFormState,
    initialState,
    isToggle: true,
    toggler,
  });

  return (
    <DefaultModal size="3xl" title="Edit Device Parameter" toggler={toggler}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          {/* CPU Usage (%) field */}
          <Controller
            control={control}
            name="cpuUses"
            render={({ field }) => (
              <Input
                required
                label="CPU Usage (%)"
                className="rounded-md"
                value={field.value}
                errMsg={errors?.cpuUses?.message as string | undefined}
                name={field.name}
                onChange={field.onChange}
              />
            )}
          />

          {/* Memory Usage (%) field */}
          <Controller
            control={control}
            name="memoryUses"
            render={({ field }) => (
              <Input
                required
                label="Memory Usage (%)"
                className="rounded-md"
                value={field.value}
                errMsg={errors?.memoryUses?.message as string | undefined}
                name={field.name}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        {/* Action Buttons  */}
        <div className="mt-6">
          <SaveAndBackButtons toggler={toggler} />
        </div>
      </form>
    </DefaultModal>
  );
};

export default EditDeviceParameter;
