/*
 * Created by: Andrew
 * Date created: 10.02.2024
 * Modified by: Andrew
 * Last modified: 03.03.2024
 * Reviewed by:
 * Date Reviewed:
 */

import DefaultModal from "@/components/core/modal/DefaultModal";
import TeamMemberEditForm from "@/components/team-member/EditForm";

// team member props type
type Props = {
  toggler: () => void;
};

/**
 * @description Edit Team Member component
 */
const EditTeamMember = ({ toggler }: Props) => {
  return (
    <DefaultModal size="3xl" title="Edit Member" toggler={toggler}>
      {/* TEAM MEMBER EDIT FORM */}
      <TeamMemberEditForm toggler={toggler} />
    </DefaultModal>
  );
};

export default EditTeamMember;
