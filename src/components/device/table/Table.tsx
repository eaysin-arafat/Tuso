/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState, useAppDispatch } from "@/app/store";
import BadgeBtn from "@/components/core/buttons/BadgeBtn";
import Table from "@/components/core/table/Table";
import TableBody from "@/components/core/table/TableBody";
import TableHeader from "@/components/core/table/TableHeader";
import { Driver, RDPDevice, RDPDeviceInfo } from "@/constants/api-interface";
import { viewUsedStorage } from "@/constants/modal-types/modal-types";
import { openViewModal } from "@/features/modal/modal-slice";
import {
  rdpApiEndpoints,
  useUninstallDeviceByKeyMutation,
} from "@/features/rdp/rdp-api";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { styles } from "@/utilities/cn";
import { swalWarning } from "@/utilities/swal-fire";
import { format } from "date-fns";
import { MdOutlinePortableWifiOff } from "react-icons/md";
import { PiWarningCircleLight } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import UsedStorageDetails from "../used-storage/UsedStorage";
import { tableHeader } from "./table-data/table-header";

// Device Data type
type DeviceData = RDPDeviceInfo & RDPDevice;

// Device table props type
export type DeviceDataType = {
  deviceData: DeviceData[];
};

/**
 * @description DeviceTable component
 */
