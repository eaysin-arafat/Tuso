/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import {
  FormSubmitEventType,
  OnchangeEventType,
} from "@/constants/interface/htmlEvents";
import { useUpdateMemberMutation } from "@/features/member/member-api";
import { useReadUserAccountByExpertQuery } from "@/features/user-accounts/user-accounts-api";
import useBaseDataEdit from "@/hooks/shared/useBaseDataEdit";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SaveAndBackButtons from "../core/buttons/SaveAndBackButtons";
import Checkbox from "../core/form-elements/Checkbox";
import Select from "../core/form-elements/Select";

// team member edit form props type
type Props = {
  toggler: () => void;
};

// team member form input type
type TypeTeamMemberForm = {
  userAccountId: string;
  teamId?: string;
  isTeamLead?: boolean;
};

// team member form error type
type TypeTeamMemberErrorForm = {
  userAccountId?: string;
  teamId?: string;
  isTeamLead?: boolean;
};

// initial form state
const initialState = {
  userAccountId: "",
  teamId: "",
  isTeamLead: false,
};

// Team member edit data type
interface MemberEditDataType {
  oid: number;
  userAccountId: number;
  teamId: number;
  dateCreated: string;
  createdBy?: number;
  dateModified?: string;
  modifiedBy?: number;
  isDeleted: boolean;
  isTeamLead: boolean;
  teamName?: string;
  userAccountName?: string;
}

/**
 * @description Team Member edit form component
 */
const TeamMemberEditForm = ({ toggler }: Props) => {
  // get selected edit modal
  const { data } = useSelector((state: RootState) => state.modal?.editModal);

  // modal data
  const modalData = data as unknown as MemberEditDataType;

  // base data for edit
  const [editBase] = useBaseDataEdit();

  // form state
  const [formState, setFormState] = useState<TypeTeamMemberForm>(initialState);

  // input error state
  const [inputError, setInputError] = useState<TypeTeamMemberErrorForm | null>(
    null
  );

  // get team id from url
  const { teamId } = useParams<{ teamId: string }>();

  // get expert team members
  const { data: expertTeamMembers } =
    useReadUserAccountByExpertQuery(undefined);

  // update team member mutation
  const [
    updateMember,
    { data: memberData, error, isError, isSuccess, status },
  ] = useUpdateMemberMutation();

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
      ...editBase,
      ...modalData,
      ...formState,
      teamId: Number(teamId),
      isTeamLead: formState?.isTeamLead,
      userAccountId: Number(formState?.userAccountId),
    };

    delete submitData?.teamName;
    delete submitData?.userAccountName;

    updateMember({ key: modalData?.oid, body: submitData });
  };

  // handle side effects after mutation
  useCreateSideEffects({
    error,
    isError,
    isSuccess,
    status,
    message: "team member",
    messageType: "update",
    response: memberData,
    setFormState,
    toggler,
    initialState,
    isToggle: true,
  });

  // set form state on modal data change
  React.useEffect(() => {
    if (modalData) {
      setFormState({
        userAccountId: String(modalData?.userAccountId),
        isTeamLead: modalData?.isTeamLead,
      });
    }
  }, [modalData]);

  return (
    <div>
      {/* FORM */}
      <form onSubmit={handleSubmit}>
        {/* MEMBER */}
        <div className="grid gap-4">
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
            disabled={modalData?.isTeamLead}
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

export default TeamMemberEditForm;

// Team member form validator
// eslint-disable-next-line react-refresh/only-export-components
export const teamValidator = (formState: TypeTeamMemberForm) => {
  const errors: TypeTeamMemberErrorForm = {};

  if (!formState?.userAccountId) errors.userAccountId = "Required";

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
