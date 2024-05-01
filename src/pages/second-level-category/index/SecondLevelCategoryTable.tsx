/*
 * Created by: Andrew
 * Date created: 10.02.2024
 * Modified by: Andrew
 * Last modified: 03.03.2024
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
import TitleRow from "@/components/core/table/TitleRow";
import ErrorPage from "@/components/error-page/ErrorPage";
import NotFound from "@/components/not-found/NotFound";
import TableButton from "@/components/shared/table-button/TableButton";
import { IncidentCategory } from "@/constants/api-interface";
import { categoriesModalTypes } from "@/constants/modal-types/modal-types";
import {
  useDeleteIncidentCategoryMutation,
  useReadIncidentCategoryPageByLevelQuery,
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
import { URLCategories, URLThirdLevelCategory } from "@/routers/routes-link";
import TextShowHide from "@/utilities/show-hide-text";
import { swalWarning } from "@/utilities/swal-fire";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import CreateSecondCategory from "../create/Create";
import EditSecondCategory from "../edit/Edit";

/**
 * @description Second Level Category Table component
 */
const SecondLevelCategoryTable = () => {
  // get add and edit modal data form the redux store
  const { addModal, editModal } = useSelector(
    (state: RootState) => state.modal
  );

  // per page items count
  const paginationDefaultShowValue = [10, 20, 30, 50];

  // pagination hooks
  const { setStart, start, setTake, take, activePage, setActivePage } =
    usePagination({
      paginationDefaultShowValue,
    });

  // window width for responsive design
  const w1380 = useWindowWidth(1380);

  // navigator
  const navigate = useNavigate();

  // category id from the url
  const { categoryId } = useParams<{ categoryId: string }>();

  // action dispatcher
  const dispatch = useDispatch();

  // read incident category by level query
  const {
    data: categoryData,
    isError,
    isLoading,
    isSuccess,
  } = useReadIncidentCategoryPageByLevelQuery(
    {
      key: categoryId,
      start,
      take,
    },
    { skip: !categoryId, refetchOnMountOrArgChange: true }
  );

  // delete incident category mutation
  const [
    deleteCategory,
    {
      data: incidentCategoryDeleteRes,
      isError: isDeleteError,
      error: deleteError,
      isSuccess: isDeleteSuccess,
      status: deleteStatus,
    },
  ] = useDeleteIncidentCategoryMutation();

  // add second level category handler
  const handleAddSecondCategory = () => {
    dispatch(
      openAddModal({
        modalId: categoriesModalTypes?.addSecondLevelCategories,
        data: null,
      })
    );
  };

  // edit second level category handler
  const handleEditSecondCategory = (item: IncidentCategory) => {
    dispatch(
      openEditModal({
        modalId: categoriesModalTypes?.editSecondLevelCategories,
        data: item,
      })
    );
  };

  //  delete handler
  const deleteFunction = (id: number) => {
    Swal.fire(swalWarning({})).then((result) => {
      if (result.isConfirmed) {
        deleteCategory(id);
      }
    });
  };

  // close modal handler
  const closeModal = () => {
    dispatch(closeAddModal());
    dispatch(closeEditModal());
  };

  // data handling hooks
  const { dataNotFound, isDataError, isDataLoading, isDataSuccess } =
    useDataHandling({
      isError,
      isLoading,
      isSuccess,
      length: categoryData?.data?.incidentCategories?.length,
    });

  // delete side effect
  useCreateSideEffects({
    error: deleteError,
    isError: isDeleteError,
    isSuccess: isDeleteSuccess,
    status: deleteStatus,
    message: "category",
    messageType: "delete",
    response: incidentCategoryDeleteRes,
  });

  return (
    <div className="">
      <div className="flex justify-between mb-3">
        {/* BACK BUTTON */}
        <button
          onClick={() => {
            navigate(URLCategories());
          }}
          className="back_btn"
        >
          <BackIcon /> Back
        </button>

        {/* ADD BUTTON */}
        <button onClick={handleAddSecondCategory} className="main_btn">
          <PlusIcon /> Add Second Level Category
        </button>
      </div>
      <div className="bg-whiteColor rounded-lg pb-4">
        {/* LOADING SKELETON */}
        {isDataLoading && <TableSkeleton />}

        {/* ERROR */}
        {isDataError && <ErrorPage />}

        {/* NOT FOUND */}
        {dataNotFound && <NotFound />}

        {/* TABLE */}
        {isDataSuccess && (
          <Table className="min-w-[550px]">
            <div className="mx-8 mt-3">
              {/* TABLE TITLE */}
              <TitleRow
                data={
                  categoryData?.data?.incidentCategories?.[0]?.parentCategory
                    ?.incidentCategorys
                }
                title="First Level Category"
              />
            </div>
            {/* TABLE HEADER */}
            <TableHeader
              data={[
                {
                  title: "Second Level Category",
                  w: "30%",
                },
                {
                  title: "",
                  w: w1380 ? "280px" : "300px",
                },
              ]}
            />
            {/* TABLE BODY */}
            {categoryData?.data?.incidentCategories?.map(
              (item: IncidentCategory, index: number) => (
                <TableBody
                  key={index}
                  index={index}
                  length={categoryData?.data?.incidentCategories?.length}
                  data={[
                    {
                      title: (
                        <div className="font-bold">
                          {item?.incidentCategorys}
                        </div>
                      ),
                      subTitle: (
                        <TextShowHide content={item?.description ?? ""} />
                      ),
                      w: "30%",
                    },
                    {
                      title: (
                        <div className="flex ">
                          <TableButton
                            className="border-r border-borderColor pe-3 me-3 "
                            onClick={() => handleEditSecondCategory(item)}
                            icon={<BiEdit className="text-violetColor" />}
                            text="Edit"
                          />
                          <TableButton
                            className="border-r border-borderColor pe-3 me-3"
                            onClick={() => deleteFunction(item?.categoryId)}
                            icon={<BiTrash className="text-redColor" />}
                            text="Delete"
                          />
                          <TableButton
                            className="text-violetColor"
                            onClick={() => {
                              navigate(
                                URLThirdLevelCategory(
                                  categoryId,
                                  String(item?.categoryId)
                                )
                              );
                            }}
                            text="Third Level Category"
                          />
                        </div>
                      ),
                      w: w1380 ? "280px" : "300px",
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
            setStart={setStart}
            setTake={setTake}
            take={take}
            start={start}
            totalItemsCount={categoryData?.data?.totalRows ?? 0}
            showInPage={paginationDefaultShowValue}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </div>
      </div>

      {/* CREATE SECOND LEVEL CATEGORY MODAL */}
      {addModal?.modalId === categoriesModalTypes?.addSecondLevelCategories && (
        <CreateSecondCategory toggler={closeModal} />
      )}

      {/* EDIT SECOND LEVEL CATEGORY */}
      {editModal?.modalId ===
        categoriesModalTypes?.editSecondLevelCategories && (
        <EditSecondCategory toggler={closeModal} />
      )}
    </div>
  );
};

export default SecondLevelCategoryTable;
