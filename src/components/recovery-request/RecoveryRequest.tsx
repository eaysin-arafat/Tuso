/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import DefaultModal from "@/components/core/modal/DefaultModal";
import { useReadCountriesQuery } from "@/features/country/country-api";
import { useCreateRecoveryRequestMutation } from "@/features/recovery-request/recovery-request";
import useBaseDataCreate from "@/hooks/shared/useBaseDataCreate";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { TfiSave } from "react-icons/tfi";
import SaveAndBackButtons from "../core/buttons/SaveAndBackButtons";
import CountryCode from "../core/form-elements/CountryCode";
import Input from "../core/form-elements/Input";
import PhoneNumber from "../core/form-elements/PhoneNumber";

// forgot password form type
export interface ForgotPasswordFormType {
  cellPhone: string;
  userName: string;
  countryCode: string;
}

/**
 * @description Recovery Request component
 */
const RecoveryRequest = ({ toggler }: { toggler: () => void }) => {
  // base data for create
  const [baseData] = useBaseDataCreate();

  // use form hook
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    resetField,
  } = useForm<ForgotPasswordFormType>({
    defaultValues: {
      cellPhone: "",
      userName: "",
      countryCode: "",
    },
  });

  // create recovery request mutation
  const [
    createRecoveryRequest,
    { data: recoveryRes, isError, isSuccess, error, status },
  ] = useCreateRecoveryRequestMutation();

  // get countries
  const { data: countries } = useReadCountriesQuery();

  // form submit handler
  const onSubmit = (data: ForgotPasswordFormType) => {
    if (!data?.userName && !data?.cellPhone) {
      toast.error("Please provide either username or cellphone.");
      return;
    }
    if (data.cellPhone && !data.countryCode) {
      toast.error("Please provide CountryCode.");
      return;
    }

    createRecoveryRequest({
      ...baseData,
      ...data,
    });
  };

  // side effect for create recovery request
  useCreateSideEffects({
    error,
    isError,
    isSuccess,
    status,
    message: "team",
    messageType: "update",
    response: recoveryRes,
    isToggle: true,
    toggler,
  });

  return (
    // MODAL
    <DefaultModal
      title="Login Recovery Request"
      size="2xl"
      toggler={toggler}
      childrenStyle="px-5 !pt-1 !pb-5"
    >
      {/* FORM */}
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <h5 className="mb-2">
          Please provide either username or your cellphone to recover your login
        </h5>

        {/* user name */}
        <div className="grid gap-3">
          <Controller
            control={control}
            name="userName"
            render={({ field }) => (
              <Input
                required
                label="Username"
                placeholder="Enter username"
                className="rounded-md"
                value={field.value}
                errMsg={errors?.userName?.message as string | undefined}
                name={field.name}
                onChange={field.onChange}
              />
            )}
          />

          {/* country code */}
          <div className="grid grid-cols-3 gap-3">
            <Controller
              control={control}
              name="countryCode"
              render={({ field }) => (
                <CountryCode
                  name="callerCountryCode"
                  value={field.value}
                  onChange={field.onChange}
                  resetCellPhone={() => resetField("cellPhone")}
                  label="Country Code"
                  errMsg={errors?.countryCode?.message as string | undefined}
                  countries={countries}
                />
              )}
            />

            {/* cell phone */}
            <div className="col-span-2">
              <Controller
                control={control}
                name="cellPhone"
                render={({ field }) => (
                  <PhoneNumber
                    required
                    countryCode={getValues().countryCode}
                    label="Cellphone Number"
                    name={field.name}
                    errMsg={errors?.cellPhone?.message as string | undefined}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
        </div>

        {/* SAVE AND BACK BUTTONS */}
        <div className="flex gap-5 mt-4">
          <SaveAndBackButtons
            backBtnText="Back"
            submitBtnText="Submit"
            toggler={toggler}
            saveIcon={<TfiSave />}
          />
        </div>
      </form>
    </DefaultModal>
  );
};

export default RecoveryRequest;
