/*
 * Created by: Andrew
 * Date created: 10.02.2024
 * Modified by: Andrew
 * Last modified: 03.03.2024
 * Reviewed by:
 * Date Reviewed:
 */

import { Facility } from "@/constants/api-interface/Facility";
import {
  UserCreateDataType,
  UserCreateErrorType,
  userCreateInitialState,
} from "@/constants/form-interface/user-account";
import {
  FormSubmitEventType,
  OnchangeEventType,
} from "@/constants/interface/htmlEvents";
import {
  useCreateUserAccountMutation,
  useIsUniqueCellphoneQuery,
  useIsUniqueUserNameQuery,
} from "@/features/user-accounts/user-accounts-api";
import useBaseDataCreate from "@/hooks/shared/useBaseDataCreate";
import useCloseModal from "@/hooks/shared/useCloseModal";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { userValidator } from "@/validation-models/user-accounts/create-user";
import React, { useState } from "react";

/**
 * @description Create user custom hook
 */
const useCreateUser = () => {
  // user input form state
  const [formState, setFormState] = React.useState<UserCreateDataType>(
    userCreateInitialState
  );

  // input error state
  const [inputError, setInputError] =
    React.useState<UserCreateErrorType | null>({});

  // province state
  const [provinceId, setProvinceId] = useState<string>("");

  // district state
  const [districtId, setDistrictId] = useState<string>("");

  // facility state
  const [facilityId, setFacilityId] = useState<string>("");

  // facilities state
  const [facilities, setFacilities] = useState<Facility[]>([]);

  // select system state
  const [selectSystem, setSelectSystem] = useState([]);

  // cellphone validation state
  const [isCellphoneValid, setIsCellphoneValid] = React.useState(true);

  // username validation state
  const [isUsernameValid, setIsUsernameValid] = React.useState(true);

  // modal toggler
  const { toggler } = useCloseModal();

  // base data for create user
  const [baseData] = useBaseDataCreate();

  // create user mutation
  const [createUser, { data: userRes, error, isError, isSuccess, status }] =
    useCreateUserAccountMutation();

  // check if username is unique
  const { data: usernameData } = useIsUniqueUserNameQuery(formState?.username, {
    skip: !formState?.username,
    refetchOnMountOrArgChange: true,
  });

  // check if cellphone is unique
  const { data: cellPhoneData } = useIsUniqueCellphoneQuery(
    {
      cellPhone: Number(formState?.cellphone),
      countryCode: formState?.countryCode,
    },
    {
      skip: !formState?.cellphone,
      refetchOnMountOrArgChange: true,
    }
  );

  // form submit handler
  const handleSubmit = (e: FormSubmitEventType) => {
    e.preventDefault();

    // validate user input
    const { isValid, errors } = userValidator(
      Number(formState?.roleId),
      {
        districtId,
        facilityId,
        provinceId,
      },
      formState
    );

    // if user input is not valid update the error state
    if (!isValid) {
      setInputError(errors);
      return;
    }

    // create user payload
    createUser({
      ...baseData,
      ...formState,
      isAccountActive: true,
      deviceTypeId: formState?.deviceTypeId ? formState?.deviceTypeId : null,
      roleId: Number(formState?.roleId),
      provinceId: +provinceId,
      districtId: +districtId,
      facilityId: formState?.roleId == "1" ? +facilityId : 0,
      systems: selectSystem,
    });
  };

  // province change handler
  const handleProvinceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProvinceId(e.target.value);
    setInputError((prev) => ({ ...prev, provinceId: "" }));
  };

  // district change handler
  const handleDistrictChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDistrictId(e.target.value);
    setInputError((prev) => ({ ...prev, districtId: "" }));
  };

  // form input change handler
  const handleFormChange = (e: OnchangeEventType) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setInputError((prev) => ({ ...prev, [name]: "" }));
  };

  // check if cellphone is valid
  React.useEffect(() => {
    if (cellPhoneData?.isSuccess) {
      setIsCellphoneValid(false);
    } else {
      setIsCellphoneValid(true);
    }
  }, [cellPhoneData?.isSuccess]);

  // check if username is valid
  React.useEffect(() => {
    if (usernameData?.isSuccess) {
      return setIsUsernameValid(false);
    }
    return setIsUsernameValid(true);
  }, [usernameData]);

  // handle side effects on user create
  useCreateSideEffects({
    error,
    isError,
    isSuccess,
    status,
    message: "user",
    messageType: "create",
    response: userRes,
    initialState: userCreateInitialState,
    isToggle: true,
    toggler,
    setFormState,
  });

  return {
    handleFormChange,
    handleSubmit,
    toggler,
    inputError,
    formState,
    setFormState,
    districtId,
    provinceId,
    handleProvinceChange,
    handleDistrictChange,
    isCellphoneValid,
    isUsernameValid,
    setInputError,
    selectSystem,
    setSelectSystem,
    facilities,
    setFacilities,
    facilityId,
    setFacilityId,
  };
};

export default useCreateUser;
