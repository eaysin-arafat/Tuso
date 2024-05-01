/*
 * Created by: Andrew
 * Date created: 10.11.2023
 * Modified by: Andrew
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import { SystemDataType } from "@/constants/api-interface/system";
import { SystemType } from "@/constants/api-interface/system-types";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import SaveAndBackButtons from "../core/buttons/SaveAndBackButtons";
import Input from "../core/form-elements/Input";
import Textarea from "../core/form-elements/Textarea";

// System create form props type
type Props = {
  toggler: () => void;
  handleOnSubmit: SubmitHandler<SystemDataType>;
  systemState: SystemType;
};

/**
 * @description System create form component
 */
const SystemCreateForm = ({ handleOnSubmit, systemState, toggler }: Props) => {
  // System form schema
  const schema = Joi.object({
    title: Joi.string().required().messages({
      "string.empty": "Required",
      "string.min": "First Lebel Category should have a minimum length of 3",
      "string.max": "First Lebel Category should have a maximum length of 30",
      "string.base": "First Lebel Category should be a type of",
      "string.required": "Required",
    }),
    description: Joi.string().required().messages({
      "string.empty": "Required",
      "string.min": "Description should have a minimum length of 6",
      "string.max": "Description should have a maximum length of 30",
    }),
  });

  // Use form hook
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SystemDataType>({
    defaultValues: systemState,
    resolver: joiResolver(schema),
  });

  return (
    <div>
      {/* FORM */}
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        {/* TITLE */}
        <div className="grid gap-4">
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <Input
                label="System Name"
                className="rounded-md"
                value={field.value}
                errMsg={errors?.title?.message as string | undefined}
                name={field.name}
                onChange={field.onChange}
              />
            )}
          />

          {/* DESCRIPTION */}
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <Textarea
                label="Description"
                className="rounded-md"
                value={field.value}
                errMsg={errors?.description?.message as string | undefined}
                name={field.name}
                onChange={field.onChange}
              />
            )}
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

export default SystemCreateForm;
