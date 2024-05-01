/*
 * Created by: Andrew
 * Date created: 10.02.2024
 * Modified by: Andrew
 * Last modified: 03.03.2024
 * Reviewed by:
 * Date Reviewed:
 */

import DefaultModal from "@/components/core/modal/DefaultModal";
import ProvinceEditForm from "@/components/province/EditForm";

// Define the type of the props
type Props = {
  toggler: () => void;
};

/**
 * @description Edit Province component
 */
const EditProvince = ({ toggler }: Props) => {
  return (
    <DefaultModal size="3xl" title="Edit Province" toggler={toggler}>
      {/* PROVINCE EDIT FORM */}
      <ProvinceEditForm toggler={toggler} />
    </DefaultModal>
  );
};

export default EditProvince;
