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
import Select from "@/components/core/form-elements/Select";
import DefaultModal from "@/components/core/modal/DefaultModal";
import { EmailControl } from "@/constants/api-interface";
import { useUpdateEmailControlMutation } from "@/features/email-control/email-control-api";
import useBaseDataCreate from "@/hooks/shared/useBaseDataCreate";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { booleanOptions } from "../../index/constant";

const EditEmailStatusCreate = ({ toggler }: { toggler: () => void }) => {
  // Edit modal data from redux store
  const { editModal } = useSelector((state: RootState) => state.modal);
  const prevData = editModal?.data as EmailControl | null;

  // Form State
  const [formState, setFormState] = React.useState<{
    isEmailSendForIncidentCreate: boolean;
  }>({
    isEmailSendForIncidentCreate:
      prevData?.isEmailSendForIncidentCreate ?? false,
  });

  // Create BaseData
  const [baseData] = useBaseDataCreate();

  // Update Email Control hook
  const [
    updateEmailControl,
    { data: emailControlRes, isError, isSuccess, error, status },
  ] = useUpdateEmailControlMutation();

  // Form Validation Schema
  const schema = Joi.object({
    isEmailSendForIncidentCreate: Joi.boolean().required().messages({
      "boolean.empty": "Required",
      "boolean.required": "Required",
    }),
  });

  // Form handler
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<{ isEmailSendForIncidentCreate: boolean }>({
    defaultValues: formState,
    resolver: joiResolver(schema),
  });

  const handleOnSubmit = (data: { isEmailSendForIncidentCreate: boolean }) => {
    const payload = {
      ...baseData,
      ...prevData,
      isEmailSendForIncidentCreate: data?.isEmailSendForIncidentCreate,
    };
    updateEmailControl({ key: Number(prevData?.oid), body: payload });
  };

  // Create Email Control SideEffect
  useCreateSideEffects({
    error,
    isError,
    isSuccess,
    status,
    message: "email",
    messageType: "create",
    response: emailControlRes,
    initialState: { isEmailSendForIncidentCreate: true },
    isToggle: true,
    setFormState,
    toggler,
  });

  // Render option Data
  const renderBooleanOptions = () => {
    return Object.keys(booleanOptions).map((key: string) => (
      <option key={key} value={key}>
        {booleanOptions[key]}
      </option>
    ));
  };

  return (
    <DefaultModal size="4xl" title="Edit Email Status" toggler={toggler}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="grid gap-4">
          Is EmailSend For IncidentCreate
          <Controller
            control={control}
            name="isEmailSendForIncidentCreate"
            render={({ field }) => (
              <Select
                label="Status"
                name={field.name}
                value={String(field.value)}
                errMsg={
                  errors?.isEmailSendForIncidentCreate?.message as
                    | string
                    | undefined
                }
                onChange={field.onChange}
              >
                {renderBooleanOptions()}
              </Select>
            )}
          />
        </div>

        {/*Form  Action Buttons  */}
        <div className="mt-6">
          <SaveAndBackButtons toggler={toggler} />
        </div>
      </form>
    </DefaultModal>
  );
};

export default EditEmailStatusCreate;
