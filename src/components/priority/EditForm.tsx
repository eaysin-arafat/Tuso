/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import { IncidentPriority } from "@/constants/api-interface";
import {
  FormSubmitEventType,
  OnchangeEventType,
} from "@/constants/interface/htmlEvents";
import { useUpdateIncidentPriorityMutation } from "@/features/incident-priority/incident-priority-api";
import useBaseDataEdit from "@/hooks/shared/useBaseDataEdit";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import SaveAndBackButtons from "../core/buttons/SaveAndBackButtons";
import Input from "../core/form-elements/Input";

// form props type
type Props = {
  toggler: () => void;
};

// priority form input type
type TypePriorityForm = {
  priority: string;
};

// priority form error type
type TypePriorityErrorForm = {
  priority?: string;
};

// form state
const initialState = {
  priority: "",
};

/**
 * @description Priority edit form component
 */
const PriorityEditForm = ({ toggler }: Props) => {
  // get selected edit modal
  const { data } = useSelector((state: RootState) => state.modal?.editModal);

  // priority data
  const modalData = data as unknown as IncidentPriority;

  // base data for edit
  const [baseData] = useBaseDataEdit();

  // form state
  const [formState, setFormState] = useState<TypePriorityForm>(initialState);

  // form input error state
  const [inputError, setInputError] = useState<TypePriorityErrorForm | null>(
    null
  );

  // update priority mutation
  const [
    updateIncidentPriority,
    { data: incidentPriorityData, status, isError, error, isSuccess },
  ] = useUpdateIncidentPriorityMutation();

  // form input change handler
  const handleFormChange = (e: OnchangeEventType) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setInputError((prev) => ({ ...prev, [name]: "" }));
  };

  // form submit handler
  const handleSubmit = (e: FormSubmitEventType) => {
    e.preventDefault();

    const { isValid, errors } = priorityValidator({
      ...formState,
    });
    if (!isValid) {
      setInputError(errors);
      return;
    }

    const submitData = {
      ...baseData,
      ...modalData,
      ...formState,
    };

    updateIncidentPriority({ key: String(modalData?.oid), body: submitData });
  };

  // handle create priority side effects
  useCreateSideEffects({
    error,
    isError,
    isSuccess,
    status,
    message: "priority",
    messageType: "update",
    response: incidentPriorityData,
    initialState,
    isToggle: true,
    toggler,
    setFormState,
  });

  // set form state
  React.useEffect(() => {
    if (modalData) {
      setFormState({
        priority: modalData?.priority,
      });
    }
  }, [modalData]);

  return (
    <div>
      {/* FORM */}
      <form onSubmit={handleSubmit}>
        {/* PRIORITY NAME */}
        <div className="grid gap-4">
          <Input
            label="Priority Name"
            required
            name="priority"
            value={formState?.priority}
            errMsg={inputError?.priority}
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

export default PriorityEditForm;

// priority form validator
// eslint-disable-next-line react-refresh/only-export-components
export const priorityValidator = (formState: TypePriorityForm) => {
  const errors: TypePriorityErrorForm = {};

  if (!formState?.priority) errors.priority = "Required";

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
