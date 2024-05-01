/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import DefaultModal from "@/components/core/modal/DefaultModal";
import ImplementingPartnerForm from "@/components/implementing-partner/ImplementingPartnerForm";
import useCloseModal from "@/hooks/shared/useCloseModal";
import useEditImplementingPartner from "./useEdit";

const EditImplementingPartner = () => {
  const { formState, handleSubmit } = useEditImplementingPartner();
  const { toggler } = useCloseModal();

  return (
    <DefaultModal
      size="3xl"
      title="Create Implementing Partner"
      toggler={toggler}
    >
      {/* Create Implementing Partner Form */}
      <ImplementingPartnerForm formState={formState} onSubmit={handleSubmit} />
    </DefaultModal>
  );
};

export default EditImplementingPartner;
