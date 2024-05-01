import { RootState } from "@/app/store";
import { ImplementingPartner } from "@/constants/api-interface";
import {
  TypeImplementingPartnerForm,
  initialStateImplementingPartner,
} from "@/constants/form-interface/implementing-partner";
import { useUpdateImplementingPartnerMutation } from "@/features/implementing-partner/implementing-partner-api";
import useBaseDataEdit from "@/hooks/shared/useBaseDataEdit";
import useCloseModal from "@/hooks/shared/useCloseModal";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { useState } from "react";
import { useSelector } from "react-redux";

const useEditImplementingPartner = () => {
  const { data } = useSelector((state: RootState) => state.modal?.editModal);
  const modalData = data as unknown as ImplementingPartner;
  const [baseData] = useBaseDataEdit();
  const { closeEditModal } = useCloseModal();

  // form state
  const [formState, setFormState] = useState<TypeImplementingPartnerForm>({
    implementingPartnerName: modalData?.implementingPartnerName,
    projectId: String(modalData?.projectId),
  });

  const [
    updateImplementingPartner,
    {
      data: implementingPartnerRes,
      error,
      isError,
      isSuccess,
      status,
    },
  ] = useUpdateImplementingPartnerMutation();

  const handleSubmit = (data: TypeImplementingPartnerForm) => {

    const submitData = {
      ...baseData,
      ...modalData,
      ...data,
      projectId: Number(data?.projectId),
    };

    updateImplementingPartner({
      key: Number(modalData?.oid),
      body: submitData,
    });
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
    toggler: closeEditModal,
    initialState: initialStateImplementingPartner,
    isToggle: true,
  });

  return { handleSubmit, formState };
};

export default useEditImplementingPartner;
