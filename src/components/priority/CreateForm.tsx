/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import {
  FormSubmitEventType,
  OnchangeEventType,
} from "@/constants/interface/htmlEvents";
import { useCreateIncidentPriorityMutation } from "@/features/incident-priority/incident-priority-api";
import useBaseDataCreate from "@/hooks/shared/useBaseDataCreate";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { useState } from "react";
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

// initial form state
const initialState = {
  priority: "",
};

/**
 * @description Priority create form component
 */
const PriorityCreateForm = ({ toggler }: Props) => {
  // base data for create
  const [baseData] = useBaseDataCreate();

  // form state
  const [formState, setFormState] = useState<TypePriorityForm>(initialState);

  // form input error state
  const [inputError, setInputError] = useState<TypePriorityErrorForm | null>(
    null
  );

  // create priority mutation
  const [
    createIncidentPriority,
    { data: incidentPriority, status, isError, error, isSuccess },
  ] = useCreateIncidentPriorityMutation();

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
      ...formState,
    };

    createIncidentPriority(submitData);
  };

  // handle priority create side effects
  useCreateSideEffects({
    error,
    isError,
    isSuccess,
    status,
    message: "user",
    messageType: "create",
    response: incidentPriority,
    initialState,
    isToggle: true,
    toggler,
    setFormState,
  });

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

        {/* SAVE AND BACK BUTTONS */}
        <div className="mt-6">
          <SaveAndBackButtons toggler={toggler} />
        </div>
      </form>
    </div>
  );
};

export default PriorityCreateForm;

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
