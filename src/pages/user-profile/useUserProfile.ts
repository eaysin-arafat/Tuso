/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import { useReadProfilePictureByKeyQuery } from "@/features/profile-picture/profile-picture-api";
import { useUpdateUserAccountMutation } from "@/features/user-accounts/user-accounts-api";
import useBaseDataEdit from "@/hooks/shared/useBaseDataEdit";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import React, { ChangeEvent, useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { UserProfileFormType } from ".";

/**
 * @description User profile hook
 */
const useUserProfile = () => {
  // get logged in user data from redux
  const { user } = useSelector((state: RootState) => state.auth);

  // base data for edit records
  const [baseData] = useBaseDataEdit();

  // generate full name from user data
  const userFullName = `${user?.name} ${user.surname}`.split(" ");

  // get name and surname from user full name
  const name = userFullName.slice(0, -1).join(" ");
  const surname = userFullName[userFullName.length - 1];

  // read profile picture by key
  const { data: profileImage } = useReadProfilePictureByKeyQuery(user?.oid);

  // form state for user profile
  const [formState, setFormState] = React.useState<UserProfileFormType>({
    name: name,
    surname: surname,
    cellphone: user?.cellphone,
    email: user?.email,
    image: user?.image ? user?.image : "",
    countryCode: user?.countryCode,
  });

  // image base64 state
  const [imageBase64, setImageBase64] = React.useState<string>("");

  // update user account mutation
  const [updateUser, { data: userDataRes, error, isError, isSuccess, status }] =
    useUpdateUserAccountMutation();

  // form submit handler
  const handleOnSubmit = (data: UserProfileFormType) => {
    const payload = {
      key: Number(user?.oid),
      body: {
        ...baseData,
        ...user,
        ...data,
        image: imageBase64 ? imageBase64 : "",
        facilityId: user?.facilityId ? user?.facilityId : "0",
      },
    };

    updateUser(payload);
  };

  // image change handler
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];

    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader();
      reader?.readAsDataURL(file);
      reader.onload = () => {
        const base64WithogitutPrefix = (reader?.result as string)?.split(
          ","
        )[1];

        setImageBase64(base64WithogitutPrefix);
      };

      reader.onerror = (error) => {
        console.error(
          "Error occurred while converting image to base64:",
          error
        );
      };
    } else {
      toast.error("Please select a valid image file (JPEG or PNG)");
    }
  };

  // set image base64 on profile image change
  useEffect(() => {
    setImageBase64(profileImage?.data?.profilePictures);
  }, [profileImage?.data?.profilePictures]);

  // handle side effects on user profile update
  useCreateSideEffects({
    error,
    isError,
    isSuccess,
    status,
    message: "profile",
    messageType: "update",
    response: userDataRes,
    initialState: {
      name: name,
      surname: surname,
      cellphone: user?.cellphone,
      email: user?.email,
      isAccountActive: user?.isAccountActive,
      image: user?.image ? user?.image : "",
    },
    isToggle: false,
    setFormState,
  });

  return { formState, handleOnSubmit, handleImageChange, imageBase64, user };
};

export default useUserProfile;
