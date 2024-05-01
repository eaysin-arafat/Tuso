/*
 * Created by: Andrew
 * Date created: 10.02.2024
 * Modified by: Andrew
 * Last modified: 03.03.2024
 * Reviewed by:
 * Date Reviewed:
 */

import DefaultModal from "@/components/core/modal/DefaultModal";
import SystemCreateForm from "@/components/system/CreateForm";
import {
  SystemType,
  systemInitialState,
} from "@/constants/api-interface/system-types";
import { useCreateSystemMutation } from "@/features/systems/system-api";
import useBaseDataCreate from "@/hooks/shared/useBaseDataCreate";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import React from "react";

// system props type
type Props = {
  toggler: () => void;
};

/**
 * @description Create System component
 */
const CreateSystem = ({ toggler }: Props) => {
  // system state
  const [systemState, setSystemState] =
    React.useState<SystemType>(systemInitialState);

  // base data for creating record
  const [baseData] = useBaseDataCreate();

  // create system mutation
  const [
    createSystem,
    {
      data: systemRes,
      isError: isCreateError,
      isSuccess: isCreateSuccess,
      error: createError,
      status: createStatus,
    },
  ] = useCreateSystemMutation();

  // form submit handler
  const handleOnSubmit = (data: SystemType) => {
    createSystem({
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
    message: "system",
    messageType: "create",
    response: systemRes,
    initialState: systemInitialState,
    isToggle: true,
    setFormState: setSystemState,
    toggler,
  });

  return (
    <DefaultModal size="3xl" title="Create System" toggler={toggler}>
      {/* SYSTEM CREATE FORM */}
      <SystemCreateForm
        systemState={systemState}
        handleOnSubmit={handleOnSubmit}
        toggler={toggler}
      />
    </DefaultModal>
  );
};

export default CreateSystem;
