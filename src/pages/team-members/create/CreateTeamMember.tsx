/*
 * Created by: Andrew
 * Date created: 10.02.2024
 * Modified by: Andrew
 * Last modified: 03.03.2024
 * Reviewed by:
 * Date Reviewed:
 */

import DefaultModal from "@/components/core/modal/DefaultModal";
import TeamMemberCreateForm from "@/components/team-member/CreateForm";

// team member props type
type Props = {
  toggler: () => void;
};

/**
 * @description Create Team Member component
 */
const CreateTeamMember = ({ toggler }: Props) => {
  return (
    <DefaultModal size="3xl" title="Add Member" toggler={toggler}>
      {/* TEAM MEMBER CREATE FORM */}
      <TeamMemberCreateForm toggler={toggler} />
    </DefaultModal>
  );
};

export default CreateTeamMember;
