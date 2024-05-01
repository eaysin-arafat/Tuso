/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import DefaultModal from "@/components/core/modal/DefaultModal";
import PriorityCreateForm from "@/components/priority/CreateForm";

// Priority props type
type Props = {
  toggler: () => void;
};

const CreatePriority = ({ toggler }: Props) => {
  return (
    <DefaultModal size="3xl" title="Create Priority" toggler={toggler}>

      {/* Priority Create Form */}
      <PriorityCreateForm toggler={toggler} />
    </DefaultModal>
  );
};

export default CreatePriority;
