/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import { EmailConfiguration } from "@/constants/api-interface";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import SaveAndBackButtons from "../core/buttons/SaveAndBackButtons";
import Input from "../core/form-elements/Input";
import Password from "../core/form-elements/Password";

// props type
type Props = {
  toggler: () => void;
  handleOnSubmit: SubmitHandler<EmailConfiguration>;
  categoryState: EmailConfiguration;
};

// Email Configuration Form component
const EmailConfigurationForm = ({
  handleOnSubmit,
  categoryState,
  toggler,
}: Props) => {
  // email type error messages schema
  const emailTypeErrorMessages = {
    "string.empty": "Required",
    "string.min": "Description should have a minimum length of 6",
    "string.max": "Description should have a maximum length of 30",
  };

  // text type input error messages schema
  const textTypeinputError = {
    "string.empty": "Required",
    "string.min": "First Lebel Category should have a minimum length of 3",
    "string.max": "First Lebel Category should have a maximum length of 30",
    "string.base": "First Lebel Category should be a type of",
    "string.required": "Required",
  };

  // form schema
  const schema = Joi.object({
    domainName: Joi.string().required().messages({
      "string.empty": "Required",
      "string.min": "First Lebel Category should have a minimum length of 3",
      "string.max": "First Lebel Category should have a maximum length of 30",
      "string.base": "First Lebel Category should be a type of",
      "string.required": "Required",
    }),
    emailAddress: Joi.string()
      .required()
      // .email()
      .messages(emailTypeErrorMessages),
    auditmails: Joi.string()
      .required()
      // .email()
      .messages(emailTypeErrorMessages),
    password: Joi.string().min(6).max(30).required().messages({
      "string.empty": "Required",
      "string.min": "Password should have a minimum length of 6",
      "string.max": "Password should have a maximum length of 30",
    }),
    smtpServer: Joi.string().required().messages(textTypeinputError),
    port: Joi.string().required().messages(textTypeinputError),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<EmailConfiguration>({
    defaultValues: categoryState,
    resolver: joiResolver(schema),
  });

  return (
    <div>
      {/* FORM */}
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="grid gap-4">
          {/* DOMAIN NAME */}
          <Controller
            control={control}
            name="domainName"
            render={({ field }) => (
              <Input
                label="Domain Name"
                className="rounded-md"
                value={field.value}
                errMsg={errors?.domainName?.message as string | undefined}
                name={field.name}
                onChange={field.onChange}
              />
            )}
          />

          {/* EMAIL ADDRESS */}
          <Controller
            control={control}
            name="emailAddress"
            render={({ field }) => (
              <Input
                label="Email Address"
                className="rounded-md"
                value={field.value}
                errMsg={errors?.emailAddress?.message as string | undefined}
                name={field.name}
                onChange={field.onChange}
                type="email"
              />
            )}
          />

          {/* AUDIT MAILS */}
          <Controller
            control={control}
            name="auditmails"
            render={({ field }) => (
              <div className="relative mb-1">
                <Input
                  label="Audit Email"
                  className="rounded-md"
                  value={field.value as string}
                  errMsg={errors?.auditmails?.message as string | undefined}
                  name={field.name}
                  onChange={field.onChange}
                />
                <span className="text-end w-full text-xs my-0 absolute bottom-[-18px] whitespace-nowrap truncate">
                  Separate email addresses with commas
                </span>
              </div>
            )}
          />

          {/* PASSWORD */}
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Password
                label="Password"
                className="rounded-md"
                value={field.value as string}
                errMsg={errors?.password?.message as string | undefined}
                name={field.name}
                onChange={field.onChange}
              />
            )}
          />

          {/* SMTP SERVER */}
          <Controller
            control={control}
            name="smtpServer"
            render={({ field }) => (
              <Input
                label="SMTP Server"
                className="rounded-md"
                value={field.value as string}
                errMsg={errors?.smtpServer?.message as string | undefined}
                name={field.name}
                onChange={field.onChange}
              />
            )}
          />

          {/* PORT */}
          <Controller
            control={control}
            name="port"
            render={({ field }) => (
              <Input
                label="TLS/SSL Port"
                className="rounded-md"
                value={field.value as string}
                errMsg={errors?.port?.message as string | undefined}
                name={field.name}
                onChange={field.onChange}
              />
            )}
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

export default EmailConfigurationForm;
