/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import { TypeImplementingPartnerForm } from "@/constants/form-interface/implementing-partner";
import useCloseModal from "@/hooks/shared/useCloseModal";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import SaveAndBackButtons from "../core/buttons/SaveAndBackButtons";
import Input from "../core/form-elements/Input";
import Select from "../core/form-elements/Select";

// Implementing partner prop type
type Props = {
  onSubmit: SubmitHandler<TypeImplementingPartnerForm>;
  formState: TypeImplementingPartnerForm;
};

/**
 * @description Implementing partner from component
 */
const ImplementingPartnerForm = ({ onSubmit, formState }: Props) => {
  // get Systems from store
  const { systems } = useSelector((state: RootState) => state?.clientForm);

  // modal toggler
  const { toggler } = useCloseModal();

  // implementing parter form schema
  const schema = Joi.object({
    implementingPartnerName: Joi.string().messages({
      "string.base": "Device Parameter should be a type of",
      "string.required": "Required",
    }),
    projectId: Joi.string().messages({
      "string.empty": "Required",
    }),
  });

  // use form hook
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TypeImplementingPartnerForm>({
    defaultValues: formState,
    resolver: joiResolver(schema),
  });

  return (
    // IMPLEMENTING PARTNER FORM
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4">
        {/* Implementing partner name */}
        <Controller
          control={control}
          name="implementingPartnerName"
          render={({ field }) => (
            <Input
              label="Implementing Partner"
              value={field.value}
              errMsg={
                errors?.implementingPartnerName?.message as string | undefined
              }
              name={field.name}
              onChange={field.onChange}
            />
          )}
        />

        {/* project id */}
        <Controller
          control={control}
          name="projectId"
          render={({ field }) => (
            <Select
              label="System"
              name="projectId"
              value={field.value}
              errMsg={errors?.projectId?.message as string | undefined}
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

      {/* SAVE AND BACK BUTTON */}
      <div className="mt-6">
        <SaveAndBackButtons toggler={toggler} />
      </div>
    </form>
  );
};

export default ImplementingPartnerForm;
