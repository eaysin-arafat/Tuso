/*
 * Created by: Andrew
 * Date created: 10.02.2024
 * Modified by: Andrew
 * Last modified: 03.03.2024
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import SaveAndBackButtons from "@/components/core/buttons/SaveAndBackButtons";
import Password from "@/components/core/form-elements/Password";
import DefaultModal from "@/components/core/modal/DefaultModal";
import { RecoveryRequest } from "@/constants/api-interface";
import { useRecoveryPasswordMutation } from "@/features/auth/auth-api";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

// create recovery prop type
type Props = {
  toggler: () => void;
  refetch: () => void;
};

// recovery form data type
export interface RecoveryFormDataType {
  password: string;
  confirmPassword: string;
}

// initial recovery state
const recoveryInitialState = {
  password: "",
  confirmPassword: "",
};

/**
 * @description CreateRecovery component
 */
const CreateRecovery = ({ toggler, refetch }: Props) => {
  // get add modal data from redux store
  const { data } = useSelector((state: RootState) => state.modal?.addModal);

  // modal data
  const modalData = data as unknown as RecoveryRequest;

  // recovery form input state
  const [formState, setFormState] =
    React.useState<RecoveryFormDataType>(recoveryInitialState);

  // create recovery password mutation
  const [
    createRecoveryPassword,
    {
      data: recoveryPasswordRes,
      isError: isCreateError,
      isSuccess: isCreateSuccess,
      error: createError,
      status: createStatus,
    },
  ] = useRecoveryPasswordMutation();

  // recovery validation schema
  const schema = Joi.object({
    password: Joi.string().min(6).max(30).required().messages({
      "string.empty": "Required",
      "string.min": "Password should have a minimum length of 6",
      "string.max": "Password should have a maximum length of 30",
    }),
    confirmPassword: Joi.string().min(6).max(30).required().messages({
      "string.empty": "Required",
      "string.min": "Password should have a minimum length of 6",
      "string.max": "Password should have a maximum length of 30",
    }),
  });

  // use form hook
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<RecoveryFormDataType>({
    defaultValues: formState,
    resolver: joiResolver(schema),
  });

  // form submit handler
  const handleOnSubmit = (data: RecoveryFormDataType) => {
    if (data.password !== data.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }
    createRecoveryPassword({
      userAccountID: modalData?.userAccountId,
      password: data?.password,
      confirmPassword: data?.confirmPassword,
      requestID: modalData?.oid,
    });
  };

  // close and fetch data handler
  const closeAndFetch = () => {
    toggler();
    refetch();
  };

  // handle create side Effects
  useCreateSideEffects({
    error: createError,
    isError: isCreateError,
    isSuccess: isCreateSuccess,
    status: createStatus,
    message: "password",
    messageType: "create",
    response: recoveryPasswordRes,
    initialState: recoveryInitialState,
    isToggle: true,
    setFormState,
    toggler: closeAndFetch,
  });

  return (
    <DefaultModal size="3xl" title="Reset Password" toggler={toggler}>
      {/* FORM */}
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="grid gap-4">
          {/* PASSWORD */}
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Password
                label="New Password"
                placeholder="Create new password"
                required
                className="rounded-md"
                value={field.value}
                errMsg={errors?.password?.message as string | undefined}
                name={field.name}
                onChange={field.onChange}
              />
            )}
          />

          {/* CONFIRM PASSWORD */}
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <Password
                label="Confirm Password"
                placeholder="Confirm passowrd"
                required
                className="rounded-md"
                value={field.value}
                errMsg={errors?.confirmPassword?.message as string | undefined}
                name={field.name}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        {/* SAVE AND BACK BUTTONS */}
        <div className="mt-6 mb-2">
          <SaveAndBackButtons toggler={toggler} />
        </div>
      </form>
    </DefaultModal>
  );
};

export default CreateRecovery;
