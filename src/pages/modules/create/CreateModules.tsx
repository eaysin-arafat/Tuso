import SaveAndBackButtons from "@/components/core/buttons/SaveAndBackButtons";
import Input from "@/components/core/form-elements/Input";
import Textarea from "@/components/core/form-elements/Textarea";
import DefaultModal from "@/components/core/modal/DefaultModal";
import { useCreateModuleMutation } from "@/features/modules/modules-api";
import useBaseDataCreate from "@/hooks/shared/useBaseDataCreate";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import React from "react";
import { Controller, useForm } from "react-hook-form";

// Module Form Data Type
interface ModuleFormDataType {
  moduleName: string;
  description: string;
}

// Module Form Initial state
const moduleFormInitialState = {
  moduleName: "",
  description: "",
};

// Props type
type Props = {
  toggler: () => void;
};

const CreateModules = ({ toggler }: Props) => {
  // form state
  const [formState, setFormState] = React.useState<ModuleFormDataType>(
    moduleFormInitialState
  );

  // Create BaseData
  const [baseData] = useBaseDataCreate();

  // Create module mutation
  const [
    createModule,
    {
      data: moduleRes,
      isError: isCreateError,
      isSuccess: isCreateSuccess,
      error: createError,
      status: createStatus,
    },
  ] = useCreateModuleMutation();

  // module validation schema
  const schema = Joi.object({
    moduleName: Joi.string().required().messages({
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

  // Form Submit handler
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ModuleFormDataType>({
    defaultValues: formState,
    resolver: joiResolver(schema),
  });

  const handleOnSubmit = (data: ModuleFormDataType) => {
    createModule({
      ...data,
      ...baseData,
    });
  };

  // handle create side Effects
  useCreateSideEffects({
    error: createError,
    isError: isCreateError,
    isSuccess: isCreateSuccess,
    status: createStatus,
    message: "module",
    messageType: "create",
    response: moduleRes,
    initialState: moduleFormInitialState,
    isToggle: true,
    setFormState,
    toggler,
  });

  return (
    <DefaultModal size="3xl" title="Create Moudles" toggler={toggler}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="grid gap-4">
          {/* System Name */}
          <Controller
            control={control}
            name="moduleName"
            render={({ field }) => (
              <Input
                label="System Name"
                className="rounded-md"
                value={field.value}
                errMsg={errors?.moduleName?.message as string | undefined}
                name={field.name}
                onChange={field.onChange}
              />
            )}
          />

          {/* Description */}
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

        {/* Action Buttons  */}
        <div className="mt-6">
          <SaveAndBackButtons toggler={toggler} />
        </div>
      </form>
    </DefaultModal>
  );
};

export default CreateModules;
