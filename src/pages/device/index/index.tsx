/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import CustomPagination from "@/components/core/custom-pagination/CustomPagination";
import useClientPagination from "@/components/core/custom-pagination/useClientPagination";
import DeviceFilters from "@/components/device/filters/DeviceFilters";
import DeviceTable from "@/components/device/table/Table";
import NoPermission from "@/components/no-permission/NoPermission";
import usePermissions from "@/components/sidebar/sidebar-routes-array/usePermissions";
import { RDPDevice, RDPDeviceInfo } from "@/constants/api-interface";
import { useReadRDPDeviceInfoesQuery } from "@/features/rdp-device-info/rdp-device-info-api";
import { useReadRDPDevicesQuery } from "@/features/rdp/rdp-api";
import PageLayout from "@/layout/PageLayout";
import { TypeAdvanceSearch } from "@/pages/tickets/Index/Index";
// import { TypeAdvanceSearch } from "@/pages/tickets/Index/Index";
import React, { useEffect, useState } from "react";

type DeviceData = RDPDeviceInfo & RDPDevice;

const DevicePage = () => {
  // Advance Search Filter state
  const [advanceSearch, setAdvanceSearch] = useState<TypeAdvanceSearch>({
    status: "0",
    platform: "windows",
    facilityId: "",
    provinceId: "",
    districtId: "",
    userName: "",
    deviceName: "",
  });
  const [deviceData, setDeviceData] = useState<DeviceData[]>([]);

  // module Permission hook
  const { devicePermission } = usePermissions();

  // Status Change Handler
  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdvanceSearch((prev) => ({ ...prev, status: e.target.value }));
    // setDefaultStatus(e.target.value);
  };

  const {
    data: rdpDevices,
    status: rdpDevicestatus,
    // isError: isRepDevicesError,
    // isLoading: isRdpDeivceLoading,
    // isSuccess: isRepDevicesSuccess,
    refetch,
  } = useReadRDPDevicesQuery();
  const {
    data: rdpUserInfo,
    status: rdpUserInfoStatus,
    // isError: isRdpUserInfoError,
    // isLoading: isRdpUserInfoLoading,
    // isSuccess: isRdpUserInfoSuccess,
  } = useReadRDPDeviceInfoesQuery();

  // // const length = String(rdpDevices?.data?.length) || String(rdpUserInfo?.data?.length)
  // const deviceLength = rdpDevices?.data?.length;
  // const deviceInfoLength = rdpUserInfo?.data?.length;
  // const length =
  //   (deviceLength >= 0 ? String(deviceLength) : undefined) ||
  //   (deviceInfoLength >= 0 ? String(deviceInfoLength) : undefined);

  // const { dataNotFound, isDataError, isDataLoading, isDataSuccess } =
  //   useDataHandling({
  //     isError: isRdpUserInfoError || isRepDevicesError,
  //     isLoading: isRdpUserInfoLoading || isRdpDeivceLoading,
  //     isSuccess: isRdpUserInfoSuccess || isRepDevicesSuccess,
  //     length: Number(length),
  //   });

  // console.log({ length });

  const filteredTickets = deviceData?.filter((device) => {
    if (advanceSearch?.status !== "All") {
      if (advanceSearch?.status === "1" && !device?.isOnline) return false;
      if (advanceSearch?.status === "2" && device?.isOnline) return false;
    }
    // Filter by username
    if (
      advanceSearch?.platform &&
      !device?.platform
        ?.toLowerCase()
        ?.includes(advanceSearch?.platform?.toLowerCase())
    )
      return false;

    if (
      advanceSearch?.deviceName &&
      !device?.deviceName
        ?.toLowerCase()
        ?.includes(advanceSearch?.deviceName?.toLowerCase())
    )
      return false;

    if (
      advanceSearch?.userName &&
      !device?.userName
        ?.toLowerCase()
        ?.includes(advanceSearch?.userName?.toLowerCase())
    )
      return false;
    if (
      advanceSearch?.provinceId &&
      !device?.provinceId?.includes(advanceSearch?.provinceId)
    )
      return false;
    if (
      advanceSearch?.districtId &&
      !device?.districtId?.includes(advanceSearch?.districtId)
    )
      return false;
    if (
      advanceSearch?.facilityId &&
      !device?.facilityId?.includes(advanceSearch?.facilityId)
    )
      return false;
    return true;
  });

  // pagination hook
  const paginationDefaultShowValue = [10, 20, 30, 50];
  const {
    setStart,
    start,
    setTake,
    take,
    activePage,
    setActivePage,
    activeShowData,
  } = useClientPagination({
    paginationDefaultShowValue,
    arrayData: filteredTickets,
  });

  // marge rdpDevices and userInfo
  useEffect(() => {
    if (rdpDevicestatus === "fulfilled" && rdpUserInfoStatus === "fulfilled") {
      const data = rdpDevices?.data?.map((device) => {
        const userInfo = rdpUserInfo?.data?.find(
          (info) => info?.deviceId === device?.id
        );

        if (userInfo) return { ...device, ...userInfo };
        return null;
      });

      setDeviceData(data);
    }
  }, [rdpDevices, rdpUserInfo, rdpDevicestatus, rdpUserInfoStatus]);

  if (!devicePermission) return <NoPermission />;

  return (
    <div>
      <PageLayout
        filter={
          <DeviceFilters
            advanceSearch={advanceSearch}
            setAdvanceSearch={setAdvanceSearch}
            closeSearch={true}
            refetch={refetch}
            data={filteredTickets}
            statusChange={handleStatusChange}
            platformChange={(e) =>
              setAdvanceSearch((prev) => ({
                ...prev,
                platform: e.target.value,
              }))
            }
          />
        }
        heading={{ title: "Device Inventory" }}
        pagination={
          <CustomPagination
            take={take}
            setTake={setTake}
            start={start}
            setStart={setStart}
            // totalItemsCount={deviceData?.length || 1}
            totalItemsCount={filteredTickets?.length || 1}
            showInPage={paginationDefaultShowValue}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        }
      >
        {/* Table component */}
        <div className="w-full relative">
          <DeviceTable deviceData={activeShowData} />
        </div>
        {/* <div className="w-full relative">
          {isDataError && <ErrorPage />}
          {isDataLoading && <TableSkeleton />}
          {dataNotFound && <NotFound />}
          {isDataSuccess && <DeviceTable deviceData={activeShowData} />}
        </div> */}
      </PageLayout>
    </div>
  );
};

export default DevicePage;
