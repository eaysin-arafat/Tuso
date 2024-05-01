/*
 * Created by: Andrew
 * Date created: 10.02.2024
 * Modified by: Andrew
 * Last modified: 03.03.2024
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
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
  useIsUniqueCellphoneQuery,
  useReadUserAccountByKeyQuery,
  useUpdateUserAccountMutation,
} from "@/features/user-accounts/user-accounts-api";
import useBaseDataEdit from "@/hooks/shared/useBaseDataEdit";
import useCloseModal from "@/hooks/shared/useCloseModal";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { userValidator } from "@/validation-models/user-accounts/create-user";
import React from "react";
import { useSelector } from "react-redux";

/**
 * @description Edit user custom hook
 */
const useEditUser = () => {
  // get modal state from redux
  const { editModal } = useSelector((state: RootState) => state.modal);

  // read user by key query
  const { data: userByKey } = useReadUserAccountByKeyQuery(
    String(editModal?.data?.oid),
    {
      skip: !String(editModal?.data?.oid),
      refetchOnMountOrArgChange: true,
    }
  );

  // previous user data
  const userPrevData = userByKey?.data;

  // user input form state
  const [formState, setFormState] = React.useState<UserCreateDataType>(
    userCreateInitialState
  );

  // select system state
  const [selectSystem, setSelectSystem] = React.useState([]);

  // province state
  const [provinceId, setProvinceId] = React.useState<string>(null);

  // district state
  const [districtId, setDistrictId] = React.useState<string>(null);

  // receive previous facilityId
  const [prevFacilityId, setPrevFacilityId] = React.useState("");

  // facility state
  const [facilityId, setFacilityId] = React.useState<string | null>(null);

  // facilities state
  const [facilities, setFacilities] = React.useState<Facility[]>([]);

  // input error state
  const [inputError, setInputError] =
    React.useState<UserCreateErrorType | null>({});

  // cellphone validation state
  const [isCellphoneValid, setIsCellphoneValid] = React.useState(true);

  // User modal toggler
  const { toggler } = useCloseModal();

  // base data for create user
  const [baseData] = useBaseDataEdit();

  // update user account mutation
  const [updateUser, { data: userRes, error, isError, isSuccess, status }] =
    useUpdateUserAccountMutation();

  /// check cellphone api hook
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

  // form submit handler
  const handleSubmit = (e: FormSubmitEventType) => {
    e.preventDefault();

    // validate user input data
    const { isValid, errors } = userValidator(
      Number(formState?.roleId),
      { districtId, facilityId, provinceId },
      formState,
      userPrevData
    );

    // if not valid upate the error state
    if (!isValid) {
      setInputError(errors);
      return;
    }

    // create user payload
    const payload = {
      ...baseData,
      ...formState,
      oid: userPrevData?.oid,
      deviceTypeId: formState?.deviceTypeId ? formState?.deviceTypeId : null,
      isAccountActive: true,
      cellphone: String(formState?.cellphone),
      roleId: Number(formState?.roleId),
      facilityId: facilityId ? Number(facilityId) : 0,
      systems: selectSystem,
    };

    if (formState?.roleId != "1") {
      delete payload.facilityId;
    }

    delete payload.districtId;
    delete payload.provinceId;

    // update user
    updateUser({
      key: Number(userPrevData?.oid),
      body: payload,
    });
  };

  // form change handler
  const handleFormChange = (e: OnchangeEventType) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setInputError((prev) => ({ ...prev, [name]: "" }));
  };

  // cellphone validation side effects
  React.useEffect(() => {
    const isPrevCellphoneMatch =
      userPrevData?.cellphone === formState?.cellphone;

    if (cellPhoneData?.isSuccess && !isPrevCellphoneMatch) {
      setIsCellphoneValid(false);
    } else {
      setIsCellphoneValid(true);
    }
  }, [formState?.cellphone, userPrevData?.cellphone, cellPhoneData?.isSuccess]);


  // update user form data on update user
  React.useEffect(() => {
    setFormState({
      name: userPrevData?.name,
      surname: userPrevData?.surname,
      email: String(userPrevData?.email),
      deviceTypeId: String(userPrevData?.deviceTypeId),
      roleId: String(userPrevData?.roleId),
      countryCode: userPrevData?.countryCode,
      cellphone: userPrevData?.cellphone,
      username: userPrevData?.username,
      districtId: String(userPrevData?.districtId),
      isAccountActive: userPrevData?.isAccountActive,
      provinceId: String(userPrevData?.provinceId),
      systems: selectSystem,
    });
    setDistrictId(userPrevData?.districtId);
    setFacilityId(String(userPrevData?.facilityId));
    setPrevFacilityId(String(userPrevData?.facilityId));
    setProvinceId(userPrevData?.provinceId);
    setSelectSystem(userPrevData?.systems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPrevData]);


  // handle side effect on user create
  useCreateSideEffects({
    error,
    isError,
    isSuccess,
    status,
    message: "user",
    messageType: "update",
    response: userRes,
    initialState: userCreateInitialState,
    isToggle: true,
    toggler,
    setFormState,
  });

  // edit modal close handler
  const { closeEditModal } = useCloseModal();

  return {
    handleFormChange,
    handleSubmit,
    toggler,
    inputError,
    setInputError,
    formState,
    setFormState,
    userPrevData,
    isCellphoneValid,
    selectSystem,
    setSelectSystem,
    handleProvinceChange,
    handleDistrictChange,
    provinceId,
    districtId,
    facilityId,
    setFacilityId,
    facilities,
    setFacilities,
    closeEditModal,
    prevFacilityId,
  };
};

export default useEditUser;
