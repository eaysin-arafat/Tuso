import { RootState } from "@/app/store";
import DefaultModal from "@/components/core/modal/DefaultModal";
import SystemCreateForm from "@/components/system/CreateForm";
import { SystemDataType } from "@/constants/api-interface/system";
import {
  SystemType,
  systemInitialState,
} from "@/constants/api-interface/system-types";
import { useUpdateSystemMutation } from "@/features/systems/system-api";
import useBaseDataEdit from "@/hooks/shared/useBaseDataEdit";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import React from "react";
import { useSelector } from "react-redux";

type Props = {
  toggler: () => void;
};

const EditSystem = ({ toggler }: Props) => {
  const { editModal } = useSelector((state: RootState) => state.modal);
  const prevData = editModal?.data as unknown as SystemDataType;

  const [systemState, setSystemState] = React.useState<SystemType>({
    title: prevData?.title,
    description: prevData?.description,
  });
  const [baseData] = useBaseDataEdit();

  const [
    updateSystem,
    {
      data: systemRes,
      isError: isCreateError,
      isSuccess: isCreateSuccess,
      error: createError,
      status: createStatus,
    },
  ] = useUpdateSystemMutation();

  const handleOnSubmit = (data: SystemDataType) => {
    updateSystem({
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
    message: "system",
    messageType: "create",
    response: systemRes,
    initialState: systemInitialState,
    isToggle: true,
    setFormState: setSystemState,
    toggler,
  });

  return (
    <DefaultModal size="3xl" title="Update System" toggler={toggler}>
      <SystemCreateForm
        systemState={systemState}
        handleOnSubmit={handleOnSubmit}
        toggler={toggler}
      />
    </DefaultModal>
  );
};

export default EditSystem;
