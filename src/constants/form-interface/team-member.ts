export type TypeTeamMemberForm = {
  userAccountId: string;
  teamId: string;
  isTeamLead?: boolean;
};
export type TypeTeamMemberErrorForm = {
  userAccountId?: string;
  teamId?: string;
  isTeamLead?: boolean;
};
// form state
export const teamMeberInitialState = {
  userAccountId: "",
  teamId: "",
  isTeamLead: false,
};
