/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import Select from "@/components/core/form-elements/Select";
import { TypeIncidentEdit } from "@/constants/api-interface";
import { useReadTeamMemberByKeyQuery } from "@/features/member/member-api";
import { ChangeEvent } from "react";
import { TypeTicketErrorForm, TypeTicketForm } from "./useTicketForm";

type Props = {
  formState: TypeTicketForm;
  handleFormChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputError: TypeTicketErrorForm;
  teamId: string | null;
  isReadOnly: boolean;
  prevData: TypeIncidentEdit; // Adjust the type as per your data structure
};

const ExpartTeamLeaderForm = ({
  formState,
  handleFormChange,
  inputError,
  teamId,
  isReadOnly,
  prevData,
}: Props) => {
  const { data: teamMembers } = useReadTeamMemberByKeyQuery(teamId, {
    skip: !teamId,
    refetchOnMountOrArgChange: true,
  });

  const renderTeamMembersOptions = () => {
    return teamMembers?.data?.map((member) => (
      <option key={member?.oid} value={member?.userAccountId}>
        {`${member?.userAccountName ? member?.userAccountName : ""} ${
          member?.surName ? member?.surName : ""
        }`}
      </option>
    ));
  };  

  return (
    <>
      <Select
        label={prevData?.isReassigned ? "Reassign to" : "Assign to"}
        name="assignedTo"
        value={formState?.assignedTo}
        onChange={handleFormChange}
        errMsg={inputError?.assignedTo}
        disabled={isReadOnly}
      >
        {teamMembers?.isSuccess && renderTeamMembersOptions()}
      </Select>
    </>
  );
};

export default ExpartTeamLeaderForm;
