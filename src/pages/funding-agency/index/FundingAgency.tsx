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
import { FundingAgency as FundingAgencyType } from "@/constants/api-interface";
import { fundingAgencyModalTypes } from "@/constants/modal-types/modal-types";
import {
  useDeleteFundingAgencyMutation,
  useReadFundingAgenciesPageQuery,
} from "@/features/funding-agency/funding-agency-api";
import {
  closeAddModal,
  closeEditModal,
  openAddModal,
  openEditModal,
} from "@/features/modal/modal-slice";
import { useReadSystemsQuery } from "@/features/systems/system-api";
import useDataHandling from "@/hooks/shared/useDataHandle";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import useWindowWidth from "@/hooks/shared/useWindowWidth";
import { getItemById } from "@/utilities/get-item-by-key";
import { swalWarning } from "@/utilities/swal-fire";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import CreateFundingAgency from "../create/CreateFundingAgency";
import EditFundingAgency from "../edit/EditFundingAgency";

const FundingAgency = () => {
  //Add and Edit modal data from redux store
  const { addModal, editModal } = useSelector(
    (state: RootState) => state.modal
  );

  const w1380 = useWindowWidth(1380);
  const dispatch = useDispatch();

  // Read Systems data
  const { data: system } = useReadSystemsQuery();

  // pagination hook
  const paginationDefaultShowValue = [10, 20, 30, 50];
  const { setStart, start, setTake, take, activePage, setActivePage } =
    usePagination({
      paginationDefaultShowValue,
    });

  //Read Funding Agencies
  const {
    data: fundingAgencyData,
    isError,
    isLoading,
    isSuccess,
  } = useReadFundingAgenciesPageQuery({
    start,
    take,
  });

  //Delete Funding Agencies hook
  const [
    deleteFundingAgency,
    {
      data: foundingAgencyDeleteRes,
      status: deleteStatus,
      isError: isDeleteError,
      error: deleteError,
      isSuccess: isDeleteSuccess,
    },
  ] = useDeleteFundingAgencyMutation();

  // Funding Agencies Status handler
  const { dataNotFound, isDataError, isDataLoading, isDataSuccess } =
    useDataHandling({
      isError,
      isLoading,
      isSuccess,
      length: fundingAgencyData?.data?.fundingAgency?.length,
    });

  // Delete SideEffect
  useCreateSideEffects({
    error: deleteError,
    isError: isDeleteError,
    isSuccess: isDeleteSuccess,
    status: deleteStatus,
    message: "founding agency",
    messageType: "delete",
    response: foundingAgencyDeleteRes,
  });

  //Create Modal open handler
  const handleAddFundingAgency = () => {
    dispatch(
      openAddModal({
        modalId: fundingAgencyModalTypes?.addFundingAgency,
        data: null,
      })
    );
  };

  //Edit Modal open handler
  const handleEditFundingAgency = (data: FundingAgencyType) => {
    dispatch(
      openEditModal({
        modalId: fundingAgencyModalTypes?.editFundingAgency,
        data: data,
      })
    );
  };

  // Close Modal handler
  const closeModal = () => {
    dispatch(closeAddModal());
    dispatch(closeEditModal());
  };

  // Delete Alert
  const deleteFunction = (id: number) => {
    Swal.fire(swalWarning({})).then((result) => {
      if (result.isConfirmed) {
        deleteFundingAgency(id);
      }
    });
  };

  return (
    <div className="">
      <div className="flex justify-end mb-3">
        {/* Add Funding Agencies Button  */}
        <button onClick={handleAddFundingAgency} className="main_btn">
          <PlusIcon /> Add Funding Agency
        </button>
      </div>

      {/* Data list  */}
      <div className="bg-whiteColor rounded-lg pb-4">
        {isDataLoading && <TableSkeleton />}
        {isDataError && <ErrorPage />}
        {dataNotFound && <NotFound />}
        {isDataSuccess && (
          <Table className="min-w-[500px]">
            <TableHeader
              data={[
                {
                  title: "Funding Agency",
                  w: "30%",
                },
                {
                  title: "System",
                  w: "30%",
                },
                {
                  title: "",
                  w: w1380 ? "120px" : "140px",
                },
              ]}
            />
            {fundingAgencyData?.data?.fundingAgency?.map(
              (fundingAgency, index) => (
                <TableBody
                  key={index}
                  index={index}
                  length={fundingAgencyData?.data?.fundingAgency?.length}
                  data={[
                    {
                      title: fundingAgency?.fundingAgencyName,
                      w: "30%",
                    },
                    {
                      title: getItemById(
                        { item: system?.data, key: "oid" },
                        {
                          id: Number(fundingAgency?.projectId),
                          key: "title",
                        }
                      ),
                      w: "30%",
                    },
                    {
                      title: (
                        <div className="flex ">
                          <TableButton
                            className="border-r border-borderColor pe-3 me-3 "
                            onClick={() =>
                              handleEditFundingAgency(fundingAgency)
                            }
                            icon={<BiEdit className="text-violetColor" />}
                            text="Edit"
                          />
                          <TableButton
                            onClick={() => deleteFunction(fundingAgency?.oid)}
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

        {/* Pagination Component  */}
        <div className="flex justify-end mx-5">
          <CustomPagination
            take={take}
            setTake={setTake}
            start={start}
            setStart={setStart}
            totalItemsCount={fundingAgencyData?.data?.totalRows}
            showInPage={paginationDefaultShowValue}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </div>
      </div>

      {/* Create Modal  */}
      {addModal?.modalId === fundingAgencyModalTypes?.addFundingAgency && (
        <CreateFundingAgency toggler={closeModal} />
      )}

      {/* Edit Modal  */}
      {editModal?.modalId === fundingAgencyModalTypes?.editFundingAgency && (
        <EditFundingAgency toggler={closeModal} />
      )}
    </div>
  );
};

export default FundingAgency;
