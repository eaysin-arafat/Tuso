/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import DefaultModal from "@/components/core/modal/DefaultModal";
import DeviceTypeCreateForm from "@/components/device-type/CreateForm";

type Props = {
  toggler: () => void;
};

const CreateDeviceType = ({ toggler }: Props) => {
  return (
    <DefaultModal size="3xl" title="Create Device Type" toggler={toggler}>
      {/* Create Device Type Form */}
      <DeviceTypeCreateForm toggler={toggler} />
    </DefaultModal>
  );
};

export default CreateDeviceType;
