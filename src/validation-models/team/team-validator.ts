import {
  TypeTeamMemberErrorForm,
  TypeTeamMemberForm,
} from "@/constants/form-interface/team-member";

export const teamValidator = (formState: TypeTeamMemberForm) => {
  const errors: TypeTeamMemberErrorForm = {};

  if (!formState?.userAccountId) errors.userAccountId = "Required";

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
