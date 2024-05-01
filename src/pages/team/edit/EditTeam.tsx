/*
 * Created by: Andrew
 * Date created: 10.02.2024
 * Modified by: Andrew
 * Last modified: 03.03.2024
 * Reviewed by:
 * Date Reviewed:
 */

import DefaultModal from "@/components/core/modal/DefaultModal";
import TeamEditForm from "@/components/team/EditForm";

// team props type
type Props = {
  toggler: () => void;
};

/**
 * @description Edit Team component
 */
const EditTeam = ({ toggler }: Props) => {
  return (
    <DefaultModal size="3xl" title="Edit Team" toggler={toggler}>
      {/* TEAM EDIT FORM */}
      <TeamEditForm toggler={toggler} />
    </DefaultModal>
  );
};

export default EditTeam;
