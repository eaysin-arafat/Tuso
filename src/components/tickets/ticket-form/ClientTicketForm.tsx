/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

/* eslint-disable react-hooks/exhaustive-deps */
import CustomSelectInput from "@/components/core/form-elements/CustomSelectInput";
import DateInput from "@/components/core/form-elements/DatePicker";
import FacilityScrollSearch from "@/components/core/form-elements/Infinity-scroll-search/Index";
import Input from "@/components/core/form-elements/Input";
import Select from "@/components/core/form-elements/Select";
import Textarea from "@/components/core/form-elements/Textarea";
import { useReadDistrictByProvinceQuery } from "@/features/district/district-api";
import { useReadFundingAgencyBySystemQuery } from "@/features/funding-agency/funding-agency-api";
import { useReadImplementingPartnerBySystemQuery } from "@/features/implementing-partner/implementing-partner-api";
import React from "react";

const ClientTicketForm = ({
  formState,
  handleFormChange,
  inputError,
  provinceId,
  districtId,
  facilityId,
  handleProvinceChange,
  handleDistrictChange,
  handleDateChange,
  prevData,
  isReadOnly,
  fundingAgency,
  setFundingAgency,
  implementingPartner,
  setImplementingPartner,
  user,
  systemsOptions,
  clientSystemsOptions,
  provincesOptions,
  setFacilityId,
  setFacilities,
  facilities,
  prevFacilityId,
}) => {
  const { data: districts } = useReadDistrictByProvinceQuery(provinceId, {
    skip: !provinceId,
    refetchOnMountOrArgChange: true,
  });

  // const { data: facilities } = useReadFacilityByDistrictQuery(districtId, {
  //   skip: !districtId,
  //   refetchOnMountOrArgChange: true,
  // });

  const { data: fundingAgencyBySystem } = useReadFundingAgencyBySystemQuery(
    formState?.systemId,
    {
      skip: !formState?.systemId,
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: implementingPartnerBySystem } =
    useReadImplementingPartnerBySystemQuery(formState?.systemId, {
      skip: !formState?.systemId,
      refetchOnMountOrArgChange: true,
    });

  const renderFundingAgencyOptions = () => {
    return fundingAgencyBySystem?.data?.map((fundingAgency) => ({
      oid: fundingAgency?.oid,
      title: fundingAgency?.fundingAgencyName,
    }));
  };

  const renderImplementingPartnerOptions = () => {
    return implementingPartnerBySystem?.data?.map((implementingPartner) => ({
      oid: implementingPartner?.oid,
      title: implementingPartner?.implementingPartnerName,
    }));
  };
  const fundingAgencyOptions = renderFundingAgencyOptions();
  const implementingPartnerOptions = renderImplementingPartnerOptions();

  const renderProvinceOptions = () => {
    return provincesOptions?.map((province) => (
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

  const renderSystemsOptions = () => {
    return systemsOptions?.map((system) => (
      <option key={system?.oid} value={system?.oid}>
        {system?.title}
      </option>
    ));
  };

  const renderClientSystemsOptions = () => {
    return clientSystemsOptions?.map((system) => (
      <option key={system?.systemId} value={system?.systemId}>
        {system?.systemName}
      </option>
    ));
  };

  const renderFundingAgencyInput = () => {
    if (fundingAgencyOptions?.length === 0) return null;

    const isDisabled = user?.roleId === 1 && fundingAgencyOptions?.length === 1;
    const isHide = user?.roleId === 1 && fundingAgencyOptions?.length > 1;

    // const selectedOptions =
    //   user?.roleId === 1 && fundingAgencyOptions?.length === 1
    //     ? fundingAgencyOptions?.map((item) => item?.oid)
    //     : fundingAgency;

    return (
      <>
        {!isHide && (
          <CustomSelectInput
            disabled={
              isDisabled ||
              isReadOnly ||
              (prevData?.fundingAgencyId && user?.roleId !== 1)
            }
            label="Funding Agency"
            options={fundingAgencyOptions}
            selectedOptions={fundingAgency}
            setSelectedOptions={setFundingAgency}
          />
        )}
      </>
    );
  };

  React.useEffect(() => {
    if (user?.roleId === 1 && fundingAgencyOptions?.length === 1) {
      setFundingAgency(fundingAgencyOptions?.map((item) => item?.oid));
    }
  }, [formState?.systemId]);

  const renderImplementingPartnerInput = () => {
    if (implementingPartnerOptions?.length === 0) return null;

    const isDisabled =
      user?.roleId === 1 && implementingPartnerOptions?.length === 1;
    const isHide = user?.roleId === 1 && implementingPartnerOptions?.length > 1;

    // const selectedOptions =
    //   implementingPartnerOptions?.length === 1
    //     ? implementingPartnerOptions?.map((item) => item?.oid)
    //     : implementingPartner;

    return (
      <>
        {!isHide && (
          <CustomSelectInput
            disabled={
              isDisabled ||
              isReadOnly ||
              (prevData?.implementingPartnerId && user?.roleId !== 1)
            }
            label="Implementing Partner"
            options={implementingPartnerOptions}
            selectedOptions={implementingPartner}
            setSelectedOptions={setImplementingPartner}
          />
        )}
      </>
    );
  };

  React.useEffect(() => {
    if (user?.roleId === 1 && implementingPartnerOptions?.length === 1) {
      setImplementingPartner(
        implementingPartnerOptions?.map((item) => item?.oid)
      );
    }
  }, [formState?.systemId]);

  return (
    <>
      <Input
        required
        label="Title"
        name="ticketTitle"
        value={formState?.ticketTitle}
        onChange={handleFormChange}
        errMsg={inputError?.ticketTitle}
        disabled={isReadOnly || (user?.roleId !== 1 && formState?.ticketTitle)}
      />
      <DateInput
        required
        disabled={prevData ? true : false || isReadOnly}
        label="Date of incident"
        name="dateOfIncident"
        selected={
          formState.dateOfIncident ? new Date(formState.dateOfIncident) : null
        }
        onChange={handleDateChange}
        errMsg={inputError?.dateOfIncident}
        isReadOnly={isReadOnly}
        max={new Date()}
      />
      <Select
        required
        disabled={prevData ? true : false || isReadOnly}
        label="System"
        name="systemId"
        value={formState?.systemId}
        onChange={(event) => {
          handleFormChange(event);
          setFundingAgency([]);
          setImplementingPartner([]);
        }}
        errMsg={inputError?.systemId}
        isReadOnly={isReadOnly}
        isHideSelect
      >
        <option value="0">--Select--</option>

        {user?.roleId === 1
          ? clientSystemsOptions?.length && renderClientSystemsOptions()
          : systemsOptions?.length && renderSystemsOptions()}
      </Select>

      <div className="col-span-full grid md:grid-cols-2 gap-5">
        {renderFundingAgencyInput()}
        {renderImplementingPartnerInput()}
      </div>

      <Select
        required
        disabled={(prevData ? true : false || isReadOnly) || user?.roleId === 1}
        label="Province"
        name="provinceId"
        value={provinceId}
        onChange={(e) => handleProvinceChange(e)}
        errMsg={inputError?.priorityId}
        isReadOnly={isReadOnly}
      >
        {provincesOptions?.length && renderProvinceOptions()}
      </Select>
      <Select
        required
        disabled={(prevData ? true : false || isReadOnly) || user?.roleId === 1}
        label="District"
        name=""
        value={districtId}
        onChange={handleDistrictChange}
        errMsg={inputError?.districtId}
        isReadOnly={isReadOnly}
      >
        {districts?.isSuccess && renderDistrictOptions()}
      </Select>

      {/* <Select
        required
        disabled={(prevData ? true : false || isReadOnly) || user?.roleId === 1}
        label="Facility"
        name=""
        value={facilityId}
        onChange={handleFacilityChange}
        errMsg={inputError?.facilityId}
        isReadOnly={isReadOnly}
      >
        {facilities?.isSuccess && renderFacilityOptions()}
      </Select> */}

      <FacilityScrollSearch
        label="Facility"
        required
        disabled={(prevData ? true : false || isReadOnly) || user?.roleId === 1}
        districtId={districtId}
        facilityId={facilityId}
        setFacilityId={setFacilityId}
        placeholder={"Search facility"}
        facilities={facilities}
        setFacilities={setFacilities}
        prevFacilityId={prevFacilityId ? prevFacilityId : ""}
      />

      <div className="col-span-full">
        <Textarea
          required
          label="Incident Description"
          className="h-24"
          name="description"
          value={formState?.description}
          onChange={handleFormChange}
          errMsg={inputError?.description}
          disabled={isReadOnly || (user?.roleId !== 1 && prevData?.description)}
        />
      </div>
    </>
  );
};

export default ClientTicketForm;
