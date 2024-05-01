/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import TableSkeleton from "@/components/core/loader/TableSkeleton";
import Table from "@/components/core/table/Table";
import TableBody from "@/components/core/table/TableBody";
import TableHeader from "@/components/core/table/TableHeader";
import ErrorPage from "@/components/error-page/ErrorPage";
import NotFound from "@/components/not-found/NotFound";
import TableButton from "@/components/shared/table-button/TableButton";
import { deviceParameterModalTypes } from "@/constants/modal-types/modal-types";
import { useReadDeviceControlsQuery } from "@/features/device-control/device-control-api";
import { closeEditModal, openEditModal } from "@/features/modal/modal-slice";
import useDataHandling from "@/hooks/shared/useDataHandle";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import EditDeviceParameter from "../edit/EditDeviceParameter";

const DeviceParameter = () => {
  //Edit modal data from redux store
  const { editModal } = useSelector((state: RootState) => state.modal);

  const dispatch = useDispatch();

  // Read Device Control Data hook
  const {
    data: deviceControlData,
    isError,
    isLoading,
    isSuccess,
  } = useReadDeviceControlsQuery();

  // Status handler hook
  const { dataNotFound, isDataError, isDataLoading, isDataSuccess } =
    useDataHandling({
      isError,
      isLoading,
      isSuccess,
      length: deviceControlData?.data?.length,
    });

  // Edit Modal open handler
  const handleEditDeviceParameter = () => {
    dispatch(
      openEditModal({
        modalId: deviceParameterModalTypes?.editDeviceParameter,
        data: deviceControlData,
      })
    );
  };

  // Close Modal handler
  const closeModal = () => {
    dispatch(closeEditModal());
  };

  return (
    <>
      {/* Data status Check  */}
      {isDataError && <ErrorPage />}
      {isDataLoading && <TableSkeleton />}
      {dataNotFound && <NotFound />}
      {isDataSuccess && (
        <div className="bg-whiteColor rounded-lg pb-4">
          <Table className="min-w-[550px]">
            <TableHeader
              data={[
                {
                  title: "CPU Usage",
                  w: "30%",
                },
                {
                  title: "Memory Usage",
                  w: "30%",
                },
                {
                  title: "",
                  w: "65px",
                },
              ]}
            />
            {deviceControlData?.data?.map((deviceControl, index) => (
              <TableBody
                key={index}
                index={index}
                length={deviceControlData?.data?.length}
                data={[
                  {
                    title: `${deviceControl?.cpuUses}%`,
                    w: "30%",
                  },
                  {
                    title: `${deviceControl?.memoryUses}%`,
                    w: "30%",
                  },
                  {
                    title: (
                      <div className="flex ">
                        <TableButton
                          onClick={handleEditDeviceParameter}
                          icon={<BiEdit className="text-violetColor" />}
                          text="Edit"
                        />
                      </div>
                    ),
                    w: "65px",
                  },
                ]}
              />
            ))}
          </Table>

          {/* Edit Device Parameter Component  */}
          {editModal?.modalId ===
            deviceParameterModalTypes?.editDeviceParameter && (
            <EditDeviceParameter toggler={closeModal} />
          )}
        </div>
      )}
    </>
  );
};

export default DeviceParameter;
