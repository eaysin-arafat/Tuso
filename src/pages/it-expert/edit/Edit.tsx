/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import DefaultModal from "@/components/core/modal/DefaultModal";
import ItExpertCreateForm from "@/components/it-expert/CreateForm";
import { User } from "@/constants/api-interface";
import {
  TypeItExpertErrorForm,
  TypeItExpertForm,
  itExpertInitialState,
} from "@/constants/form-interface/it-expert";
import { FormSubmitEventType } from "@/constants/interface/htmlEvents";
import { useUpdateFacilityPermissionsMutation } from "@/features/facility-permission/facility-permission-api";
import useBaseDataEdit from "@/hooks/shared/useBaseDataEdit";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { itExpertValidator } from "@/validation-models/it-expert/it-expert";
import { useState } from "react";
import { useSelector } from "react-redux";

type Props = {
  toggler: () => void;
};

const EditItExpert = ({ toggler }: Props) => {
  // Edit modal data from redux store
  const { editModal } = useSelector((state: RootState) => state.modal);

  // Local States
  const [formState, setFormState] = useState<TypeItExpertForm>({
    expertId: editModal?.data?.userId,
    expertName: editModal?.data?.userName,
  });
  const [inputError, setInputError] = useState<TypeItExpertErrorForm | null>(
    null
  );
  const [user, setUser] = useState<User | undefined>(undefined);

  // Edit Base Data
  const [baseData] = useBaseDataEdit();

  // Update Facility Permission hook
  const [
    updateFacilityPermission,
    { data: facilityPermissionRes, error, isError, isSuccess, status },
  ] = useUpdateFacilityPermissionsMutation();

  // Submit Handler
  const handleSubmit = (e: FormSubmitEventType) => {
    e.preventDefault();

    const { isValid, errors } = itExpertValidator({
      ...formState,
    });
    if (!isValid) {
      setInputError(errors);
      return;
    }

    const submitData = {
      key: editModal?.data?.facliityPermissionId,
      body: {
        ...baseData,
        oid: editModal?.data?.facliityPermissionId,
        facilityId: editModal?.data?.faclilityId,
        userId: Number(formState?.expertId),
        isITExpart: true,
      },
    };

    updateFacilityPermission(submitData);
  };

  // Update SideEffect
  useCreateSideEffects({
    error,
    isError,
    isSuccess,
    status,
    message: "it expert",
    messageType: "update",
    response: facilityPermissionRes,
    initialState: itExpertInitialState,
    isToggle: true,
    setFormState,
    toggler,
  });

  return (
    <DefaultModal size="3xl" title="Update IT Expert" toggler={toggler}>
      {/* It Expert Edit Form  */}
      <ItExpertCreateForm
        toggler={toggler}
        formState={formState}
        handleSubmit={handleSubmit}
        inputError={inputError}
        setFormState={setFormState}
        setInputError={setInputError}
        setUser={setUser}
        user={user}
      />
    </DefaultModal>
  );
};

export default EditItExpert;
