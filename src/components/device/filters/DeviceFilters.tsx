/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import Drawer from "@/components/core/drawer/Drawer";
import ExportBtn from "@/components/core/form-elements/ExportBtn";
import Input from "@/components/core/form-elements/Input";
import Select from "@/components/core/form-elements/Select";
import { RDPDevice, RDPDeviceInfo } from "@/constants/api-interface";
import { useReadDistrictByProvinceQuery } from "@/features/district/district-api";
import { toggleDrawer } from "@/features/drawar/drawar-slice";
import { useReadFacilityByDistrictQuery } from "@/features/facility/facility-api";
import { useReadProvincesQuery } from "@/features/province/province-api";
import useWindowWidth from "@/hooks/shared/useWindowWidth";
import { TypeAdvanceSearch } from "@/pages/tickets/Index/Index";
import { downloadCSV } from "@/utilities/download-csv";
import { downloadXLSX } from "@/utilities/download-xlsx";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { VscRefresh } from "react-icons/vsc";
import { useDispatch } from "react-redux";

// device data type
type DeviceData = RDPDeviceInfo & RDPDevice;

// filter types
type FilterTypes = {
  closeSearch: boolean;
  advanceSearch?: TypeAdvanceSearch;
  refetch?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: DeviceData[];
  statusChange: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  platformChange?:
    | ((e: React.ChangeEvent<HTMLInputElement>) => void)
    | undefined;
  setAdvanceSearch?: (date: unknown) => void;
};

/**
 * @description DeviceFilters component
 */
