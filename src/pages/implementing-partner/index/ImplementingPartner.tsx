/*
 * Created by:
 * Date created: 10.11.2023
 * Modified by:
 * Last modified: 03.12.2023
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
import { ImplementingPartner as ImplementingPartnerType } from "@/constants/api-interface";
import { implementingPartnerModalTypes } from "@/constants/modal-types/modal-types";
import {
  useDeleteImplementingPartnerMutation,
  useReadImplementingPartnersPageQuery,
} from "@/features/implementing-partner/implementing-partner-api";
import { openAddModal, openEditModal } from "@/features/modal/modal-slice";
import { useReadSystemsQuery } from "@/features/systems/system-api";
import useDataHandling from "@/hooks/shared/useDataHandle";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import useWindowWidth from "@/hooks/shared/useWindowWidth";
import { getItemById } from "@/utilities/get-item-by-key";
import { swalWarning } from "@/utilities/swal-fire";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import CreateImplementingPartner from "../create/Create";
import EditImplementingPartner from "../edit/EditI";

const ImplementingPartner = () => {
  //Add and Edit modal data from redux store
  const { addModal, editModal } = useSelector(
    (state: RootState) => state.modal
  );

  const dispatch = useDispatch();
  const w1380 = useWindowWidth(1380);

  // pagination hook
  const paginationDefaultShowValue = [10, 20, 30, 50];
  const { setStart, start, setTake, take, activePage, setActivePage } =
    usePagination({
      paginationDefaultShowValue,
    });

  //Read Implementing Partners
  const {
    data: implementingPartnersData,
    isError,
    isLoading,
    isSuccess,
  } = useReadImplementingPartnersPageQuery({
    start,
    take,
  });

  // Read Systems
  const { data: system } = useReadSystemsQuery();

  // Delete Implementing Partners
  const [
    deleteImplementingPartner,
    {
      data: implementingRes,
      status: deleteStatus,
      isError: isDeleteError,
      error: deleteError,
      isSuccess: isDeleteSuccess,
    },
  ] = useDeleteImplementingPartnerMutation();

  // Create Modal Open Handler
  const handleAddImplementingPartner = () => {
    dispatch(
      openAddModal({
        modalId: implementingPartnerModalTypes?.addImplementingPartner,
        data: null,
      })
    );
  };

  // Edit Modal Open Handler
  const handleEditImplementingPartner = (data: ImplementingPartnerType) => {
    dispatch(
      openEditModal({
        modalId: implementingPartnerModalTypes?.editImplementingPartner,
        data: data,
      })
    );
  };

  // Delete Alert
  const deleteFunction = (id: number) => {
    Swal.fire(swalWarning({})).then((result) => {
      if (result.isConfirmed) {
        deleteImplementingPartner(id);
      }
    });
  };

  // Data Status handler
  const { dataNotFound, isDataError, isDataLoading, isDataSuccess } =
    useDataHandling({
      isError,
      isLoading,
      isSuccess,
      length: implementingPartnersData?.data?.implementions?.length,
    });

  // Delete SideEffect
  useCreateSideEffects({
    error: deleteError,
    isError: isDeleteError,
    isSuccess: isDeleteSuccess,
    message: "implementing partner",
    messageType: "delete",
    response: implementingRes,
    status: deleteStatus,
  });

  return (
    <div className="">
      <div className="flex justify-end mb-3">
        {/* Add Implementing Partner Button  */}
        <button onClick={handleAddImplementingPartner} className="main_btn">
          <PlusIcon /> Add Implementing Partner
        </button>
      </div>

      {/* Data List  */}
      <div className="bg-whiteColor rounded-lg pb-4">
        {isDataLoading && <TableSkeleton />}
        {isDataError && <ErrorPage />}
        {dataNotFound && <NotFound />}
        {isDataSuccess && (
          <Table className="min-w-[550px]">
            <TableHeader
              data={[
                {
                  title: "Implementing Partner",
                  w: "30%",
                },
                {
                  title: "",
                  w: w1380 ? "120px" : "140px",
                },
              ]}
            />
            {implementingPartnersData?.data?.implementions?.map(
              (implementation, index) => (
                <TableBody
                  key={index}
                  index={index}
                  length={implementingPartnersData?.data?.implementions?.length}
                  data={[
                    {
                      title: implementation?.implementingPartnerName,
                      w: "30%",
                    },
                    {
                      title: getItemById(
                        { item: system?.data, key: "oid" },
                        {
                          id: Number(implementation?.projectId),
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
                              handleEditImplementingPartner(implementation)
                            }
                            icon={<BiEdit className="text-violetColor" />}
                            text="Edit"
                          />
                          <TableButton
                            onClick={() => deleteFunction(implementation?.oid)}
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
            totalItemsCount={implementingPartnersData?.data?.totaRows}
            showInPage={paginationDefaultShowValue}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </div>
      </div>

      {/* Create Modal  */}
      {addModal?.modalId ===
        implementingPartnerModalTypes?.addImplementingPartner && (
        <CreateImplementingPartner />
      )}

      {/* Edit Modal  */}
      {editModal?.modalId ===
        implementingPartnerModalTypes?.editImplementingPartner && (
        <EditImplementingPartner />
      )}
    </div>
  );
};

export default ImplementingPartner;
