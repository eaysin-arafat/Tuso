/*
 * Created by: Andrew
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import BodyBackground from "@/components/body-background/BodyBackground";
import Checkbox from "@/components/core/form-elements/Checkbox";
import InputUsername from "@/components/core/form-elements/InputUsername";
import Password from "@/components/core/form-elements/Password";
import Logo from "@/components/core/logo/Logo";
import RecoveryRequest from "@/components/recovery-request/RecoveryRequest";
import { SignInDataType } from "@/constants/interface";
import { recoveryModalTypes } from "@/constants/modal-types/modal-types";
import { useUserLoginMutation } from "@/features/auth/auth-api";
import { setCountries } from "@/features/client-form/client-form-slice";
import { useReadCountriesQuery } from "@/features/country/country-api";
import { closeAddModal, openAddModal } from "@/features/modal/modal-slice";
import { styles } from "@/utilities/cn";
import { isTrainingPortal } from "@/utilities/training";
import { joiResolver } from "@hookform/resolvers/joi";
import * as Joi from "joi";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { initialState } from "./constant";

/**
 * @description This is the user Sign in page
 */

const SignIn = () => {
  const dispatch = useDispatch();

  //User Login Mutation hook
  const [
    login,
    {
      data: logInRes,
      isError: isCreateError,
      isSuccess,
      error: createError,
      status: createStatus,
    },
  ] = useUserLoginMutation();

  // Error State
  const [credentialError, setCredentialError] = React.useState("");

  // Read Countries Data
  const { data: countriesCode } = useReadCountriesQuery();
  dispatch(setCountries(countriesCode));

  const { addModal } = useSelector((state: RootState) => state.modal);

  // Form Validator Schema
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required().messages({
      "string.empty": "Required",
      "string.min": "Username should have a minimum length of 3",
      "string.max": "Username should have a maximum length of 30",
      "string.base": "Username should be a type of",
      "string.required": "Required",
    }),
    password: Joi.string().min(6).max(30).required().messages({
      "string.empty": "Required",
      "string.min": "Password should have a minimum length of 6",
      "string.max": "Password should have a maximum length of 30",
    }),

    rememberMe: Joi.boolean(),
  });

  // Form Submit Handler
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInDataType>({
    defaultValues: initialState,
    resolver: joiResolver(schema),
  });

  const onsubmit: SubmitHandler<SignInDataType> = (data) => {
    login(data);
  };

  // Handle Open Recovery Modal
  const handleOpenRecoveryModal = () => {
    dispatch(
      openAddModal({
        modalId: recoveryModalTypes?.addRecovery,
        data: null,
      })
    );
  };

  // Modal Closer
  const closeModal = () => {
    dispatch(closeAddModal());
  };

  // Login SideEffects
  React.useEffect(() => {
    if (isSuccess && logInRes?.statusCode !== 200) {
      setCredentialError(logInRes?.message);
    }
  }, [isSuccess, logInRes]);

  React.useEffect(() => {
    if (isCreateError && createError && "data" in createError) {
      setCredentialError(
        typeof createError.data === "string"
          ? createError?.data
          : "Something went wrong."
      );
    } else if (isSuccess && logInRes?.statusCode !== 200) {
      setCredentialError(logInRes?.message);
    }
  }, [logInRes, isSuccess, isCreateError, createError, createStatus]);

  return (
    <>
      <BodyBackground>
        <div className="bg-whiteColor p-8 rounded-2xl 2xl:rounded-3xl w-full max-w-[480px] md:max-w-[520px] xl:w-[730px] 2xl:max-w-[700px] min-h-[450px] 2xl:min-h-[600px] xl:mt-2 2xl:mt-12 mx-2 md:mx-0 mt-12 md:mt-28 ">
          <div className="flex justify-center">
            {/* IHM Logo */}
            <Logo />
          </div>
          <div className="-translate-y-8">
            {/* Training Portal Message */}
            {isTrainingPortal && (
              <div className="text-redColor text-center text-sm mb-3 -mt-6">
                Training Portal
              </div>
            )}

            {/* TUSO Logo */}
            <div className="flex justify-center">
              <img
                src="images/logo/tuso.png"
                className={"h-9 2xl:h-12 tuso_logo"}
                alt="Logo"
              />
            </div>
            <p className="text-center mt-5 text-sm 2xl:text-base text-grayTextColor">
              SmartCare Systems Helpdesk
            </p>
          </div>
          <form onSubmit={handleSubmit(onsubmit)}>
            {/* ERROR MESSAGE */}
            {credentialError && (
              <div className="md:px-10 2xl:px-14 grid gap-4 2xl:gap-6 2xl:mt-3 mb-3">
                <div
                  role="alert"
                  className={styles(
                    "alert flex items-center justify-between text-dangerColor gap-1 py-2 bg-lightRedColor text-redColor rounded-md"
                  )}
                >
                  <div className="text-[10px] font-medium flex gap-1 items-center">
                    {credentialError}
                  </div>
                  <button
                    type="button"
                    onClick={() => setCredentialError("")}
                    className=""
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            )}

            <div className="md:px-10 2xl:px-14 grid gap-4 2xl:gap-6 2xl:mt-3">
              {/* Username */}
              <Controller
                control={control}
                name="username"
                render={({ field }) => (
                  <InputUsername
                    label="Username"
                    placeholder="Enter username"
                    className="rounded-md"
                    value={field.value}
                    errMsg={errors?.username?.message as string | undefined}
                    name={field.name}
                    onChange={field.onChange}
                  />
                )}
              />

              {/* Password */}
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <Password
                    label="Password"
                    className="rounded-md"
                    placeholder="Enter password"
                    value={field.value}
                    errMsg={errors?.password?.message as string | undefined}
                    name={field.name}
                    onChange={field.onChange}
                  />
                )}
              />

              <div className="flex justify-between">
                {/* Remember me */}
                <Controller
                  control={control}
                  name="rememberMe"
                  render={({ field }) => (
                    <Checkbox
                      label="Remember me"
                      labelClass="font-bold"
                      onChange={field.onChange}
                      name={field.name}
                      checked={field.value}
                    />
                  )}
                />

                {/* Forgot Password Button  */}
                <p
                  className="text-violetColor text-xs whitespace-nowrap font-bold cursor-pointer"
                  onClick={handleOpenRecoveryModal}
                >
                  Forgot Password
                </p>
              </div>

              {/* Log In Button  */}
              <button
                type="submit"
                className="login_btn mb-2 2xl:mt-10 2xl:mb-6"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </BodyBackground>

      {/* Recovery Request modal  */}
      {addModal?.modalId === recoveryModalTypes?.addRecovery && (
        <RecoveryRequest toggler={closeModal} />
      )}
    </>
  );
};

export default SignIn;
