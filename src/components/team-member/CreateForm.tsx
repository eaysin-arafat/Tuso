/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import {
  TypeTeamMemberErrorForm,
  TypeTeamMemberForm,
  teamMeberInitialState,
} from "@/constants/form-interface/team-member";
import {
  FormSubmitEventType,
  OnchangeEventType,
} from "@/constants/interface/htmlEvents";
import { useCreateMemberMutation } from "@/features/member/member-api";
import { useReadUserAccountByExpertQuery } from "@/features/user-accounts/user-accounts-api";
import useBaseDataCreate from "@/hooks/shared/useBaseDataCreate";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { useState } from "react";
import { useParams } from "react-router-dom";
import SaveAndBackButtons from "../core/buttons/SaveAndBackButtons";
import Checkbox from "../core/form-elements/Checkbox";
import Select from "../core/form-elements/Select";
import { teamValidator } from "./EditForm";

// create team member form props type
type Props = {
  toggler: () => void;
};

/**
 * @description Team Member create form component
 */
const TeamMemberCreateForm = ({ toggler }: Props) => {
  // base data for create
  const [baseData] = useBaseDataCreate();

  // form state
  const [formState, setFormState] = useState<TypeTeamMemberForm>(
    teamMeberInitialState
  );

  // form input error state
  const [inputError, setInputError] = useState<TypeTeamMemberErrorForm | null>(
    null
  );

  // get team id from url params
  const { teamId } = useParams<{ teamId: string }>();

  // get expert team members
  const { data: expertTeamMembers } =
    useReadUserAccountByExpertQuery(undefined);

  // create team member mutation
  const [
    createMember,
    { data: memberData, error, isError, isSuccess, status },
  ] = useCreateMemberMutation();

  // form input change handler
  const handleFormChange = (e: OnchangeEventType) => {
    const { name, value, type } = e.target;

    if (type == "checkbox") {
      const isChecked = (e.target as HTMLInputElement).checked;

      setFormState((prev) => ({ ...prev, [name]: isChecked }));
      return;
    }
    setFormState((prev) => ({ ...prev, [name]: value }));
    setInputError((prev) => ({ ...prev, [name]: "" }));
  };

  // form submit handler
  const handleSubmit = (e: FormSubmitEventType) => {
    e.preventDefault();

    const { isValid, errors } = teamValidator({
      ...formState,
    });
    if (!isValid) {
      setInputError(errors);
      return;
    }

    const submitData = {
      ...baseData,
      ...formState,
      teamId: Number(teamId),
      isTeamLead: formState?.isTeamLead,
      userAccountId: Number(formState?.userAccountId),
    };

    createMember(submitData);
  };

  // handle side effects of create team member
  useCreateSideEffects({
    error,
    isError,
    isSuccess,
    status,
    message: "team member",
    messageType: "create",
    response: memberData,
    setFormState,
    toggler,
    initialState: teamMeberInitialState,
    isToggle: true,
  });

  return (
    <div>
      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          {/* MEMBER */}
          <Select
            label="Member"
            required
            onChange={handleFormChange}
            name="userAccountId"
            value={formState?.userAccountId}
            errMsg={inputError?.userAccountId}
            className="capitalize"
          >
            {expertTeamMembers?.data?.length &&
              expertTeamMembers?.data?.map((user) => (
                <option
                  key={user?.oid}
                  value={user?.oid}
                  className="capitalize"
                >
                  {user?.name} {user?.surname}
                </option>
              ))}
          </Select>

          {/* TEAM LEADER */}
          <Checkbox
            label="Team Leader"
            name="isTeamLead"
            checked={formState.isTeamLead}
            onChange={handleFormChange}
          />
        </div>

        {/* SAVE AND BACK BUTTON */}
        <div className="mt-6">
          <SaveAndBackButtons toggler={toggler} />
        </div>
      </form>
    </div>
  );
};

export default TeamMemberCreateForm;
