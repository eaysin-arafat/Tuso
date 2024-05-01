/*
 * Created by: Andrew
 * Date created: 10.11.2023
 * Modified by: Andrew
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import SaveAndBackButtons from "@/components/core/buttons/SaveAndBackButtons";
import Select from "@/components/core/form-elements/Select";
import DefaultModal from "@/components/core/modal/DefaultModal";
import { useCreateSystemPermissionMutation } from "@/features/system-permission/system-permission-api";
import useBaseDataCreate from "@/hooks/shared/useBaseDataCreate";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

// system permission form type
type Props = {
  toggler: () => void;
};

/**
 * @description Create system permission component
 */
const CreateSystemPermission = ({ toggler }: Props) => {
  // add modal data from redux
  const { addModal } = useSelector((state: RootState) => state.modal);

  // get systems from redux
  const { systems } = useSelector((state: RootState) => state.clientForm);

  // define user id
  const userId = addModal?.data;

  // category state
  const [categoryState, setCategoryState] = React.useState({
    systemId: "",
  });

  // base data for create record
  const [baseData] = useBaseDataCreate();

  // create system permission mutation
  const [createSystem, { data: systemRes, error, isError, isSuccess, status }] =
    useCreateSystemPermissionMutation();

  // form submit handler
  const handleOnSubmit = (data: { systemId: string }) => {
    createSystem({
      ...baseData,
      ...data,
      systemId: Number(data?.systemId),
      userAccountId: Number(userId),
    });
  };

  // form validation schema
  const schema = Joi.object({
    systemId: Joi.string().required().messages({
      "string.empty": "Required",
      "string.base": "First Lebel Category should be a type of",
      "string.required": "Required",
    }),
  });

  // use form hook
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: categoryState,
    resolver: joiResolver(schema),
  });

  // handle side effects on create system permission
  useCreateSideEffects({
    error,
    isError,
    isSuccess,
    status,
    message: "system permission",
    messageType: "create",
    response: systemRes,
    initialState: { systemId: "" },
    isToggle: true,
    setFormState: setCategoryState,
    toggler,
  });

  return (
    <DefaultModal size="3xl" title="System Permission" toggler={toggler}>
      {/* FORM */}
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="grid gap-4">
          {/* SYSTEM ID */}
          <Controller
            control={control}
            name="systemId"
            render={({ field }) => (
              <Select
                label="System"
                name={field.name}
                value={field.value}
                errMsg={errors.systemId?.message as string | undefined}
                onChange={field.onChange}
              >
                {systems?.map((option) => (
                  <option key={option?.oid} value={option?.oid}>
                    {option?.title}
                  </option>
                ))}
              </Select>
            )}
          />
        </div>

        {/* SAVE AND BACK BuTTON */}
        <div className="mt-6">
          <SaveAndBackButtons toggler={toggler} />
        </div>
      </form>
    </DefaultModal>
  );
};

export default CreateSystemPermission;
