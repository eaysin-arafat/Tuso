/*
 * Created by: Andrew
 * Date created: 10.11.2023
 * Modified by: Andrew
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import SaveAndBackButtons from "@/components/core/buttons/SaveAndBackButtons";
import CountryCode from "@/components/core/form-elements/CountryCode";
import CustomSelectInput from "@/components/core/form-elements/CustomSelectInput";
import FacilityScrollSearch from "@/components/core/form-elements/Infinity-scroll-search/Index";
import Input from "@/components/core/form-elements/Input";
import Password from "@/components/core/form-elements/Password";
import PhoneNumber from "@/components/core/form-elements/PhoneNumber";
import Select from "@/components/core/form-elements/Select";
import FormSkeleton from "@/components/core/loader/FormSkeleton";
import { Facility } from "@/constants/api-interface/Facility";
import {
  UserCreateDataType,
  UserCreateErrorType,
} from "@/constants/form-interface/user-account";
import { useReadCountriesQuery } from "@/features/country/country-api";
import { useReadDeviceTypesQuery } from "@/features/device-type/device-type-api";
import { useReadDistrictByProvinceQuery } from "@/features/district/district-api";
import { useReadProvincesQuery } from "@/features/province/province-api";
import { useReadUserRolesQuery } from "@/features/role/role-api";
import { useReadSystemsQuery } from "@/features/systems/system-api";
import { styles } from "@/utilities/cn";
import { ChangeEvent, FormEvent } from "react";

type Props = {
  toggler: () => void;
  handleFormChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  inputError: UserCreateErrorType;
  formState: UserCreateDataType; // Define proper type for formState
  setFormState: React.Dispatch<React.SetStateAction<UserCreateDataType>>; // Define proper type for setFormState
  isEdit: boolean;
  isUsernameValid?: boolean;
  isCellphoneValid: boolean;
  selectSystem: number[]; // Change to array of numbers
  setSelectSystem: React.Dispatch<React.SetStateAction<number[]>>; // Change to set array of numbers
  provinceId: string | null;
  districtId: string | null;
  handleDistrictChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleProvinceChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setInputError: React.Dispatch<React.SetStateAction<UserCreateErrorType>>;
  facilities: Facility[];
  setFacilities: React.Dispatch<React.SetStateAction<Facility[]>>;
  facilityId: string;
  setFacilityId: React.Dispatch<React.SetStateAction<string>>;
  prevFacilityId?: string;
};

const CreateUserForm = ({
  toggler,
  handleFormChange,
  handleSubmit,
  inputError,
  formState,
  setFormState,
  isEdit,
  isUsernameValid = true,
  isCellphoneValid,
  selectSystem,
  setSelectSystem,
  districtId,
  provinceId,
  handleDistrictChange,
  handleProvinceChange,
  facilities,
  facilityId,
  setFacilityId,
  setFacilities,
  setInputError,
  prevFacilityId,
}: Props) => {
  const { data: userRoles, status: rolesStatus } = useReadUserRolesQuery();
  const { data: deviceTypes, status: deviceTypeStatus } =
    useReadDeviceTypesQuery();
  const { data: provinces, status: provinceStatus } = useReadProvincesQuery();
  const { data: countries, status: countriesStatus } = useReadCountriesQuery();
  const { data: systems, status: systemsStatus } = useReadSystemsQuery();

  const isOptionLoading =
    rolesStatus === "pending" ||
    deviceTypeStatus === "pending" ||
    provinceStatus === "pending" ||
    countriesStatus === "pending" ||
    systemsStatus === "pending";

  const renderSystemOptions = () => {
    return systems?.data?.map((system) => ({
      oid: system?.oid,
      title: system?.title,
    }));
  };

  const renderRoleOptions = () => {
    return userRoles?.data?.map((role) => (
      <option key={role?.oid} value={role?.oid}>
        {role?.description}
      </option>
    ));
  };

  const renderDeviceTypeOptions = () => {
    return deviceTypes?.data?.map((device) => (
      <option key={device?.oid} value={device?.oid}>
        {device?.deviceTypeName}
      </option>
    ));
  };

  const { data: districts } = useReadDistrictByProvinceQuery(
    String(provinceId),
    {
      skip: !provinceId,
      refetchOnMountOrArgChange: true,
    }
  );

  const renderProvinceOptions = () => {
    return provinces?.data?.map((province) => (
      <option key={province?.oid} value={province?.oid}>
        {province?.provinceName}
      </option>
    ));
  };

  const renderDistrictOptions = () => {
    return districts?.data?.map((district) => (
      <option key={district?.oid} value={district?.oid}>
        {district?.districtName}
      </option>
    ));
  };

  return isOptionLoading ? (
    <FormSkeleton />
  ) : (
    <form onSubmit={handleSubmit}>
      {/* <FormSkeleton /> */}
      <div className="grid md:grid-cols-6 gap-5">
        <div className="col-span-3">
          <Input
            required
            errMsg={inputError?.name}
            label="Name"
            value={formState?.name}
            name="name"
            onChange={handleFormChange}
          />
        </div>

        <div className="col-span-3">
          <Input
            required
            errMsg={inputError?.surname}
            label="Surname"
            value={formState?.surname}
            name="surname"
            onChange={handleFormChange}
          />
        </div>

        <div className="col-span-3 md:col-span-2">
          <Input
            // type="email"
            value={formState?.email}
            name="email"
            errMsg={inputError?.email}
            label="Email Address"
            onChange={handleFormChange}
          />
        </div>

        <div className="col-span-3 md:col-span-2">
          <Select
            label="Role"
            required
            name="roleId"
            value={formState.roleId}
            errMsg={inputError.roleId}
            onChange={(e) => {
              handleFormChange(e);
              setSelectSystem([]);
            }}
          >
            {renderRoleOptions()}
          </Select>
        </div>

        {formState?.roleId === "1" && (
          <>
            <div className="col-span-3 md:col-span-2">
              <Select
                required
                label="Province"
                name="provinceId"
                value={provinceId}
                onChange={(e) => handleProvinceChange(e)}
                errMsg={inputError?.provinceId}
              >
                {renderProvinceOptions()}
              </Select>
            </div>

            <div className="col-span-3 md:col-span-2">
              <Select
                required
                label="District"
                name="districtId"
                value={districtId}
                onChange={handleDistrictChange}
                errMsg={inputError?.districtId}
              >
                {districts?.isSuccess && renderDistrictOptions()}
              </Select>
            </div>

            <div className="col-span-3 md:col-span-2">
              <FacilityScrollSearch
                label="Facility"
                required
                districtId={districtId}
                facilityId={facilityId}
                setFacilityId={setFacilityId}
                placeholder={"Search facility"}
                facilities={facilities}
                setFacilities={setFacilities}
                prevFacilityId={prevFacilityId}
              />
            </div>
          </>
        )}

        <div className="grid grid-cols-3 gap-3 col-span-3 md:col-span-2">
          <CountryCode
            required
            name="countryCode"
            value={formState?.countryCode}
            onChange={(event) => {
              handleFormChange(event);
            }}
            resetCellPhone={() =>
              setFormState((prev) => ({ ...prev, cellphone: "" }))
            }
            label="Country Code"
            errMsg={inputError?.countryCode}
            countries={countries?.data}
          />

          <div className="col-span-2">
            <PhoneNumber
              required
              label="Cellphone"
              countryCode={formState?.countryCode}
              name="cellphone"
              value={formState?.cellphone}
              onChange={handleFormChange}
              errMsg={
                inputError?.cellphone ||
                (!isCellphoneValid ? "Cellphone already exists" : "")
              }
            />
          </div>
        </div>

        {formState?.roleId === "1" && (
          <div className="col-span-3 md:col-span-3">
            <CustomSelectInput
              label="Systems Permission "
              options={renderSystemOptions()}
              selectedOptions={selectSystem}
              setSelectedOptions={setSelectSystem}
              errMsg={inputError?.systems}
              // required={formState?.roleId === "1"}
              setInputError={setInputError}
            />
          </div>
        )}

        <div
          className={styles("col-span-3", {
            "col-span-3 md:col-span-full": formState?.roleId !== "1",
          })}
        >
          <Select
            label="Device type"
            errMsg={inputError?.deviceTypeId}
            onChange={handleFormChange}
            value={formState?.deviceTypeId}
            name="deviceTypeId"
          >
            {renderDeviceTypeOptions()}
          </Select>
        </div>

        {!isEdit && (
          <div className="col-span-3 md:col-span-full grid md:grid-cols-2 gap-5">
            <Input
              required
              label="Username"
              className="rounded-md"
              value={formState?.username}
              errMsg={
                inputError?.username ||
                (!isUsernameValid ? "Username already exists" : "")
              }
              name="username"
              onChange={handleFormChange}
            />

            <Password
              required
              label="Password"
              className="rounded-md"
              value={formState?.password}
              errMsg={inputError?.password}
              name="password"
              onChange={handleFormChange}
            />
          </div>
        )}
      </div>

      <div className="flex gap-5 mt-5">
        <SaveAndBackButtons toggler={toggler} />
      </div>
    </form>
  );
};

export default CreateUserForm;
