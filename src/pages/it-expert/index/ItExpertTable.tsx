/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
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
import TableButton from "@/components/shared/table-button/TableButton";
import { itExpertModalTypes } from "@/constants/modal-types/modal-types";
import {
  useDeleteFacilityPermissionMutation,
  useReadFacilitiesPermissionPageQuery,
} from "@/features/facility-permission/facility-permission-api";
import {
  closeAddModal,
  closeEditModal,
  openAddModal,
  openEditModal,
} from "@/features/modal/modal-slice";
import useDataHandling from "@/hooks/shared/useDataHandle";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { deleteAlert } from "@/utilities/sweet-alert";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CreateItExpert from "../create/Create";
import EditItExpert from "../edit/Edit";

const ItExpertTable = () => {
  //Add and Edit modal data from redux store
  const { addModal, editModal } = useSelector(
    (state: RootState) => state.modal
  );

  // Navigate hook
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Facility Id From Parameter
  const { facilityId } = useParams<{
    facilityId: string;
  }>();

  // pagination hook
  const paginationDefaultShowValue = [10, 20, 30, 50];
  const { setStart, start, setTake, take, activePage, setActivePage } =
    usePagination({
      paginationDefaultShowValue,
    });

  // Read Facilities Permission
  const {
    data: facilityData,
    isError,
    isLoading,
    isSuccess,
  } = useReadFacilitiesPermissionPageQuery(
    {
      key: facilityId,
      start,
      take,
    },
    { skip: !facilityId, refetchOnMountOrArgChange: true }
  );

  // Delete Facilities Permission hook
  const [
    deleteFacilityPermission,
    {
      data: facilityPermissionDeleteRes,
      isError: isDeleteError,
      status: deleteStatus,
      isSuccess: isDeleteSuccess,
      error: deleteError,
    },
  ] = useDeleteFacilityPermissionMutation();

  // Facilities Permission status handler
  const { dataNotFound, isDataError, isDataLoading, isDataSuccess } =
    useDataHandling({
      isError,
      isLoading,
      isSuccess,
      length: facilityData?.data?.data?.length,
    });

  // Create Modal Open handler
  const handleAddItExpert = () => {
    dispatch(
      openAddModal({
        modalId: itExpertModalTypes?.addItExpert,
        data: null,
      })
    );
  };

  // Edit Modal Open handler
  const handleEditItExpert = (itExpert) => {
    dispatch(
      openEditModal({
        modalId: itExpertModalTypes?.editItExpert,
        data: itExpert,
      })
    );
  };

  //Close Modal Handler
  const closeModal = () => {
    dispatch(closeAddModal());
    dispatch(closeEditModal());
  };

  // Delete SideEffect
  useCreateSideEffects({
    error: deleteError,
    isError: isDeleteError,
    isSuccess: isDeleteSuccess,
    status: deleteStatus,
    message: "it Expert",
    messageType: "delete",
    response: facilityPermissionDeleteRes,
  });

  return (
    <>
      <div className="">
        <div className="flex justify-between mb-3">
          {/* Back Button  */}
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="back_btn"
          >
            <BackIcon /> Back
          </button>

          {/* Add Button */}
          {facilityData?.data?.data.length === 0 && (
            <button onClick={handleAddItExpert} className="main_btn">
              <PlusIcon /> Add IT Expert
            </button>
          )}
        </div>

        {/* Data List */}
        <div className="bg-whiteColor rounded-lg pb-4">
          {isDataError && <ErrorPage />}
          {isDataLoading && <TableSkeleton />}
          {dataNotFound && <NotFound />}
          {isDataSuccess && (
            <Table className="min-w-[550px]">
              <TableHeader
                data={[
                  {
                    title: "Facility",
                    w: "30%",
                  },
                  {
                    title: "User",
                    w: "30%",
                  },
                  {
                    title: "",
                    w: "200px",
                  },
                ]}
              />
              {facilityData?.data?.data?.map((item, index) => (
                <TableBody
                  key={index}
                  index={index}
                  length={facilityData?.data?.data?.length}
                  data={[
                    {
                      title: item?.facilityName,
                      w: "30%",
                    },
                    {
                      title: item?.userName,
                      w: "30%",
                    },
                    {
                      title: (
                        <div className="flex ">
                          <TableButton
                            className="border-r border-borderColor pe-3 me-3 "
                            onClick={() => handleEditItExpert(item)}
                            icon={<BiEdit className="text-violetColor" />}
                            text="Edit"
                          />
                          <TableButton
                            onClick={() =>
                              deleteAlert(() =>
                                deleteFacilityPermission(
                                  String(item?.facliityPermissionId)
                                )
                              )
                            }
                            icon={<BiTrash className="text-redColor" />}
                            text="Delete"
                          />
                        </div>
                      ),
                      w: "200px",
                    },
                  ]}
                />
              ))}
            </Table>
          )}

          {/* Pagination Component  */}
          <div className="flex justify-end mx-5">
            <CustomPagination
              take={take}
              setTake={setTake}
              start={start}
              setStart={setStart}
              totalItemsCount={5}
              showInPage={paginationDefaultShowValue}
              activePage={activePage}
              setActivePage={setActivePage}
            />
          </div>
        </div>

        {/* Create Modal  */}
        {addModal?.modalId === itExpertModalTypes?.addItExpert && (
          <CreateItExpert toggler={closeModal} />
        )}

        {/* Edit Modal  */}
        {editModal?.modalId === itExpertModalTypes?.editItExpert && (
          <EditItExpert toggler={closeModal} />
        )}
      </div>
    </>
  );
};

export default ItExpertTable;
