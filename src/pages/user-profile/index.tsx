/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import CountryCode from "@/components/core/form-elements/CountryCode";
import Input from "@/components/core/form-elements/Input";
import PhoneNumber from "@/components/core/form-elements/PhoneNumber";
import Radio from "@/components/core/form-elements/Radio";
import { useReadCountriesQuery } from "@/features/country/country-api";
import { useIsUniqueCellphoneQuery } from "@/features/user-accounts/user-accounts-api";
import PageLayout from "@/layout/PageLayout";
import { userProfileValidator } from "@/validation-models/user-profile/user-profile";
import { joiResolver } from "@hookform/resolvers/joi";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { FaCamera, FaUser } from "react-icons/fa";
import { TfiSave } from "react-icons/tfi";
import useUserProfile from "./useUserProfile";

// user profile form type
export interface UserProfileFormType {
  name: string;
  surname: string;
  email: string;
  cellphone: string;
  image: string;
  countryCode: string;
}

/**
 * @description Component for displaying and editing user profile information.
 */
const UserProfile = () => {
  // user profile hook
  const { formState, handleImageChange, handleOnSubmit, imageBase64, user } =
    useUserProfile();

  // cell phone is exist state
  const [cellPhoneIsExist, setCellPhoneIsExist] = React.useState(true);

  // check country code state
  const [checkCountryCode, setCheckCountryCode] = React.useState("");

  // cell phone input state
  const [cellPhoneInput, setCellPhoneInput] = React.useState(user?.cellphone);

  // is unique cell phone query
  const { data: cellPhoneData } = useIsUniqueCellphoneQuery(
    { cellPhone: Number(cellPhoneInput), countryCode: formState?.countryCode },
    {
      skip: !cellPhoneInput,
      refetchOnMountOrArgChange: true,
    }
  );

  // read countries query
  const { data: countries } = useReadCountriesQuery();

  // form form hook
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<UserProfileFormType>({
    defaultValues: formState,
    resolver: joiResolver(userProfileValidator),
  });

  // Handle username input change
  const handleCellphoneChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setCellPhoneInput(value);
  };

  // check if cell phone is exist
  React.useEffect(() => {
    const isPrevCellphoneMatch = user?.cellphone === cellPhoneInput;
    const cellphoneValidator =
      !isPrevCellphoneMatch && cellPhoneData?.isSuccess;

    setCellPhoneIsExist(cellphoneValidator);
  }, [cellPhoneData, user, cellPhoneInput]);

  return (
    <PageLayout heading={{ title: "Profile" }}>
      {/* FORM */}
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div>
          <div className="flex flex-col md:flex-row items-start gap-5 md:gap-10 justify-between p-7">
            <div className="w-full grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
              {/* NAME */}
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <Input
                    label="Name"
                    value={field.value}
                    errMsg={errors?.name?.message as string | undefined}
                    name={field.name}
                    onChange={field.onChange}
                  />
                )}
              />

              {/* SURNAME */}
              <Controller
                control={control}
                name="surname"
                render={({ field }) => (
                  <Input
                    label="Surname"
                    value={field.value}
                    errMsg={errors?.surname?.message as string | undefined}
                    name={field.name}
                    onChange={field.onChange}
                  />
                )}
              />

              {/* EMAIL */}
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Input
                    label="Email Address"
                    type="email"
                    value={field.value}
                    errMsg={errors?.email?.message as string | undefined}
                    name={field.name}
                    onChange={field.onChange}
                  />
                )}
              />

              {/* COUNTRY CODE */}
              <div className="grid grid-cols-3 gap-3">
                <Controller
                  control={control}
                  name="countryCode"
                  render={({ field }) => (
                    <CountryCode
                      required
                      label="Country Code"
                      value={field.value}
                      resetCellPhone={() => {
                        setCellPhoneInput("");
                      }}
                      name={field.name}
                      onChange={(event) => {
                        field.onChange(event);
                        if (event.target.value === "+260") {
                          setCellPhoneInput("");
                        }
                        setCheckCountryCode(event.target.value);
                      }}
                      errMsg={
                        errors?.countryCode?.message as string | undefined
                      }
                      countries={countries?.data}
                    />
                  )}
                />

                {/* CELLPHONE */}
                <div className="col-span-2">
                  <Controller
                    control={control}
                    name="cellphone"
                    render={({ field }) => (
                      <PhoneNumber
                        required
                        countryCode={checkCountryCode}
                        label="Cellphone Number"
                        name={field.name}
                        errMsg={
                          (errors?.cellphone?.message as string | undefined) ||
                          (cellPhoneIsExist && "Cellphone is already exist.")
                        }
                        value={cellPhoneInput}
                        onChange={(event) => {
                          field.onChange(event);
                          handleCellphoneChange(event);
                        }}
                      />
                    )}
                  />
                </div>
              </div>

              {/* ACCOUNT STATUS */}
              <div className="col-span-full grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
                <div>
                  <p className="input_label">Account Status</p>
                  <Radio
                    label="Active"
                    value={
                      user?.isAccountActive === true ? "Active" : "Disable"
                    }
                    checked={user?.isAccountActive}
                    disabled={true}
                  />
                </div>
              </div>
            </div>

            {/* PROFILE PICTURE */}
            <div className="flex flex-col gap-2 md:justify-end">
              <p>Profile Picture</p>
              <div className="flex flex-col gap-3">
                <div className="h-44 w-44 max-h-[176px] max-w-[176px] rounded-lg border border-borderColor">
                  {imageBase64?.length ? (
                    <img
                      src={`data:image/png;base64,${imageBase64}`}
                      height={170}
                      width={170}
                      alt="profile"
                      className="object-cover h-full w-full rounded-lg"
                    />
                  ) : (
                    <div className="flex justify-center items-center text-borderColor h-full">
                      <FaUser size={120} className="w-full" />
                    </div>
                  )}
                </div>

                {/* IMAGE LABEL */}
                <div
                  className={`relative border border-violetColor rounded-md mt-1 hover:bg-borderColor`}
                >
                  <label
                    title="Click to upload"
                    htmlFor="fileInput"
                    className="cursor-pointer flex items-center gap-4 px-5 py-3 rounded-xl bg-whiteColor text-violetColor whitespace-nowrap font-semibold hover:bg-borderColor"
                  >
                    <FaCamera />
                    <p className="mt-0.5 block text-violetColor">
                      Change Photo
                    </p>
                  </label>

                  {/* IMAGE */}
                  <Controller
                    control={control}
                    name="image"
                    render={({ field }) => (
                      <input
                        title="Attach File"
                        className="w-fit mb-5 hidden"
                        name={field?.name}
                        onChange={(event) => {
                          field.onChange(event);
                          handleImageChange(event);
                        }}
                        type="file"
                        id="fileInput"
                        accept={".jpg,.png"}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="p-7 md:block flex justify-end">
            <button className="main_btn w-full sm:w-auto">
              <TfiSave size={11} /> Save Settings
            </button>
          </div>
        </div>
      </form>
    </PageLayout>
  );
};

export default UserProfile;
