/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import facilityEnums from "@/constants/enum/Facility";
import {
  FormSubmitEventType,
  OnchangeEventType,
} from "@/constants/interface/htmlEvents";
import { useCreateFacilityMutation } from "@/features/facility/facility-api";
import useBaseDataCreate from "@/hooks/shared/useBaseDataCreate";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SaveAndBackButtons from "../core/buttons/SaveAndBackButtons";
import Input from "../core/form-elements/Input";
import Select from "../core/form-elements/Select";
import DataRow from "../core/table/DataRow";

// props types
type Props = {
  toggler: () => void;
};

// facility type
type TypeFacilityForm = {
  facilityName: string;
  countryId: string;
  provinceId: string;
  districtId: string;
  facilityMasterCode: string;
  hmisCode: string;
  longitude: string;
  latitude: string;
  location: string;
  facilityType: string;
  ownership: string;
  isPrivate: string;
};

// facility error type
type TypeFacilityErrorForm = {
  facilityName?: string;
  districtId?: string;
  facilityMasterCode?: string;
  hmisCode?: string;
  longitude?: string;
  latitude?: string;
  location?: string;
  facilityType?: string;
  ownership?: string;
  isPrivate?: string;
};

// Facility create form
const FacilityCreateForm = ({ toggler }: Props) => {
  // Get data from redux store
  const { data } = useSelector((state: RootState) => state.modal?.addModal);

  // Get base data
  const [baseData] = useBaseDataCreate();

  // Get country id from url params
  const { countryId } = useParams<{ countryId: string }>();

  // Get province id from url params
  const { provinceId } = useParams<{ provinceId: string }>();

  // Get district id from url params
  const { districtId } = useParams<{ districtId: string }>();

  // Initial state
  const initialState = {
    facilityName: "",
    countryId: String(countryId),
    provinceId: String(provinceId),
    districtId: String(districtId),
    facilityMasterCode: "",
    hmisCode: "",
    longitude: "",
    latitude: "",
    location: "",
    facilityType: "",
    ownership: "",
    isPrivate: "false",
  };

  // form state
  const [formState, setFormState] = useState<TypeFacilityForm>(initialState);

  // input error state
  const [inputError, setInputError] = useState<TypeFacilityErrorForm | null>(
    null
  );

  // Create facility mutation
  const [
    createFacility,
    { data: facilityData, error, isError, isSuccess, status },
  ] = useCreateFacilityMutation();

  // form input change handler
  const handleFormChange = (e: OnchangeEventType) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setInputError((prev) => ({ ...prev, [name]: "" }));
  };

  // form submit handler
  const handleSubmit = (e: FormSubmitEventType) => {
    e.preventDefault();

    const { isValid, errors } = facilityValidator({
      ...formState,
    });
    if (!isValid) {
      setInputError(errors);
      return;
    }

    const submitData = {
      ...baseData,
      ...formState,
      facilityType: Number(formState?.facilityType),
      ownership: Number(formState?.ownership),
      location: Number(formState?.location),
      provinceId: Number(provinceId),
      countryId: Number(countryId),
      districtId: Number(districtId),
      isPrivate: Boolean(formState?.isPrivate),
    };

    createFacility(submitData);
  };

  // Side effects
  useCreateSideEffects({
    error,
    isError,
    isSuccess,
    status,
    message: "facility",
    messageType: "create",
    response: facilityData,
    initialState,
    isToggle: true,
    setFormState,
    toggler,
  });

  // Render object enum options
  const renderObjEnumOptions = (obj: { [key: number]: string }) => {
    const array = Object.keys(obj)?.map((desc: string) => ({
      oid: parseInt(desc),
      description: obj[parseInt(desc)],
    }));
    return array?.map((item) => (
      <option key={item?.oid} value={item?.oid}>
        {item?.description}
      </option>
    ));
  };

  return (
    <div>
      {/* COUNTRY NAME */}
      <DataRow title="Country Name" data={data?.countryName} />

      {/* PROVINCE NAME */}
      <DataRow title="Province Name" data={data?.provinceName} />

      {/* DISTRICT NAME */}
      <DataRow
        title="District Name"
        data={data?.districtName}
        className="mb-3"
      />

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-4">
          {/* FACILITY NAME */}
          <Input
            label="Facility Name"
            required
            name="facilityName"
            value={formState?.facilityName}
            onChange={handleFormChange}
            errMsg={inputError?.facilityName}
          />

          {/* FACILITY MASTER CODE */}
          <Input
            label="Facility Master Code"
            required
            name="facilityMasterCode"
            value={formState?.facilityMasterCode}
            onChange={handleFormChange}
            errMsg={inputError?.facilityMasterCode}
          />

          {/* LONGITUDE */}
          <Input
            label="Longitude"
            required
            name="longitude"
            value={formState?.longitude}
            onChange={handleFormChange}
            errMsg={inputError?.longitude}
          />

          {/* LATITUDE */}
          <Input
            label="latitude"
            required
            name="latitude"
            value={formState?.latitude}
            onChange={handleFormChange}
            errMsg={inputError?.latitude}
          />

          {/* HMIS CODE */}
          <Input
            label="HMIS Code"
            required
            name="hmisCode"
            value={formState?.hmisCode}
            onChange={handleFormChange}
            errMsg={inputError?.hmisCode}
          />

          {/* LOCATION */}
          <Select
            label="Location"
            required
            name="location"
            value={formState?.location}
            onChange={handleFormChange}
            errMsg={inputError?.location}
          >
            {renderObjEnumOptions(facilityEnums.location)}
          </Select>

          {/* FACILITY TYPE */}
          <Select
            label="Facility Type"
            required
            name="facilityType"
            value={formState?.facilityType}
            onChange={handleFormChange}
            errMsg={inputError?.facilityType}
          >
            {renderObjEnumOptions(facilityEnums.facilityType)}
          </Select>

          {/* OWNERSHIP */}
          <Select
            label="Ownership"
            required
            name="ownership"
            value={formState?.ownership}
            onChange={handleFormChange}
            errMsg={inputError?.ownership}
          >
            {renderObjEnumOptions(facilityEnums.ownership)}
          </Select>

          {/* IS PRIVATE */}
          <div className="col-span-full">
            <Select
              label="Is Private"
              required
              name="isPrivate"
              value={formState?.isPrivate}
              onChange={handleFormChange}
              errMsg={inputError?.isPrivate}
            >
              <option value={"false"}>No</option>
              <option value={"true"}>Yes</option>
            </Select>
          </div>
        </div>

        {/* SAVE AND BACK BUTTONS */}
        <div className="mt-6">
          <SaveAndBackButtons toggler={toggler} />
        </div>
      </form>
    </div>
  );
};

export default FacilityCreateForm;

// Country form validator
// eslint-disable-next-line react-refresh/only-export-components
export const facilityValidator = (formState: TypeFacilityForm) => {
  const errors: TypeFacilityErrorForm = {};

  if (!formState?.facilityName) errors.facilityName = "Required";
  if (!formState?.facilityMasterCode) errors.facilityMasterCode = "Required";
  if (!formState?.longitude) errors.longitude = "Required";
  if (!formState?.latitude) errors.latitude = "Required";
  if (!formState?.hmisCode) errors.hmisCode = "Required";
  if (!formState?.location) errors.location = "Required";
  if (!formState?.facilityType) errors.facilityType = "Required";
  if (!formState?.ownership) errors.ownership = "Required";

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
