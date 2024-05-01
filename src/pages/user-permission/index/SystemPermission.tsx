/*
 * Created by: Andrew
 * Date created: 10.11.2023
 * Modified by: Andrew
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import BackIcon from "@/assets/icons/Back";
import PlusIcon from "@/assets/icons/PlusIcon";
import CustomPagination from "@/components/core/custom-pagination/CustomPagination";
import usePagination from "@/components/core/custom-pagination/usePagination";
import TableSkeleton from "@/components/core/loader/TableSkeleton";
import Table from "@/components/core/table/Table";
import TableBody from "@/components/core/table/TableBody";
import TableHeader from "@/components/core/table/TableHeader";
import ErrorPage from "@/components/error-page/ErrorPage";
import NotFound from "@/components/not-found/NotFound";
import { SystemPermissionDataType } from "@/constants/api-interface";
import { systemPermissionModalTypes } from "@/constants/modal-types/modal-types";
import { closeAddModal, openAddModal } from "@/features/modal/modal-slice";
import {
  useDeleteSystemPermissionMutation,
  useReadSystemPermissionByUserPageQuery,
} from "@/features/system-permission/system-permission-api";
import useDataHandling from "@/hooks/shared/useDataHandle";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { styles } from "@/utilities/cn";
import { swalWarning } from "@/utilities/swal-fire";
import { BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import CreateSystemPermission from "../create/Create";

/**
 * @description System permission component
 */
const SystemPermission = () => {
  // get modal state from redux
  const { addModal } = useSelector((state: RootState) => state.modal);

  // navigator
  const navigate = useNavigate();

  // action dispatcher
  const dispatch = useDispatch();

  // get user id from url
  const { userId } = useParams<{ userId: string }>();

  // pagination default show value
  const paginationDefaultShowValue = [10, 20, 30, 50];

  // use pagination hooks
  const { setStart, start, setTake, take, activePage, setActivePage } =
    usePagination({
      paginationDefaultShowValue,
    });

  // read system permission by user query
  const {
    data: systemData,
    isLoading,
    isError,
    isSuccess,
  } = useReadSystemPermissionByUserPageQuery({
    key: userId,
    start,
    take,
  });

  // delete system permission mutation
  const [
    deleteCategory,
    {
      data: systemPermissionDeleteRes,
      isError: isDeleteError,
      error: deleteError,
      isSuccess: isDeleteSuccess,
      status: deleteStatus,
    },
  ] = useDeleteSystemPermissionMutation();

  // delete system permission handler
  const handleDeleteCategory = (id: string) => {
    Swal.fire(swalWarning({})).then((result) => {
      if (result.isConfirmed) {
        deleteCategory(id);
      }
    });
  };

  // add system permission handler
  const handleAddSystems = () => {
    dispatch(
      openAddModal({
        modalId: systemPermissionModalTypes?.addSystemPermission,
        data: userId,
      })
    );
  };

  // close modal handler
  const closeModal = () => {
    dispatch(closeAddModal());
  };

  // data handling hooks
  const { dataNotFound, isDataError, isDataLoading, isDataSuccess } =
    useDataHandling({
      isError,
      isLoading,
      isSuccess,
      length: systemData?.data?.systemPermission?.length,
    });

  // handle side effects on delete
  useCreateSideEffects({
    error: deleteError,
    isError: isDeleteError,
    isSuccess: isDeleteSuccess,
    status: deleteStatus,
    message: "system",
    messageType: "delete",
    response: systemPermissionDeleteRes,
  });

  return (
    <div className="">
      {/* BACK BUTTON */}
      <div className="flex justify-between mb-3">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="back_btn"
        >
          <BackIcon /> Back
        </button>

        {/* ADD BUTTON */}
        <button onClick={handleAddSystems} className="main_btn">
          <PlusIcon /> Add System
        </button>
      </div>

      <div className="bg-whiteColor rounded-lg pb-4">
        {/* TABLE SKELETON */}
        {isDataLoading && <TableSkeleton />}

        {/* ERROR MESSAGE */}
        {isDataError && <ErrorPage />}

        {/* NOT FOUND */}
        {dataNotFound && <NotFound />}

        {/* TABLE */}
        {isDataSuccess && (
          <Table className="min-w-[550px]">
            {/* TABLE HEADER */}
            <TableHeader
              data={[
                {
                  title: "Name",
                  w: "30%",
                },
                {
                  title: "System Name",
                  w: "30%",
                },
                {
                  title: "",
                  w: "20%",
                },
              ]}
            />

            {/* TABLE BODY */}
            {systemData?.data?.systemPermission?.map(
              (item: SystemPermissionDataType, index: number) => (
                <TableBody
                  key={index}
                  index={index}
                  length={systemData?.data?.systemPermission?.length}
                  data={[
                    {
                      title: item?.username ?? "",
                      w: "30%",
                    },
                    {
                      title: item?.systemName ?? "",
                      w: "30%",
                    },
                    {
                      title: (
                        <button
                          type="button"
                          className={styles(
                            "flex items-center justify-center gap-[6px] text-[12px] 2xl:text-[14px] table-button"
                          )}
                          onClick={() =>
                            handleDeleteCategory(
                              String(item?.systemPermissionId)
                            )
                          }
                        >
                          <BiTrash className="text-redColor" />
                          Delete
                        </button>
                      ),
                      w: "20%",
                    },
                  ]}
                />
              )
            )}
          </Table>
        )}

        {/* PAGINATION */}
        <div className="flex justify-end mx-5">
          <CustomPagination
            take={take}
            setTake={setTake}
            start={start}
            setStart={setStart}
            totalItemsCount={systemData?.data?.systemPermission?.length}
            showInPage={paginationDefaultShowValue}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </div>
      </div>

      {/* CREATE SYSTEM PERMISSION MODAL */}
      {addModal?.modalId ===
        systemPermissionModalTypes?.addSystemPermission && (
        <CreateSystemPermission toggler={closeModal} />
      )}
    </div>
  );
};

export default SystemPermission;
