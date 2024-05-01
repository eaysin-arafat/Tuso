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
import Select from "@/components/core/form-elements/Select";
import Textarea from "@/components/core/form-elements/Textarea";
import DefaultModal from "@/components/core/modal/DefaultModal";
import { EmailTemplate } from "@/constants/api-interface";
import { useUpdateEmailTemplateMutation } from "@/features/email-template/email-template-api";
import useBaseDataEdit from "@/hooks/shared/useBaseDataEdit";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export interface SchedulerFormDataType {
  subject: string;
  mailBody: string;
  bodyType: number;
}

const EditEmailTemplate = ({ toggler }: { toggler: () => void }) => {
  //  data fetch from redux store
  const { editModal } = useSelector((state: RootState) => state.modal);
  const prevData = editModal?.data as unknown as EmailTemplate;
  const { emailNotifications } = useSelector(
    (state: RootState) => state?.clientForm
  );

  // Create Base Data
  const [baseData] = useBaseDataEdit();

  // Form State
  const [formState, setFormState] = React.useState<SchedulerFormDataType>({
    subject: prevData?.subject,
    mailBody: prevData?.mailBody,
    bodyType: prevData?.bodyType,
  });

  // Update Email Template hook
  const [
    updateEmailTemplate,
    {
      data: schedulerRes,
      status: createStatus,
      isError: isCreateError,
      error: createError,
      isSuccess: isCreateSuccess,
    },
  ] = useUpdateEmailTemplateMutation();

  // Form Validator Schema
  const schema = Joi.object({
    subject: Joi.string().messages({
      "string.empty": "Required",
      "string.required": "Required",
    }),
    mailBody: Joi.string().messages({
      "string.empty": "Required",
      "string.required": "Required",
    }),
    bodyType: Joi.number().messages({
      "number.empty": "Required",
      "number.required": "Required",
    }),
  });

  // Form Handler
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SchedulerFormDataType>({
    defaultValues: formState,
    resolver: joiResolver(schema),
  });

  const onSubmit = (data: SchedulerFormDataType) => {
    updateEmailTemplate({
      key: prevData?.oid,
      body: { ...baseData, ...prevData, ...data },
    });
  };

  // handle create side Effects
  useCreateSideEffects({
    error: createError,
    isError: isCreateError,
    isSuccess: isCreateSuccess,
    status: createStatus,
    message: "email template",
    messageType: "update",
    response: schedulerRes,
    initialState: { subject: "", mailBody: "", bodyType: 0 },
    isToggle: true,
    setFormState,
    toggler,
  });

  return (
    <DefaultModal size="4xl" title="Edit Email Template" toggler={toggler}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          {/* Body Type  */}
          <Controller
            control={control}
            name="bodyType"
            render={({ field }) => (
              <Select
                label="Notification Type"
                name={field.name}
                onChange={field?.onChange}
                value={field?.value}
                errMsg={errors.bodyType?.message as string | undefined}
              >
                {emailNotifications?.map((option) => (
                  <option key={option?.oid} value={option?.oid}>
                    {option?.subject}
                  </option>
                ))}
              </Select>
            )}
          />

          {/* Subject  */}
          <Controller
            control={control}
            name="subject"
            render={({ field }) => (
              <Input
                label="Subject"
                className="rounded-md"
                value={field.value}
                errMsg={errors?.subject?.message as string | undefined}
                name={field.name}
                onChange={field.onChange}
              />
            )}
          />

          {/* Mail Body  */}
          <Controller
            control={control}
            name="mailBody"
            render={({ field }) => (
              <Textarea
                label="Mail Body"
                className="rounded-md h-40"
                value={field.value}
                errMsg={errors?.mailBody?.message as string | undefined}
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

export default EditEmailTemplate;
