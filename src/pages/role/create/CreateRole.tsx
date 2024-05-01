/*
 * Created by: Andrew
 * Date created: 10.02.2024
 * Modified by: Andrew
 * Last modified: 03.03.2024
 * Reviewed by:
 * Date Reviewed:
 */

import DefaultModal from "@/components/core/modal/DefaultModal";

// prop types
type Props = {
  toggler: () => void;
};

/**
 * @description CreateRole component
 */
const CreateRole = ({ toggler }: Props) => {
  return (
    <DefaultModal size="3xl" title="Create Role" toggler={toggler}>
      {/* <FirstCategoryCreateForm toggler={toggler} /> */}
      Create Role
    </DefaultModal>
  );
};

export default CreateRole;
