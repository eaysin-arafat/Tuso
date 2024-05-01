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
import { IncidentCategory } from "@/constants/api-interface";
import { categoriesModalTypes } from "@/constants/modal-types/modal-types";
import {
  useDeleteIncidentCategoryMutation,
  useReadIncidentCategoryPageByFirstLevelQuery,
} from "@/features/incident-category/incident-category-api";
import {
  closeAddModal,
  closeEditModal,
  openAddModal,
  openEditModal,
} from "@/features/modal/modal-slice";
import useDataHandling from "@/hooks/shared/useDataHandle";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import useWindowWidth from "@/hooks/shared/useWindowWidth";
import { URLSecondLevelCategory } from "@/routers/routes-link";
import TextShowHide from "@/utilities/show-hide-text";
import { swalWarning } from "@/utilities/swal-fire";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CreateFirstCategory from "../create/Create";
import EditFirstCategory from "../edit/Edit";

const FirstLevelCategoryTable = () => {
  // Add and Edit modal data from redux store
  const { addModal, editModal } = useSelector(
    (state: RootState) => state.modal
  );

  // Window Width hook for responsive
  const w1380 = useWindowWidth(1380);

  // navigation hook
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // pagination hook
  const paginationDefaultShowValue = [10, 20, 30, 50];
  const { setStart, start, setTake, take, activePage, setActivePage } =
    usePagination({
      paginationDefaultShowValue,
    });

  // Read Incident Category hook
  const {
    data: categoryData,
    isError,
    isLoading,
    isSuccess,
  } = useReadIncidentCategoryPageByFirstLevelQuery({
    start,
    take,
  });
  const firstLebelData = categoryData?.data?.incidentCategories;

  // Delete Incident Category hook
  const [
    deleteCategory,
    {
      data: categoryResponse,
      status: deleteStatus,
      isError: isDeleteError,
      error: deleteError,
      isSuccess: isDeleteSuccess,
    },
  ] = useDeleteIncidentCategoryMutation();

  //  Incident Category status handler hook
  const { dataNotFound, isDataError, isDataLoading, isDataSuccess } =
    useDataHandling({
      isError,
      isLoading,
      isSuccess,
      length: categoryData?.data?.incidentCategories?.length,
    });

  // Delete SideEffect
  useCreateSideEffects({
    error: deleteError,
    isError: isDeleteError,
    isSuccess: isDeleteSuccess,
    status: deleteStatus,
    message: "Category",
    messageType: "delete",
    response: categoryResponse,
  });

  // Add Category modal Open handler
  const handleAddFirstCategory = () => {
    dispatch(
      openAddModal({
        modalId: categoriesModalTypes?.addFirstLevelCategories,
        data: null,
      })
    );
  };

  // Edit Category modal Open handler
  const handleEditFirstCategory = (item: IncidentCategory) => {
    dispatch(
      openEditModal({
        modalId: categoriesModalTypes?.editFirstLevelCategories,
        data: item,
      })
    );
  };

  // Delete Alert
  const handleDelete = (id: number) => {
    Swal.fire(swalWarning({})).then((result) => {
      if (result.isConfirmed) {
        deleteCategory(id);
      }
    });
  };

  // Modal Close Handler
  const closeModal = () => {
    dispatch(closeAddModal());
    dispatch(closeEditModal());
  };

  return (
    <div className="">
      <div className="flex justify-end mb-3">
        {/* Category Add Button  */}
        <button onClick={handleAddFirstCategory} className="main_btn">
          <PlusIcon /> Add First Level Category
        </button>
      </div>
      <div className="bg-whiteColor rounded-lg pb-4">
        {isDataLoading && <TableSkeleton />}
        {isDataError && <ErrorPage />}
        {dataNotFound && <NotFound />}
        {isDataSuccess && (
          <Table className="min-w-[550px]">
            <TableHeader
              data={[
                {
                  title: "First Level Category",
                  w: "40%",
                },
                {
                  title: "",
                  w: w1380 ? "280px" : "320px",
                },
              ]}
            />
            {firstLebelData?.map((item: IncidentCategory, index: number) => (
              <TableBody
                key={index}
                index={index}
                length={firstLebelData?.length}
                data={[
                  {
                    title: (
                      <div className="font-bold">{item?.incidentCategorys}</div>
                    ),
                    subTitle: (
                      <TextShowHide content={item?.description ?? ""} />
                    ),
                    w: "40%",
                  },
                  {
                    title: (
                      <div className="flex">
                        <TableButton
                          className="border-r border-borderColor pe-3 me-3 "
                          onClick={() => handleEditFirstCategory(item)}
                          icon={<BiEdit className="text-violetColor" />}
                          text="Edit"
                        />
                        <TableButton
                          className="border-r border-borderColor pe-3 me-3"
                          onClick={() => handleDelete(item?.oid)}
                          icon={<BiTrash className="text-redColor" />}
                          text="Delete"
                        />
                        <TableButton
                          className="text-violetColor"
                          onClick={() => {
                            navigate(URLSecondLevelCategory(String(item?.oid)));
                          }}
                          text="Second Level Category"
                        />
                      </div>
                    ),
                    w: w1380 ? "280px" : "320px",
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
            totalItemsCount={categoryData?.data?.totalRows}
            showInPage={paginationDefaultShowValue}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </div>
      </div>

      {/* Create modal  */}
      {addModal?.modalId === categoriesModalTypes?.addFirstLevelCategories && (
        <CreateFirstCategory toggler={closeModal} />
      )}

      {/* Edit Modal  */}
      {editModal?.modalId ===
        categoriesModalTypes?.editFirstLevelCategories && (
        <EditFirstCategory toggler={closeModal} />
      )}
    </div>
  );
};

export default FirstLevelCategoryTable;
