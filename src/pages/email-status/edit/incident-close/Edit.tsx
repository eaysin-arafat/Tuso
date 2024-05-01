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
import useBaseDataEdit from "@/hooks/shared/useBaseDataEdit";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { booleanOptions } from "../../index/constant";

const EditEmailStatusClose = ({ toggler }: { toggler: () => void }) => {
  // Edit modal data from redux store
  const { editModal } = useSelector((state: RootState) => state.modal);
  const prevData = editModal?.data as EmailControl | null;

  // Form State
  const [formState, setFormState] = React.useState<{
    isEmailSendForIncidentClose: boolean;
  }>({
    isEmailSendForIncidentClose: prevData?.isEmailSendForIncidentClose ?? false,
  });

  // Base Data for Edit
  const [baseData] = useBaseDataEdit();

  // Update Email Control hook
  const [
    updateEmailControl,
    {
      data: emailControlres,
      isError: isCreateError,
      isSuccess: isCreateSuccess,
      error: createError,
      status: createStatus,
    },
  ] = useUpdateEmailControlMutation();

  // Form Validation Schema
  const schema = Joi.object({
    isEmailSendForIncidentClose: Joi.boolean().required().messages({
      "boolean.empty": "Required",
      "boolean.required": "Required",
    }),
  });

  // Form Handler
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<{ isEmailSendForIncidentClose: boolean }>({
    defaultValues: formState,
    resolver: joiResolver(schema),
  });

  const handleOnSubmit = (data: { isEmailSendForIncidentClose: boolean }) => {
    const payload = {
      ...baseData,
      ...prevData,
      isEmailSendForIncidentClose: data.isEmailSendForIncidentClose,
    };
    updateEmailControl({ key: Number(prevData?.oid), body: payload });
  };

  // handle create side Effects
  useCreateSideEffects({
    error: createError,
    isError: isCreateError,
    isSuccess: isCreateSuccess,
    status: createStatus,
    message: "email",
    messageType: "update",
    response: emailControlres,
    isToggle: true,
    initialState: { isEmailSendForIncidentClose: true },
    setFormState,
    toggler,
  });

  // Render Options Data
  const renderBooleanOptions = () => {
    return Object.keys(booleanOptions)?.map((key: string) => (
      <option key={key} value={key}>
        {booleanOptions[key]}
      </option>
    ));
  };

  return (
    <DefaultModal size="4xl" title="Edit Email Status" toggler={toggler}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="grid gap-4">
          {/* Status  */}
          <Controller
            control={control}
            name="isEmailSendForIncidentClose"
            render={({ field }) => (
              <Select
                label="Status"
                name={field.name}
                value={String(field.value)}
                errMsg={
                  errors?.isEmailSendForIncidentClose?.message as
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
        {/* Form Action Buttons */}
        <div className="mt-6">
          <SaveAndBackButtons toggler={toggler} />
        </div>
      </form>
    </DefaultModal>
  );
};

export default EditEmailStatusClose;