const DeviceFilters = ({
  advanceSearch,
  setAdvanceSearch,
  refetch,
  data,
  statusChange,
  platformChange,
}: FilterTypes) => {
  // window width hook
  const W768 = useWindowWidth(768);

  // advance search state
  const [openAdvancdSearch, setOpenAdvancdSearch] = React.useState(false);

  // close advance search
  const closeAdvanceSearch = () => setOpenAdvancdSearch(false);

  // update data
  const updatedData = data?.slice()?.map((item) => {
    const newItem = { ...item };

    for (const key in newItem) {
      if (
        Object.prototype.hasOwnProperty.call(newItem, key) &&
        (newItem[key] === null || newItem[key] === undefined)
      ) {
        newItem[key] = "";
      }
    }

    return {
      userName: newItem?.userName,
      provinceName: newItem?.provinceName,
      districtname: newItem?.districtName,
      userTypeName: newItem?.userTypeName,
      deviceName: newItem?.deviceName,
      platform: newItem?.platform,
      processorCount: newItem?.processorCount,
      cpuUtilization: newItem?.cpuUtilization,
      usedMemory: newItem?.usedMemory,
      totalMemory: newItem?.totalMemory,
      usedStorage: newItem?.usedStorage,
      publicIP: newItem?.publicIP,
      privateIP: newItem?.privateIp,
      macAddress: newItem?.macAddress,
      motherboardSerial: newItem?.motherBoardSerial,
      onlineHoursDigit: newItem?.onlineHoursInDigit,
      offlineHours: newItem?.offlineHours,
    };
  });

  // csv download handler
  const csvDownloadHandler = () => {
    downloadCSV(updatedData, "device inventory");
  };

  // xlsx download handler
  const xlsxDownloadHandler = () => {
    downloadXLSX(updatedData, "device inventory");
  };

  // handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        openAdvancdSearch !== false &&
        !target.closest(".dropdown-container")
      ) {
        setOpenAdvancdSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openAdvancdSearch]);

  // action dispatcher
  const dispatch = useDispatch();

  // device name state
  const [deviceName, setDeviceName] = useState<string>("");

  // user name state
  const [userName, setUserName] = useState<string>("");

  // province id state
  const [provinceId, setProvinceId] = useState<string>("");

  // district id state
  const [districtId, setDistrictId] = useState<string>("");

  // facility id state
  const [facilityId, setFacilityId] = useState<string>("");

  // use read provinces query
  const { data: provinces } = useReadProvincesQuery();

  // use read district by province query
  const { data: districts } = useReadDistrictByProvinceQuery(provinceId, {
    skip: !provinceId,
    refetchOnMountOrArgChange: true,
  });

  // use read facility by district query
  const { data: facilities } = useReadFacilityByDistrictQuery(districtId, {
    skip: !districtId,
    refetchOnMountOrArgChange: true,
  });

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

  // render province options
  const renderProvinceOptions = () => {
    return provinces?.data?.map((province) => (
      <option key={province?.oid} value={province?.oid}>
        {province?.provinceName}
      </option>
    ));
  };

  // render district options
  const renderDistrictOptions = () => {
    return districts?.data?.map((district) => (
      <option key={district?.oid} value={district?.oid}>
        {district?.districtName}
      </option>
    ));
  };

  // render facility options
  const renderFacilityOptions = () => {
    return facilities?.data?.map((facility) => (
      <option key={facility?.oid} value={facility?.oid}>
        {facility?.facilityName}
      </option>
    ));
  };

  // submit handler
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (setAdvanceSearch) {
      setAdvanceSearch((prev: TypeAdvanceSearch) => ({
        ...prev,
        userName: userName,
        platform: "windows",
        facilityId: facilityId,
        provinceId: provinceId,
        districtId: districtId,
        deviceName: deviceName,
      }));
    }

    dispatch(toggleDrawer());

    if (closeAdvanceSearch) {
      closeAdvanceSearch();
    }
  };

  // handle toggle advance search
  const handleToggleAdvanceSearch = () => {
    dispatch(toggleDrawer());

    if (closeAdvanceSearch) {
      closeAdvanceSearch();
    }
  };
  const handleRefresh = () => {
    setAdvanceSearch({
      platform: "windows",
      facilityId: "",
      provinceId: "",
      districtId: "",
      userName: "",
      deviceName: "",
      status: "",
    });
    setDeviceName("");
    setUserName("");
    setProvinceId("");
    setDistrictId("");
    setFacilityId("");

    dispatch(toggleDrawer());

    if (closeAdvanceSearch) {
      closeAdvanceSearch();
    }

    if (refetch) {
      refetch();
    }
  };

  return (
    <div
      className={`grid grid-cols-2 md:flex gap-2 md:bg-transparent !p-0 rounded-lg relative `}
    >
      <div className="col-span-full flex gap-2 items-center justify-center">
        {/* STATUS */}
        <Select
          isHideSelect
          onChange={statusChange}
          value={advanceSearch?.status}
        >
          <option value="0">All</option>
          <option value="1">Online</option>
          <option value="2">Offline</option>
        </Select>

        {/* PLATFORM */}
        <Select
          isHideSelect
          onChange={platformChange}
          value={advanceSearch?.platform}
        >
          <option value="windows">Windows</option>
          <option value="linux">Linux</option>
        </Select>

        {/* REFRESH BUTTON */}
        <button className="main_btn py-3" onClick={handleRefresh}>
          <VscRefresh size={18} />
        </button>

        {/* EXPORT BUTTON */}
        <ExportBtn
          csvDownloadHandler={csvDownloadHandler}
          xlsxDownloadHandler={xlsxDownloadHandler}
        />
      </div>

      <div className="col-span-full ">
        {W768 ? (
          <Drawer>
            <div className="">
              {/* FORM */}
              <form onSubmit={submitHandler} className="px-3">
                <div className="flex items-center justify-between mb-3 ">
                  <h2>Advance Search</h2>
                  {/* CLOSE BUTTON */}
                  <FaTimes
                    onClick={handleToggleAdvanceSearch}
                    className="cursor-pointer text-textColor"
                  />
                </div>
                <div className="grid gap-3">
                  {/* USERNAME */}
                  <Input
                    label="Username"
                    name="fromDate"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />

                  {/* DEVICE NAME */}
                  <Input
                    label="Device Name"
                    name="deviceName"
                    value={deviceName}
                    onChange={(e) => setDeviceName(e.target.value)}
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
                </div>

                {/* BUTTONS */}
                <div className="flex justify-end gap-5 mt-4">
                  <button
                    onClick={handleRefresh}
                    type="button"
                    className="outline_btn"
                  >
                    Clear
                  </button>
                  <button type="submit" className="main_btn">
                    Search
                  </button>
                </div>
              </form>
            </div>
          </Drawer>
        ) : (
          // ADVANCE SEARCH BUTTON
          <div className="relative h-full">
            <button
              className="outline_btn dropdown-container col-span-full h-full"
              onClick={() => setOpenAdvancdSearch((prev) => !prev)}
            >
              Advance Search
            </button>
            {openAdvancdSearch && !W768 && (
              <div className="bg-whiteColor absolute z-50 top-[60px] right-0 w-full sm:w-[450px] border border-borderColor shadow-xl p-5 py-4 rounded-lg dropdown-container">
                <form onSubmit={submitHandler} className="px-3">
                  <div className="flex items-center justify-between mb-3 ">
                    <h2>Advance Search</h2>
                    {/* {closeSearch && ( */}
                    <FaTimes
                      onClick={handleToggleAdvanceSearch}
                      className="cursor-pointer text-textColor"
                    />
                    {/* )} */}
                  </div>
                  {/* <FiltersForm /> */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Input
                      label="Username"
                      name="fromDate"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                    <Input
                      label="Device Name"
                      name="deviceName"
                      value={deviceName}
                      onChange={(e) => setDeviceName(e.target.value)}
                    />

                    <Select
                      label="Province"
                      name="provinceId"
                      value={provinceId}
                      onChange={(e) => handleProvinceChange(e)}
                    >
                      {provinces?.isSuccess && renderProvinceOptions()}
                    </Select>

                    <Select
                      label="District"
                      name=""
                      value={districtId}
                      onChange={handleDistrictChange}
                    >
                      {districts?.isSuccess && renderDistrictOptions()}
                    </Select>
                    <Select
                      label="Facility"
                      name=""
                      value={facilityId}
                      onChange={handleFacilityChange}
                    >
                      {facilities?.isSuccess && renderFacilityOptions()}
                    </Select>
                  </div>

                  <div className="flex justify-end gap-5 mt-4">
                    <button
                      onClick={handleRefresh}
                      type="button"
                      className="outline_btn"
                    >
                      Clear
                    </button>
                    <button type="submit" className="main_btn">
                      Search
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceFilters;
