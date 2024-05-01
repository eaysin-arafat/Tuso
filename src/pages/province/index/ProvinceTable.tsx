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
import ErrorPage from "@/components/error-page/ErrorPage";
import NotFound from "@/components/not-found/NotFound";
import TableButton from "@/components/shared/table-button/TableButton";
import { Province } from "@/constants/api-interface";
import { provinceModalTypes } from "@/constants/modal-types/modal-types";
import {
  closeAddModal,
  closeEditModal,
  openAddModal,
  openEditModal,
} from "@/features/modal/modal-slice";
import {
  useDeleteProvinceMutation,
  useReadProvinceByCountryPageQuery,
} from "@/features/province/province-api";
import useDataHandling from "@/hooks/shared/useDataHandle";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { URLCountry, URLDistrict } from "@/routers/routes-link";
import { swalWarning } from "@/utilities/swal-fire";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import CreateProvince from "../create/CreateProvince";
import EditProvince from "../edit/EditProvince";

/**
 * @description ProvinceTable component
 */
const ProvinceTable = () => {
  // get modal state from redux store
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

  // navigator
  const navigate = useNavigate();

  // action dispatcher
  const dispatch = useDispatch();

  // get country id from url
  const { countryId } = useParams<{ countryId: string }>();

  // read province by country query
  const {
    data: provinceData,
    isError,
    isLoading,
    isSuccess,
  } = useReadProvinceByCountryPageQuery({
    key: countryId,
    start,
    take,
  });

  // delete province mutation
  const [
    deleteProvince,
    {
      data: response,
      error: deleteError,
      isError: isDeleteError,
      isSuccess: isDeleteSuccess,
      status: deleteStatus,
    },
  ] = useDeleteProvinceMutation();

  // add province handler
  const handleAddProvince = () => {
    dispatch(
      openAddModal({
        modalId: provinceModalTypes?.addProvince,
        data: provinceData?.data?.province[0]?.countryName,
      })
    );
  };

  // edit province handler
  const handleEditProvince = (formData: Province) => {
    dispatch(
      openEditModal({
        modalId: provinceModalTypes?.editProvince,
        data: { formData, countryName: formData?.countryName },
      })
    );
  };

  // close modal handler
  const closeModal = () => {
    dispatch(closeAddModal());
    dispatch(closeEditModal());
  };

  // delete province handler
  const handleDelete = (id: string) => {
    Swal.fire(swalWarning({})).then((result) => {
      if (result.isConfirmed) {
        deleteProvince(id);
      }
    });
  };

  // data handling hooks
  const { dataNotFound, isDataError, isDataLoading, isDataSuccess } =
    useDataHandling({
      isError,
      isLoading,
      isSuccess,
      length: provinceData?.data?.province?.length,
    });

  // create side effect hooks
  useCreateSideEffects({
    error: deleteError,
    isError: isDeleteError,
    isSuccess: isDeleteSuccess,
    status: deleteStatus,
    message: "province",
    messageType: "delete",
    response,
    isToggle: false,
  });

  return (
    <>
      <div className="flex justify-between mb-3">
        {/* BACK BUTTON */}
        <button
          onClick={() => {
            navigate(URLCountry());
          }}
          className="back_btn"
        >
          <BackIcon /> Back
        </button>

        {/* ADD BUTTON */}
        <button onClick={handleAddProvince} className="main_btn">
          <PlusIcon /> Add Province
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
            {/* TABLE HEADER */}
            <TableHeader
              data={[
                {
                  title: "Country",
                  w: "30%",
                },
                {
                  title: "Province",
                  w: "30%",
                },
                {
                  title: "",
                  w: "200px",
                },
              ]}
            />

            {/* TABLE BODY */}
            {provinceData?.data?.province?.map(
              (province: Province, index: number) => (
                <TableBody
                  key={index}
                  index={index}
                  length={provinceData?.data?.province?.length}
                  data={[
                    {
                      title: province?.countryName,
                      w: "30%",
                    },
                    {
                      title: province?.provinceName,
                      w: "30%",
                    },
                    {
                      title: (
                        <div className="flex ">
                          <TableButton
                            className="border-r border-borderColor pe-3 me-3 "
                            onClick={() => handleEditProvince(province)}
                            icon={<BiEdit className="text-violetColor" />}
                            text="Edit"
                          />
                          <TableButton
                            className="border-r border-borderColor pe-3 me-3"
                            onClick={() =>
                              handleDelete(String(province?.provinceId))
                            }
                            icon={<BiTrash className="text-redColor" />}
                            text="Delete"
                          />
                          <TableButton
                            className="text-violetColor"
                            onClick={() => {
                              navigate(
                                URLDistrict(
                                  countryId,
                                  String(province?.provinceId)
                                )
                              );
                            }}
                            text="Districts"
                          />
                        </div>
                      ),
                      w: "200px",
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
            totalItemsCount={provinceData?.data?.province?.length}
            showInPage={paginationDefaultShowValue}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </div>
      </div>

      {/* CREATE PROVINCE MODAL */}
      {addModal?.modalId === provinceModalTypes?.addProvince && (
        <CreateProvince toggler={closeModal} />
      )}

      {/* EDIT PROVINCE MODAL */}
      {editModal?.modalId === provinceModalTypes?.editProvince && (
        <EditProvince toggler={closeModal} />
      )}
    </>
  );
};

export default ProvinceTable;
