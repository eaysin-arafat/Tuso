/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import DefaultModal from "@/components/core/modal/DefaultModal";
import DeviceTypeEditForm from "@/components/device-type/EditForm";

type Props = {
  toggler: () => void;
};

const EditDeviceType = ({ toggler }: Props) => {
  return (
    <DefaultModal size="3xl" title="Edit Device Type" toggler={toggler}>
      {/* Edot Device Type Form  */}
      <DeviceTypeEditForm toggler={toggler} />
    </DefaultModal>
  );
};

export default EditDeviceType;
