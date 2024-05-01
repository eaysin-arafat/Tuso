/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import PlusIcon from "@/assets/icons/PlusIcon";
import CustomPagination from "@/components/core/custom-pagination/CustomPagination";
import usePagination from "@/components/core/custom-pagination/usePagination";
import TableSkeleton from "@/components/core/loader/TableSkeleton";
import Table from "@/components/core/table/Table";
import TableBody from "@/components/core/table/TableBody";
import TableHeader from "@/components/core/table/TableHeader";
import ErrorPage from "@/components/error-page/ErrorPage";
import NotFound from "@/components/not-found/NotFound";
import TableButton from "@/components/shared/table-button/TableButton";
import { DeviceTypes } from "@/constants/api-interface";
import { deviceTypeModalTypes } from "@/constants/modal-types/modal-types";
import {
  useDeleteDeviceTypeMutation,
  useReadDeviceTypesPageQuery,
} from "@/features/device-type/device-type-api";
import {
  closeAddModal,
  closeEditModal,
  openAddModal,
  openEditModal,
} from "@/features/modal/modal-slice";
import useDataHandling from "@/hooks/shared/useDataHandle";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import useWindowWidth from "@/hooks/shared/useWindowWidth";
import { swalWarning } from "@/utilities/swal-fire";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import CreateDeviceType from "../create/CreateDeviceType";
import EditDeviceType from "../edit/EditDeviceType";

const DeviceType = () => {
  //add and edit modal data from redux store
  const { addModal, editModal } = useSelector(
    (state: RootState) => state.modal
  );

  const w1380 = useWindowWidth(1380);
  const dispatch = useDispatch();

  // pagination hook
  const paginationDefaultShowValue = [10, 20, 30, 50];
  const { setStart, start, setTake, take, activePage, setActivePage } =
    usePagination({
      paginationDefaultShowValue,
    });

  // Read Device Types Data hook
  const {
    data: deviceTypeData,
    isError,
    isLoading,
    isSuccess,
  } = useReadDeviceTypesPageQuery({
    start,
    take,
  });

  // Device Types Data status handler hook
  const { dataNotFound, isDataError, isDataLoading, isDataSuccess } =
    useDataHandling({
      isError,
      isLoading,
      isSuccess,
      length: deviceTypeData?.data?.deviceTypes?.length,
    });

  // Delete Device Types Data hook
  const [
    deleteDeviceType,
    {
      data: deviceDeleteRes,
      status: deleteStatus,
      isError: isDeleteError,
      error: deleteError,
      isSuccess: isDeleteSuccess,
    },
  ] = useDeleteDeviceTypeMutation();

  //Add Modal open handler
  const handleAddDeviceType = () => {
    dispatch(
      openAddModal({
        modalId: deviceTypeModalTypes?.addDeviceType,
        data: null,
      })
    );
  };

  //Edit Modal open handler
  const handleEditDeviceType = (data: DeviceTypes) => {
    dispatch(
      openEditModal({
        modalId: deviceTypeModalTypes?.editDeviceType,
        data: data,
      })
    );
  };

  //Modal Close handler
  const closeModal = () => {
    dispatch(closeAddModal());
    dispatch(closeEditModal());
  };

  // Delete Alert
  const deleteFunction = (id: number) => {
    Swal.fire(swalWarning({})).then((result) => {
      if (result.isConfirmed) {
        deleteDeviceType(id);
      }
    });
  };

  // Data Delete SideEffect
  useCreateSideEffects({
    error: deleteError,
    isError: isDeleteError,
    isSuccess: isDeleteSuccess,
    message: "device type",
    messageType: "delete",
    response: deviceDeleteRes,
    status: deleteStatus,
  });

  return (
    <div className="">
      <div className="flex justify-end mb-3">
        {/* Add Button  */}
        <button onClick={handleAddDeviceType} className="main_btn">
          <PlusIcon /> Add Device Type
        </button>
      </div>
      <div className="bg-whiteColor rounded-lg pb-4">
        {isDataError && <ErrorPage />}
        {isDataLoading && <TableSkeleton />}
        {dataNotFound && <NotFound />}
        {isDataSuccess && (
          <Table className="min-w-[400px]">
            <TableHeader
              data={[
                {
                  title: "Device Type Name",
                  w: "30%",
                },
                {
                  title: "",
                  w: w1380 ? "120px" : "140px",
                },
              ]}
            />
            {deviceTypeData?.data?.deviceTypes?.map(
              (device: DeviceTypes, index: number) => (
                <TableBody
                  key={index}
                  index={index}
                  length={deviceTypeData?.data?.deviceTypes?.length}
                  data={[
                    {
                      title: device?.deviceTypeName,
                      w: "30%",
                    },
                    {
                      title: (
                        <div className="flex ">
                          {/* Edit Button  */}
                          <TableButton
                            className="border-r border-borderColor pe-3 me-3 "
                            onClick={() => handleEditDeviceType(device)}
                            icon={<BiEdit className="text-violetColor" />}
                            text="Edit"
                          />

                          {/* Delete Button  */}
                          <TableButton
                            onClick={() => deleteFunction(device?.oid)}
                            icon={<BiTrash className="text-redColor" />}
                            text="Delete"
                          />
                        </div>
                      ),
                      w: w1380 ? "120px" : "140px",
                    },
                  ]}
                />
              )
            )}
          </Table>
        )}

        {/* Pagination  */}
        <div className="flex justify-end mx-5">
          <CustomPagination
            take={take}
            setTake={setTake}
            start={start}
            setStart={setStart}
            totalItemsCount={deviceTypeData?.data?.deviceTypes?.length ?? 0}
            showInPage={paginationDefaultShowValue}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </div>
      </div>

      {/* Add Modal Component  */}
      {addModal?.modalId === deviceTypeModalTypes?.addDeviceType && (
        <CreateDeviceType toggler={closeModal} />
      )}

      {/* Edit Modal Component  */}
      {editModal?.modalId === deviceTypeModalTypes?.editDeviceType && (
        <EditDeviceType toggler={closeModal} />
      )}
    </div>
  );
};

export default DeviceType;
