/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import { useReadDistrictByProvinceQuery } from "@/features/district/district-api";
import { toggleDrawer } from "@/features/drawar/drawar-slice";
import { useReadFacilityByDistrictQuery } from "@/features/facility/facility-api";
import {
  useReadIncidentCategoriesQuery,
  useReadIncidentCategoryPageByLevelQuery,
} from "@/features/incident-category/incident-category-api";
import { useReadProvincesQuery } from "@/features/province/province-api";
import { useReadSystemsQuery } from "@/features/systems/system-api";
import { TypeAdvanceSearch } from "@/pages/tickets/Index/Index";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import DateInput from "../core/form-elements/DatePicker";
import Select from "../core/form-elements/Select";

// date type
type TypeDates = {
  fromDate: string;
  toDate: string;
};

/**
 * Advance Search Form Component
 */
const AdvanceSearchForm = ({
  handleAdvanceSearch,
  setAdvanceSearch,
  refetch,
  reportType,
}: {
  closeSearch: boolean;
  handleAdvanceSearch?: () => void;
  advanceSearch?: TypeAdvanceSearch;
  setAdvanceSearch?: (date: unknown) => void;
  refetch?: () => void;
  reportType?: "weekly" | "lifetime" | "provincial" | "td";
}) => {
  // action dispatcher
  const dispatch = useDispatch();

  // local states
  // selected system id
  const [systemId, setSystemId] = useState<string>("");

  // selected dates
  const [dates, setDates] = useState<TypeDates>({ fromDate: "", toDate: "" });

  // selected status
  const [statusData, setStatusData] = useState<string>("");

  // selected first level category id
  const [firstLevelCategoryId, setFirstLevelCategoryId] = useState<string>("");

  // selected second level category id
  const [secondLevelCategoryId, setSecondLevelCategoryId] =
    useState<string>("");

  // selected third level category id
  const [thirdLevelCategoryId, setThirdLevelCategoryId] = useState<string>("");

  // selected province id
  const [provinceId, setProvinceId] = useState<string>("");

  // selected district id
  const [districtId, setDistrictId] = useState<string>("");

  // selected facility id
  const [facilityId, setFacilityId] = useState<string>("");

  // get systems data from api
  const { data: systems } = useReadSystemsQuery();

  // get provinces data from api
  const { data: provinces } = useReadProvincesQuery();

  // get districts data from api
  const { data: districts } = useReadDistrictByProvinceQuery(provinceId, {
    skip: !provinceId,
    refetchOnMountOrArgChange: true,
  });

  // get facilities data from api
  const { data: facilities } = useReadFacilityByDistrictQuery(districtId, {
    skip: !districtId,
    refetchOnMountOrArgChange: true,
  });

  // get first categories data from api
  const { data: firstCategories } = useReadIncidentCategoriesQuery();

  // get second categories data from api
  const { data: secondCategories } = useReadIncidentCategoryPageByLevelQuery(
    { key: firstLevelCategoryId },
    {
      skip: !firstLevelCategoryId,
      refetchOnMountOrArgChange: true,
    }
  );

  // get third categories data from api
  const { data: thirdCategories } = useReadIncidentCategoryPageByLevelQuery(
    { key: secondLevelCategoryId },
    {
      skip: !secondLevelCategoryId,
      refetchOnMountOrArgChange: true,
    }
  );

  // handle first category change
  const handleFirstCategoryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstLevelCategoryId(e.target.value);
  };

  // handle second category change
  const handleSecondCategoryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSecondLevelCategoryId(e.target.value);
  };

  // handle third category change
  const handleThirdCategoryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setThirdLevelCategoryId(e.target.value);
  };

  // handle province change
  const handleProvinceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProvinceId(e.target.value);
  };

  // handle district change
  const handleDistrictChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDistrictId(e.target.value);
  };

  // handle facility change
  const handleFacilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFacilityId(e.target.value);
  };

  // handle from date change
  const handleFromDateChange = (date) => {
    const fromDate = date?.toISOString();
    let toDate = new Date(date);
    const maxDate = new Date();

    // Check if reportType is "weekly", then set toDate to 7 days later
    if (reportType === "weekly") {
      toDate.setDate(toDate?.getDate() + 7);
      if (toDate > maxDate) {
        toDate = maxDate;
      }
      setDates({ fromDate, toDate: toDate?.toISOString() });
    } else {
      setDates((prev: TypeDates) => ({
        ...prev,
        fromDate: date?.toISOString() || "",
      }));
    }
  };

  // handle to date change
  const handleToDateChange = (date) => {
    const toDate = date.toISOString();
    const fromDate = new Date(date);

    // Check if reportType is "weekly", then set fromDate to 7 days earlier
    if (reportType === "weekly") {
      fromDate?.setDate(fromDate?.getDate() - 7);
      setDates({ fromDate: fromDate?.toISOString(), toDate });
    } else {
      setDates((prev: TypeDates) => ({
        ...prev,
        toDate: date?.toISOString() || "",
      }));
    }
  };

  // render options for first categories
  const renderFirstCategoriesOptions = () => {
    return firstCategories?.data?.map((cat) => (
      <option key={cat?.oid} value={cat?.oid}>
        {cat?.incidentCategorys}
      </option>
    ));
  };

  // render options for second categories
  const renderSecondCategoriesOptions = () => {
    return secondCategories?.data?.incidentCategories?.map((cat) => (
      <option key={cat?.categoryId} value={cat?.categoryId}>
        {cat?.incidentCategorys}
      </option>
    ));
  };

  // render options for third categories
  const renderThirdCategoriesOptions = () => {
    return thirdCategories?.data?.incidentCategories?.map((cat) => (
      <option key={cat?.categoryId} value={cat?.categoryId}>
        {cat?.incidentCategorys}
      </option>
    ));
  };

  // render options for provinces
  const renderProvinceOptions = () => {
    return provinces?.data?.map((province) => (
      <option key={province?.oid} value={province?.oid}>
        {province?.provinceName}
      </option>
    ));
  };

  // render options for districts
  const renderDistrictOptions = () => {
    return districts?.data?.map((district) => (
      <option key={district?.oid} value={district?.oid}>
        {district?.districtName}
      </option>
    ));
  };

  // render options for facilities
  const renderFacilityOptions = () => {
    return facilities?.data?.map((facility) => (
      <option key={facility?.oid} value={facility?.oid}>
        {facility?.facilityName}
      </option>
    ));
  };

  // render options for systems
  const renderSystemsOptions = () => {
    return systems?.data?.map((system) => (
      <option key={system?.oid} value={system?.oid}>
        {system?.title}
      </option>
    ));
  };

  // formate from and to date
  const from = dates?.fromDate?.split("T")?.[0];
  const to = dates?.toDate?.split("T")?.[0];

  // submit handler
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (setAdvanceSearch) {
      setAdvanceSearch((prev: TypeAdvanceSearch) => ({
        ...prev,
        status: statusData,
        facilityId: facilityId,
        provinceId: provinceId,
        districtId: districtId,
        systemId: systemId,
        fromDate: from,
        toDate: to,
        firstLevelCategoryId,
        secondLevelCategoryId,
        thirdLevelCategoryId,
      }));
    }

    // close the drawer
    dispatch(toggleDrawer());

    // if handleAdvanceSearch is provided, call it
    if (handleAdvanceSearch) {
      handleAdvanceSearch();
    }

    // if refetch is provided, call it
    if (refetch) {
      refetch();
    }
  };

  // handle toggle advance search
  const handleToggleAdvanceSearch = () => {
    dispatch(toggleDrawer());

    // if handleAdvanceSearch is provided, call it
    if (handleAdvanceSearch) {
      handleAdvanceSearch();
    }
  };

  // handle refresh
  const handleRefresh = () => {
    setAdvanceSearch({
      status: "0",
      fromDate: "",
      toDate: "",
      ticketNo: "",
      facilityId: "",
      provinceId: "",
      districtId: "",
      systemId: "",
      firstLevelCategoryId: "",
      secondLevelCategoryId: "",
      thirdLevelCategoryId: "",
    });
    setDates({ fromDate: "", toDate: "" });
    setSystemId("");
    setStatusData("");
    setFirstLevelCategoryId("");
    setSecondLevelCategoryId("");
    setThirdLevelCategoryId("");
    setProvinceId("");
    setDistrictId("");
    setFacilityId("");

    // close the drawer
    dispatch(toggleDrawer());

    // if handleAdvanceSearch is provided, call it
    if (handleAdvanceSearch) {
      handleAdvanceSearch();
    }

    // if refetch is provided, call it
    if (refetch) {
      refetch();
    }
  };

  return (
    <form onSubmit={submitHandler} className="px-3">
      <div className="flex items-center justify-between mb-3 ">
        {/* HEADING */}
        <h2>Advance Search</h2>

        {/* CLOSE ICON */}
        <FaTimes
          onClick={handleToggleAdvanceSearch}
          className="cursor-pointer text-textColor"
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {/* SYSTEM */}
        <Select
          label="System"
          name="systemId"
          value={systemId}
          onChange={(e) => setSystemId(e.target.value)}
        >
          {systems?.data?.length && renderSystemsOptions()}
        </Select>

        {/* STATUS */}
        <Select
          isHideSelect
          label="Status"
          name="status"
          value={statusData}
          onChange={(e) => setStatusData(e.target.value)}
        >
          <option value="0">All</option>
          <option value="1">Open</option>
          <option value="2">Close</option>
          <option value="3">Resolved</option>
        </Select>

        {/* FROM DATE */}
        <DateInput
          label="Date Reported From"
          name="fromDate"
          selected={dates.fromDate ? new Date(dates.fromDate) : null}
          onChange={handleFromDateChange}
        />

        {/* TO DATE */}
        <DateInput
          label="To"
          name="toDate"
          selected={dates.toDate ? new Date(dates.toDate) : null}
          onChange={handleToDateChange}
        />

        {/* PROVINCE */}
        <Select
          label="Province"
          name="provinceId"
          value={provinceId}
          onChange={(e) => handleProvinceChange(e)}
        >
          {provinces?.isSuccess && renderProvinceOptions()}
        </Select>

        {/* DISTRICT */}
        <Select
          label="District"
          name=""
          value={districtId}
          onChange={handleDistrictChange}
        >
          {districts?.isSuccess && renderDistrictOptions()}
        </Select>

        {/* FACILITY */}
        <Select
          label="Facility"
          name=""
          value={facilityId}
          onChange={handleFacilityChange}
        >
          {facilities?.isSuccess && renderFacilityOptions()}
        </Select>

        {/* FIRST LEVEL CATEGORY */}
        <Select
          label="First Level Category"
          name="firstLevelCategoryId"
          value={firstLevelCategoryId}
          onChange={handleFirstCategoryChange}
        >
          {firstCategories?.data?.length && renderFirstCategoriesOptions()}
        </Select>

        {/* SECOND LEVEL CATEGORY */}
        <Select
          label="Second Level Category"
          name="secondLevelCategoryId"
          value={secondLevelCategoryId}
          onChange={handleSecondCategoryChange}
        >
          {secondCategories?.data?.incidentCategories?.length &&
            renderSecondCategoriesOptions()}
        </Select>

        {/* THIRD LEVEL CATEGORY */}
        <Select
          label="Third Level Category"
          name="thirdLevelCategoryId"
          value={thirdLevelCategoryId}
          onChange={handleThirdCategoryChange}
        >
          {thirdCategories?.data?.incidentCategories?.length &&
            renderThirdCategoriesOptions()}
        </Select>
      </div>

      {/* BUTTONS */}
      <div className="flex justify-end gap-5 mt-4">
        <button onClick={handleRefresh} type="button" className="outline_btn">
          Clear
        </button>
        <button type="submit" className="main_btn">
          Search
        </button>
      </div>
    </form>
  );
};

export default AdvanceSearchForm;
