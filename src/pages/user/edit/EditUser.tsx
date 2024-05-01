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
import useEditUser from "./useEdit";

/**
 * @description Edit User component
 */
const EditUser = () => {
  const {
    closeEditModal,
    districtId,
    facilities,
    facilityId,
    formState,
    handleDistrictChange,
    handleFormChange,
    handleProvinceChange,
    handleSubmit,
    inputError,
    isCellphoneValid,
    prevFacilityId,
    provinceId,
    selectSystem,
    setFacilities,
    setFacilityId,
    setFormState,
    setInputError,
    setSelectSystem,
    toggler,
  } = useEditUser();

  return (
    <DefaultModal title="Edit User" toggler={closeEditModal}>
      {/* CREATE USER FORM */}
      <CreateUserForm
        isEdit={true}
        formState={formState}
        setFormState={setFormState}
        handleSubmit={handleSubmit}
        selectSystem={selectSystem}
        setSelectSystem={setSelectSystem}
        inputError={inputError}
        toggler={toggler}
        handleFormChange={handleFormChange}
        districtId={districtId}
        facilityId={facilityId}
        setFacilityId={setFacilityId}
        handleDistrictChange={handleDistrictChange}
        handleProvinceChange={handleProvinceChange}
        provinceId={provinceId}
        isCellphoneValid={isCellphoneValid}
        setInputError={setInputError}
        facilities={facilities}
        setFacilities={setFacilities}
        prevFacilityId={prevFacilityId}
      />
    </DefaultModal>
  );
};

export default EditUser;
