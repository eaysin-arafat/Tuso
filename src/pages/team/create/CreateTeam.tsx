/*
 * Created by: Andrew
 * Date created: 10.02.2024
 * Modified by: Andrew
 * Last modified: 03.03.2024
 * Reviewed by:
 * Date Reviewed:
 */

import DefaultModal from "@/components/core/modal/DefaultModal";
import TeamCreateForm from "@/components/team/CreateForm";

// team props type
type Props = {
  toggler: () => void;
};

/**
 * @description Create Team component
 */
const CreateTeam = ({ toggler }: Props) => {
  return (
    <DefaultModal size="3xl" title="Create Team" toggler={toggler}>
      {/* TEAM CREATE FORM */}
      <TeamCreateForm toggler={toggler} />
    </DefaultModal>
  );
};

export default CreateTeam;
