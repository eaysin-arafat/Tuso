import NoPermission from "@/components/no-permission/NoPermission";
import usePermissions from "@/components/sidebar/sidebar-routes-array/usePermissions";
import { useGetDeviceActivityQuery } from "@/features/rdp/rdp-api";
import PageLayout from "@/layout/PageLayout";
// import { TypeAdvanceSearch } from "@/pages/tickets/Index/Index";
import CustomPagination from "@/components/core/custom-pagination/CustomPagination";
import useClientPagination from "@/components/core/custom-pagination/useClientPagination";
import { DeviceIntermittenceType } from "@/constants/api-interface";
import { useReadRDPDeviceInfoesQuery } from "@/features/rdp-device-info/rdp-device-info-api";
import { useEffect, useState } from "react";
import DeviceIntermittenceFilter from "./Filter";
import DeviceIntermittenceTable from "./table/Table";

const DeviceIntermittence = () => {
  // pagination default show value
  // const paginationDefaultShowValue = [10, 20, 30, 50];
  // const { setStart, start, setTake, take, activePage, setActivePage } =
  //   usePagination({
  //     paginationDefaultShowValue,
  //   });

  const [deviceData, setDeviceData] = useState<DeviceIntermittenceType[]>([]);

  const now = new Date();
  const initialState = {
    fromDate:
      new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString() || null,
    toDate: now.toISOString() || null,
    userName: "",
  };
  const [deviceFilters, setDeviceFilters] = useState(initialState);
  const [userName, setUserName] = useState("");

  const { devicePermission } = usePermissions();

  const {
    data: rdpDeviceLog,
    status,
    refetch,
  } = useGetDeviceActivityQuery(deviceFilters, {
    refetchOnMountOrArgChange: true,
  });
  const { data: rdpUserInfo, status: rdpUserInfoStatus } =
    useReadRDPDeviceInfoesQuery();

  useEffect(() => {
    if (status === "fulfilled" && rdpUserInfoStatus === "fulfilled") {
      const data = rdpDeviceLog?.data?.map((device) => {
        const userInfo = rdpUserInfo?.data?.find(
          (info) => info?.deviceId === device?.deviceID
        );

        if (userInfo) return { ...device, ...userInfo };
        return null;
      });

      setDeviceData(data);
    }
  }, [rdpDeviceLog, rdpUserInfo, status, rdpUserInfoStatus]);

  if (!devicePermission) return <NoPermission />;

  // pagination default show value
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
    arrayData: rdpDeviceLog?.data,
  });

  return (
    <div>
      <PageLayout
        filter={
          <DeviceIntermittenceFilter
            userName={userName}
            setUserName={setUserName}
            setDeviceFilters={setDeviceFilters}
            refetch={refetch}
            data={rdpDeviceLog?.data || []}
          />
        }
        heading={{ title: "Device Intermittence" }}
        pagination={
          <CustomPagination
            take={take}
            setTake={setTake}
            start={start}
            setStart={setStart}
            totalItemsCount={deviceData?.length || 1}
            showInPage={paginationDefaultShowValue}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        }
      >
        {/* Table Component  */}
        <div className="w-full relative">
          {rdpDeviceLog?.data?.length == undefined ||
          rdpDeviceLog?.data?.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-xl font-semibold text-violetColor ">
                Search to view Device Report
              </div>
            </div>
          ) : (
            <DeviceIntermittenceTable deviceData={activeShowData || []} />
          )}
        </div>
      </PageLayout>
    </div>
  );
};

export default DeviceIntermittence;