const DeviceTable = ({ deviceData }: DeviceDataType) => {
  // get view modal data from redux store
  const { viewModal } = useSelector((state: RootState) => state.modal);

  // action dispatcher
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();

  // uninstall device by key mutation
  const [
    uninstallDeviceByKey,
    {
      data: deviceDeleteRes,
      status: deleteStatus,
      isError: isDeleteError,
      error: deleteError,
      isSuccess: isDeleteSuccess,
    },
  ] = useUninstallDeviceByKeyMutation();

  // handle device connect
  const handleDeviceConnect = async (id: string) => {
    const result = await appDispatch(
      rdpApiEndpoints.readDeviceByKey.initiate(id)
    ).unwrap();

    if (result.statusCode === 200 && result?.data) {
      const url = result?.data?.replace(/"/g, "");
      window.open(url, "_blank");
    }
  };

  // handle view used storage modal
  const handleViewUsedStorageModal = (data: Driver[]) => {
    dispatch(
      openViewModal({
        modalId: viewUsedStorage?.viewUsedStorage,
        data: data,
      })
    );
  };

  // uninstall device
  const uninstallDevice = (id: string) => {
    Swal.fire(
      swalWarning({
        title: "Are you sure, you want to uninstall this device?",
        confirmButtonText: "Uninstall",
      })
    ).then((result) => {
      if (result.isConfirmed) {
        uninstallDeviceByKey(id);
      }
    });
  };

  // handle create device side effects
  useCreateSideEffects({
    error: deleteError,
    isError: isDeleteError,
    isSuccess: isDeleteSuccess,
    message: "device",
    messageType: "uninstall",
    response: deviceDeleteRes,
    status: deleteStatus,
  });

  return (
    <div className="">
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="w-full mt-2 rounded-lg pb-2">
          {/* Table component */}
          <Table className="min-w-[4000px]">
            {/* Table header */}
            <TableHeader data={tableHeader()} />

            {/* Table body */}
            {/* Mapping through user list to render table rows */}
            {deviceData &&
              deviceData?.map((device, index) => {
                const downtimeArr = device?.offlineHours?.split(":");
                const uptimeArr = device?.onlineHours?.split(":");

                // table row data
                const tableRow = [
                  {
                    title: index + 1,
                    w: "150px",
                  },
                  {
                    title: device?.userName,
                    w: "300px",
                  },
                  {
                    title: device?.provinceName,
                    w: "300px",
                  },
                  {
                    title: device?.districtName,
                    w: "300px",
                  },
                  {
                    title: device?.facilityName,
                    w: "300px",
                  },

                  // {
                  //   title: "",
                  //   w: "300px",
                  // },
                  {
                    title: device?.platform,
                    w: "300px",
                  },
                  {
                    title: device?.deviceName,
                    w: "300px",
                  },
                  {
                    title: device?.platform,
                    w: "300px",
                  },
                  {
                    title: device?.processorCount,
                    w: "300px",
                  },
                  {
                    title: (device?.cpuUtilization * 100)?.toFixed(2) + "%",
                    w: "300px",
                  },
                  {
                    title: `${device?.usedMemory?.toFixed(2)}GB of ${
                      device?.totalMemory
                    }GB (${(device?.usedMemoryPercent * 100)?.toFixed(2)}%)`,
                    w: "500px",
                  },
                  {
                    title: (
                      <div className="flex gap-2 items-center">
                        <PiWarningCircleLight
                          onClick={() =>
                            handleViewUsedStorageModal(device?.drives)
                          }
                          className="text-base text-violetColor cursor-pointer"
                        />
                        {`${device?.usedStorage}GB of ${
                          device?.totalStorage
                        }GB (${(device?.usedStoragePercent * 100)?.toFixed(
                          2
                        )}%)`}
                      </div>
                    ),
                    w: "500px",
                  },
                  {
                    title: device?.publicIP,
                    w: "300px",
                  },
                  {
                    title: device?.privateIp,
                    w: "400px",
                  },
                  {
                    title: device?.macAddress,
                    w: "300px",
                  },
                  {
                    title: device?.motherBoardSerial,
                    w: "300px",
                  },
                  {
                    title: (
                      <BadgeBtn
                        className={styles(
                          "bg-lightGreenColor hover:bg-lightGreenColor text-greenColor py-1.5",
                          {
                            "text-redColor bg-lightRedColor hover:bg-lightRedColor":
                              !device?.isOnline,
                          }
                        )}
                        btnText={device?.isOnline ? "Online" : "Offline"}
                      />
                    ),
                    w: "200px",
                  },
                  {
                    title: uptimeArr
                      ? `${uptimeArr[0]}hr ${uptimeArr[1]}min`
                      : "",
                    w: "200px",
                  },
                  {
                    title: downtimeArr
                      ? `${downtimeArr[0]}hr ${downtimeArr[1]}min`
                      : "",
                    w: "200px",
                  },
                  {
                    title: device?.lastOnline
                      ? format(new Date(device?.lastOnline), "dd/MM/yyyy HH:mm")
                      : "Missing",
                    w: "300px",
                  },
                  {
                    title: (
                      <div className="flex gap-5">
                        {/* CONNECT BUTTON */}
                        <button
                          className={styles(
                            "text-xs text-violetColor border border-violetColor rounded-md py-1 px-3 font-semibold",
                            {
                              "cursor-not-allowed text-grayColor border-grayColor":
                                !device?.isOnline,
                            }
                          )}
                          disabled={!device?.isOnline}
                          onClick={() => handleDeviceConnect(device?.id)}
                        >
                          Connect
                        </button>

                        {/* UNINSTALL BUTTON */}
                        <button
                          onClick={() => uninstallDevice(device?.id)}
                          disabled={!device?.isOnline}
                          title="UnInstall"
                          className={styles("text-base", {
                            "text-grayColor cursor-not-allowed":
                              !device?.isOnline,
                          })}
                        >
                          <MdOutlinePortableWifiOff />
                        </button>
                      </div>
                    ),
                    w: "200px",
                  },
                ];
                return (
                  <TableBody
                    key={index}
                    index={index}
                    length={deviceData?.length || 0}
                    data={tableRow}
                  />
                );
              })}
          </Table>
        </div>
      </div>

      {/* Storage details modal */}
      {viewModal?.modalId === viewUsedStorage?.viewUsedStorage && (
        <UsedStorageDetails data={viewModal?.data} />
      )}
    </div>
  );
};

export default DeviceTable;
