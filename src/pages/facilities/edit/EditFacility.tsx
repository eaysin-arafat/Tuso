/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import DefaultModal from "@/components/core/modal/DefaultModal";
import FacilityEditForm from "@/components/facility/EditForm";

type Props = {
  toggler: () => void;
};

const EditFacility = ({ toggler }: Props) => {
  return (
    <DefaultModal size="5xl" title="Edit Facility" toggler={toggler}>
      {/* Facility Edit Modal  */}
      <FacilityEditForm toggler={toggler} />
    </DefaultModal>
  );
};

export default EditFacility;
