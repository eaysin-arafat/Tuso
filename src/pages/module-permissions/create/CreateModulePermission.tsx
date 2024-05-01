import { RootState } from "@/app/store";
import SaveAndBackButtons from "@/components/core/buttons/SaveAndBackButtons";
import Select from "@/components/core/form-elements/Select";
import DefaultModal from "@/components/core/modal/DefaultModal";
import { ModuleData } from "@/constants/api-interface/modules";
import { useCreateModulePermissionMutation } from "@/features/module-permission/module-permission-api";
import useBaseDataCreate from "@/hooks/shared/useBaseDataCreate";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

// Props Type
type Props = {
  toggler: () => void;
};

// Modal Data Type
export interface Modal {
  roleId: string;
  moduleData: Modules[];
}

// Module Data Type
export interface Modules {
  oid: number;
  moduleName: string;
  description: string;
  dateCreated: string;
  createdBy: string;
  dateModified: string;
  modifiedBy: string;
  isDeleted: boolean;
}

const CreateModulePermission = ({ toggler }: Props) => {
  // get modal data form the redux store
  const { addModal } = useSelector((state: RootState) => state.modal);
  const modalData = addModal?.data as unknown as Modal;

  // Form State
  const [formState, setFormState] = React.useState({ moduleId: "" });

  //Create BaseData
  const [baseData] = useBaseDataCreate();

  // Create Module Permission Mutation
  const [
    createModulePermission,
    {
      data: modulePermissionRes,
      isError: isCreateError,
      isSuccess: isCreateSuccess,
      error: createError,
      status: createStatus,
    },
  ] = useCreateModulePermissionMutation();

  //Form validation Schema
  const schema = Joi.object({
    moduleId: Joi.string().required().messages({
      "string.empty": "Required",
    }),
  });

  // Submit handler
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: formState,
    resolver: joiResolver(schema),
  });

  const handleOnSubmit = (data: { moduleId: string }) => {
    createModulePermission({
      ...data,
      ...baseData,
      roleId: modalData?.roleId,
      moduleId: Number(data?.moduleId),
    });
  };

  // render role options
  const renderModuleOptions = () => {
    return modalData?.moduleData?.map((module: ModuleData) => (
      <option key={module?.oid} value={module?.oid}>
        {module?.moduleName}
      </option>
    ));
  };

  // handle create side Effects
  useCreateSideEffects({
    error: createError,
    isError: isCreateError,
    isSuccess: isCreateSuccess,
    status: createStatus,
    message: "module",
    messageType: "create",
    response: modulePermissionRes,
    initialState: { moduleId: "" },
    isToggle: true,
    setFormState,
    toggler,
  });

  return (
    <DefaultModal size="3xl" title="Create Permission" toggler={toggler}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        {/* Module  */}
        <Controller
          control={control}
          name="moduleId"
          render={({ field }) => (
            <Select
              label="Module"
              selectShow="Select Module"
              value={field.value}
              onChange={field.onChange}
              name={field.name}
              errMsg={errors.moduleId?.message as string | undefined}
            >
              {renderModuleOptions()}
            </Select>
          )}
        />

        {/* Action Buttons  */}
        <div className="mt-6">
          <SaveAndBackButtons toggler={toggler} />
        </div>
      </form>
    </DefaultModal>
  );
};

export default CreateModulePermission;
