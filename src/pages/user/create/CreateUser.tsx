/*
 * Created by: Andrew
 * Date created: 10.02.2024
 * Modified by: Andrew
 * Last modified: 03.03.2024
 * Reviewed by:
 * Date Reviewed:
 */

import DefaultModal from "@/components/core/modal/DefaultModal";
import CreateUserForm from "@/components/user/user-form/Index";
import useCreateUser from "@/pages/user/create/useCreate";

/**
 * @description Create User component
 */
const CreateUser = () => {
  const {
    toggler,
    handleFormChange,
    handleSubmit,
    inputError,
    formState,
    setFormState,
    isCellphoneValid,
    isUsernameValid,
    selectSystem,
    setSelectSystem,
    districtId,
    handleDistrictChange,
    handleProvinceChange,
    provinceId,
    setInputError,
    facilities,
    setFacilities,
    facilityId,
    setFacilityId,
  } = useCreateUser();

  return (
    <DefaultModal title="Add User" toggler={toggler}>
      {/* CREATE USER FORM */}
      <CreateUserForm
        formState={formState}
        setFormState={setFormState}
        handleSubmit={handleSubmit}
        selectSystem={selectSystem}
        setSelectSystem={setSelectSystem}
        inputError={inputError}
        toggler={toggler}
        handleFormChange={handleFormChange}
        districtId={districtId}
        handleDistrictChange={handleDistrictChange}
        handleProvinceChange={handleProvinceChange}
        provinceId={provinceId}
        isEdit={false}
        isCellphoneValid={isCellphoneValid}
        isUsernameValid={isUsernameValid}
        setInputError={setInputError}
        facilityId={facilityId}
        setFacilityId={setFacilityId}
        facilities={facilities}
        setFacilities={setFacilities}
      />
    </DefaultModal>
  );
};

export default CreateUser;
