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
import { URLSecondLevelCategory } from "@/routers/routes-link";
import TextShowHide from "@/utilities/show-hide-text";
import { swalWarning } from "@/utilities/swal-fire";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import CreateThirdCategory from "../create/Create";
import EditThirdCategory from "../edit/Edit";

/**
 * @description Third Level Category Table component
 */
const ThirdLevelCategoryTable = () => {
  // get add and edit modal from redux
  const { addModal, editModal } = useSelector(
    (state: RootState) => state.modal
  );

  // action dispatcher
  const dispatch = useDispatch();

  // navigator
  const navigate = useNavigate();

  // get first and second category id from url
  const { firstCategoryId, secondCategoryId } = useParams<{
    firstCategoryId: string;
    secondCategoryId: string;
  }>();

  // per page items count
  const paginationDefaultShowValue = [10, 20, 30, 50];

  // use pagination
  const { setStart, start, setTake, take, activePage, setActivePage } =
    usePagination({
      paginationDefaultShowValue,
    });

  // get third level category data from api
  const {
    data: categoryData,
    isError,
    isLoading,
    isSuccess,
  } = useReadIncidentCategoryPageByLevelQuery(
    {
      key: secondCategoryId,
      start,
      take,
    },
    { skip: !secondCategoryId, refetchOnMountOrArgChange: true }
  );

  // get third level category data from api
  const thirdCategoryData = categoryData?.data
    ?.incidentCategories as IncidentCategory[];

  // delete category mutation
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

  // delete category handler
  const handleDeleteCategory = (id: number) => {
    Swal.fire(swalWarning({})).then((result) => {
      if (result.isConfirmed) {
        deleteCategory(id);
      }
    });
  };

  // add third category handler
  const handleAddThirdCategory = () => {
    dispatch(
      openAddModal({
        modalId: categoriesModalTypes?.addThirdLevelCategories,
        data: null,
      })
    );
  };

  // edit third category handler
  const handleEditThirdCategory = (item: IncidentCategory) => {
    dispatch(
      openEditModal({
        modalId: categoriesModalTypes?.editThirdLevelCategories,
        data: item,
      })
    );
  };

  // close modal handler
  const closeModal = () => {
    dispatch(closeAddModal());
    dispatch(closeEditModal());
  };

  // data handling
  const { dataNotFound, isDataError, isDataLoading, isDataSuccess } =
    useDataHandling({
      isError,
      isLoading,
      isSuccess,
      length: categoryData?.data?.incidentCategories?.length,
    });

  // handle side effects on category create
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
            navigate(URLSecondLevelCategory(String(firstCategoryId)));
          }}
          className="back_btn"
        >
          <BackIcon /> Back
        </button>

        {/* ADD BUTTON */}
        <button onClick={handleAddThirdCategory} className="main_btn">
          <PlusIcon /> Add Third Level Category
        </button>
      </div>
      <div className="bg-whiteColor rounded-lg pb-4">
        {/* LOADING SKELETON */}
        {isDataLoading && <TableSkeleton />}

        {/* ERROR */}
        {isDataError && <ErrorPage />}

        {/* DATA NOT FOUND */}
        {dataNotFound && <NotFound />}

        {/* TABLE */}
        {isDataSuccess && (
          <Table className="min-w-[550px]">
            <div className="mx-8 mt-4">
              {/* TABLE TITLE */}
              <TitleRow
                data={thirdCategoryData?.[0]?.parentCategory?.incidentCategorys}
                title="Second Level Category"
              />
            </div>

            {/* TABLE HEADER */}
            <TableHeader
              data={[
                {
                  title: "Third Level Category",
                  w: "30%",
                },
                {
                  title: "",
                  w: "140px",
                },
              ]}
            />

            {/* TABLE BODY */}
            {thirdCategoryData?.map((item, index) => (
              <TableBody
                key={index}
                index={index}
                length={thirdCategoryData?.length}
                data={[
                  {
                    title: (
                      <div className="font-bold">{item?.incidentCategorys}</div>
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
                          onClick={() => handleEditThirdCategory(item)}
                          icon={<BiEdit className="text-violetColor" />}
                          text="Edit"
                        />
                        <TableButton
                          className=""
                          onClick={() =>
                            handleDeleteCategory(Number(item?.categoryId))
                          }
                          icon={<BiTrash className="text-redColor" />}
                          text="Delete"
                        />
                      </div>
                    ),
                    w: "140px",
                  },
                ]}
              />
            ))}
          </Table>
        )}

        {/* PAGINATION */}
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

      {/* CREATE CATEGORY MODAL */}
      {addModal?.modalId === categoriesModalTypes?.addThirdLevelCategories && (
        <CreateThirdCategory toggler={closeModal} />
      )}

      {/* EDIT CATEGORY MODAL */}
      {editModal?.modalId ===
        categoriesModalTypes?.editThirdLevelCategories && (
        <EditThirdCategory toggler={closeModal} />
      )}
    </div>
  );
};

export default ThirdLevelCategoryTable;
