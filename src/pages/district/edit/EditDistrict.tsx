/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import DefaultModal from "@/components/core/modal/DefaultModal";
import DistrictEditForm from "@/components/district/EditForm";

type Props = {
  toggler: () => void;
};

const EditDistrict = ({ toggler }: Props) => {
  return (
    <DefaultModal size="3xl" title="Edit District" toggler={toggler}>
      {/* Edit District Form  */}
      <DistrictEditForm toggler={toggler} />
    </DefaultModal>
  );
};

export default EditDistrict;
