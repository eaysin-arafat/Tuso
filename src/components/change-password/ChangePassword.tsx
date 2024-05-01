/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import Password from "@/components/core/form-elements/Password";
import DefaultModal from "@/components/core/modal/DefaultModal";
import { useChangedPasswordMutation } from "@/features/auth/auth-api";
import { logout } from "@/features/auth/auth-slice";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { cookieManager } from "@/utilities/cookie-manager";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoArrowBackSharp } from "react-icons/io5";
import { TfiSave } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";

// Change Password Form Data Type
interface ChangePassFormDataType {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

// Initial State
const initialState = {
  password: "",
  newPassword: "",
  confirmPassword: "",
};

/**
 * @description Change Password Component
 */
const ChangePassword = ({ toggler }: { toggler: () => void }) => {
  // Get user from the store
  const { user } = useSelector((state: RootState) => state.auth);

  // action dispatcher
  const dispatch = useDispatch();

  // Form State
  const [formState, setFormState] =
    React.useState<ChangePassFormDataType>(initialState);

  // validation schema
  const schema = Joi.object({
    password: Joi.string().min(6).max(30).required().messages({
      "string.empty": "Required",
      "string.min": "Password should have a minimum length of 6",
      "string.max": "Password should have a maximum length of 30",
    }),
    newPassword: Joi.string().min(6).max(30).required().messages({
      "string.empty": "Required",
      "string.min": "Password should have a minimum length of 6",
      "string.max": "Password should have a maximum length of 30",
    }),
    confirmPassword: Joi.string().min(6).max(30).required().messages({
      "string.empty": "Required",
      "string.min": "Password should have a minimum length of 6",
      "string.max": "Password should have a maximum length of 30",
    }),

    rememberMe: Joi.boolean(),
  });

  // form control hook for form validation
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ChangePassFormDataType>({
    defaultValues: formState,
    resolver: joiResolver(schema),
  });

  // change password mutation
  const [
    changePassword,
    { data: changePassData, status, isError, error, isSuccess },
  ] = useChangedPasswordMutation();

  // handle logout
  const handleLogout = () => {
    toggler();
    cookieManager.removeCookie("tuso_accessToken");
    cookieManager.removeCookie("tuso_refreshToken");
    dispatch(logout());
  };

  // handle form submit
  const onSubmit: SubmitHandler<ChangePassFormDataType> = (data) => {
    if (data?.newPassword !== data?.confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }
    changePassword({
      userName: user?.username,
      password: data?.password,
      newPassword: data?.newPassword,
      confirmPassword: data?.confirmPassword,
    });
  };

  // handle side effects
  useCreateSideEffects({
    error,
    isError,
    isSuccess,
    status,
    message: "Change Password",
    messageType: "create",
    response: changePassData,
    initialState,
    isToggle: true,
    setFormState,
    toggler: handleLogout,
  });

  return (
    <DefaultModal title="Change your Password" size="3xl" toggler={toggler}>
      {/* CHANGE PASSWORD FORM */}
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-3 gap-5">
          {/* CURRENT PASSWORD */}
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Password
                label="Current Password"
                placeholder="Enter Current Password"
                className="rounded-md"
                value={field.value}
                errMsg={errors?.password?.message as string | undefined}
                name={field.name}
                onChange={field.onChange}
              />
            )}
          />

          {/* NEW PASSWORD */}
          <Controller
            control={control}
            name="newPassword"
            render={({ field }) => (
              <Password
                label="New Password"
                className="rounded-md"
                placeholder="Enter New Password"
                value={field.value}
                errMsg={errors?.newPassword?.message as string | undefined}
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
                className="rounded-md"
                placeholder="Enter Confirm Password"
                value={field.value}
                errMsg={errors?.confirmPassword?.message as string | undefined}
                name={field.name}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        {/* BUTTON */}
        <div className="flex gap-5 mt-4">
          <button className="main_btn">
            <TfiSave size={16} /> Save
          </button>
          <button className="outline_btn" onClick={toggler}>
            <IoArrowBackSharp size={18} /> Back
          </button>
        </div>
      </form>
    </DefaultModal>
  );
};

export default ChangePassword;
