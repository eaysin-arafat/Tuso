/*
 * Created by: Andrew
 * Date created: 10.11.2023
 * Modified by: Andrew
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import { IncidentCategory } from "@/constants/api-interface";
import { CategoryType } from "@/constants/api-interface/category-types";
import { incidentValidation } from "@/validation-models/incident-category/incident-category-validation";
import { joiResolver } from "@hookform/resolvers/joi";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import SaveAndBackButtons from "../core/buttons/SaveAndBackButtons";
import Input from "../core/form-elements/Input";
import Textarea from "../core/form-elements/Textarea";

// category create form props
type Props = {
  toggler: () => void;
  handleOnSubmit: SubmitHandler<IncidentCategory>;
  categoryState: CategoryType;
  categoryType: "First" | "Second" | "Third";
};

// category create form component
const CategoryCreateForm = ({
  handleOnSubmit,
  categoryState,
  toggler,
  categoryType = "First",
}: Props) => {
  // use form hook
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IncidentCategory>({
    defaultValues: categoryState,
    resolver: joiResolver(incidentValidation),
  });

  return (
    <div>
      {/* FORM */}
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="grid gap-4">
          {/* INCIDENTS CATEGORY */}
          <Controller
            control={control}
            name="incidentCategorys"
            render={({ field }) => (
              <Input
                required
                label={`${categoryType} Level Category`}
                className="rounded-md"
                value={field.value}
                errMsg={
                  errors?.incidentCategorys?.message as string | undefined
                }
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
                required
                label="Description"
                className="rounded-md"
                value={field.value as string}
                errMsg={errors?.description?.message as string | undefined}
                name={field.name}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        {/* BUTTONS */}
        <div className="mt-6">
          <SaveAndBackButtons toggler={toggler} />
        </div>
      </form>
    </div>
  );
};

export default CategoryCreateForm;
