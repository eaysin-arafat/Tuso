/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import DefaultModal from "@/components/core/modal/DefaultModal";
import ItExpertCreateForm from "@/components/it-expert/CreateForm";
import { User } from "@/constants/api-interface";
import {
  TypeItExpertErrorForm,
  TypeItExpertForm,
  itExpertInitialState,
} from "@/constants/form-interface/it-expert";
import { FormSubmitEventType } from "@/constants/interface/htmlEvents";
import { useCreateFacilityPermissionMutation } from "@/features/facility-permission/facility-permission-api";
import useBaseDataCreate from "@/hooks/shared/useBaseDataCreate";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { itExpertValidator } from "@/validation-models/it-expert/it-expert";
import { useState } from "react";
import { useParams } from "react-router-dom";

// Props Type
type Props = {
  toggler: () => void;
};

const CreateItExpert = ({ toggler }: Props) => {
  // local States
  const [formState, setFormState] =
    useState<TypeItExpertForm>(itExpertInitialState);
  const [inputError, setInputError] = useState<TypeItExpertErrorForm | null>(
    null
  );
  const [user, setUser] = useState<User | undefined>(undefined);

  // Create Base Data
  const [baseData] = useBaseDataCreate();

  // facilityId from parameter
  const { facilityId } = useParams<{ facilityId: string }>();

  // Create Facility Permission hook
  const [
    createFacilityPermission,
    { data: facilityPermissionRes, error, isError, isSuccess, status },
  ] = useCreateFacilityPermissionMutation();

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
      ...baseData,
      facilityId: Number(facilityId),
      userId: String(formState?.expertId),
      isITExpart: true,
    };

    createFacilityPermission(submitData);
  };

  // Create SideEffect 
  useCreateSideEffects({
    error,
    isError,
    isSuccess,
    status,
    message: "it expert",
    messageType: "create",
    response: facilityPermissionRes,
    initialState: itExpertInitialState,
    isToggle: true,
    setFormState,
    toggler,
  });

  return (
    <DefaultModal size="3xl" title="Add IT Expert" toggler={toggler}>
      {/* It Expert Create Form  */}
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

export default CreateItExpert;
