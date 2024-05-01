/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import Select from "@/components/core/form-elements/Select";
import { Team, TypeIncidentEdit, User } from "@/constants/api-interface";
import { ChangeEvent } from "react";
import { TypeTicketErrorForm } from "./useTicketForm";

type Props = {
  handleTeamChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputError: TypeTicketErrorForm;
  teamId: string | null;
  isReadOnly: boolean;
  prevData: TypeIncidentEdit;
  user: User;
  teamsData: Team[];
};

const SupervisorTicketForm = ({
  teamId,
  handleTeamChange,
  inputError,
  isReadOnly,
  user,
  // prevData,
  teamsData,
}: Props) => {
  const renderTeamOptions = () => {
    return teamsData?.map((team) => (
      <option key={team?.oid} value={team?.oid}>
        {team?.title}
      </option>
    ));
  };

  return (
    <>
      <Select
        label={"Assign to team"}
        // label={prevData?.isReassigned ? "Reassign to team" : "Assign to team"}
        name="teamId"
        value={teamId}
        onChange={handleTeamChange}
        errMsg={inputError?.teamId}
        disabled={isReadOnly || user?.roleId === 4 || user?.isTeamLead}
        required={!(user?.roleId == 1 || user?.roleId == 2)}
      >
        {teamsData?.length && renderTeamOptions()}
      </Select>
    </>
  );
};

export default SupervisorTicketForm;
