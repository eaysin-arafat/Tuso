/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import DefaultModal from "@/components/core/modal/DefaultModal";
import PriorityEditForm from "@/components/priority/EditForm";

// Priority Props Type
type Props = {
  toggler: () => void;
};

const EditPriority = ({ toggler }: Props) => {
  return (
    <DefaultModal size="3xl" title="Edit Priority" toggler={toggler}>
      {/* Priority Edit Form */}
      <PriorityEditForm toggler={toggler} />
    </DefaultModal>
  );
};

export default EditPriority;
