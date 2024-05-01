/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import DefaultModal from "@/components/core/modal/DefaultModal";
import FacilityCreateForm from "@/components/facility/CreateForm";

type Props = {
  toggler: () => void;
};

const CreateFacility = ({ toggler }: Props) => {
  return (
    <DefaultModal size="5xl" title="Add Facility" toggler={toggler}>
      {/* Facility Create Form  */}
      <FacilityCreateForm toggler={toggler} />
    </DefaultModal>
  );
};

export default CreateFacility;
