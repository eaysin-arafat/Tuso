import {
  TypeImplementingPartnerForm,
  initialStateImplementingPartner,
} from "@/constants/form-interface/implementing-partner";
import { useCreateImplementingPartnerMutation } from "@/features/implementing-partner/implementing-partner-api";
import useBaseDataCreate from "@/hooks/shared/useBaseDataCreate";
import useCloseModal from "@/hooks/shared/useCloseModal";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { useState } from "react";

const useCreateImplementingPartner = () => {
  const [baseData] = useBaseDataCreate();
  const { toggler } = useCloseModal();

  // form state
  const [formState, setFormState] = useState<TypeImplementingPartnerForm>(
    initialStateImplementingPartner
  );

  const [
    createImplementingPartner,
    {
      data: implementingPartnerRes,
      error,
      isError,
      isSuccess,
      status,
    },
  ] = useCreateImplementingPartnerMutation();

  const handleSubmit = (data: TypeImplementingPartnerForm) => {
    const submitData = {
      ...baseData,
      ...data,
    };

    createImplementingPartner(submitData);
  };

  // handle create side Effects
  useCreateSideEffects({
    error,
    isError,
    isSuccess,
    status,
    message: "implementing partner",
    messageType: "create",
    response: implementingPartnerRes,
    setFormState,
    initialState: initialStateImplementingPartner,
    isToggle: true,
    toggler,
  });

  return { formState, handleSubmit };
};

export default useCreateImplementingPartner;
