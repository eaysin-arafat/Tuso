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
import TitleRow from "@/components/core/table/TitleRow";
import ErrorPage from "@/components/error-page/ErrorPage";
import NotFound from "@/components/not-found/NotFound";
import TableButton from "@/components/shared/table-button/TableButton";
import { Districts } from "@/constants/api-interface";
import { districtModalTypes } from "@/constants/modal-types/modal-types";
import {
  useDeleteDistrictMutation,
  useReadDistrictByProvincePageQuery,
} from "@/features/district/district-api";
import {
  closeAddModal,
  closeEditModal,
  openAddModal,
  openEditModal,
} from "@/features/modal/modal-slice";
import useDataHandling from "@/hooks/shared/useDataHandle";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { URLFacility } from "@/routers/routes-link";
import { swalWarning } from "@/utilities/swal-fire";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import CreateDistrict from "../create/CreateDistrict";
import EditDistrict from "../edit/EditDistrict";

const DistrictTable = () => {
  //Add and Edit modal data from redux store
  const { addModal, editModal } = useSelector(
    (state: RootState) => state.modal
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // pagination hook
  const paginationDefaultShowValue = [10, 20, 30, 50];
  const { setStart, start, setTake, take, activePage, setActivePage } =
    usePagination({
      paginationDefaultShowValue,
    });

  // Country Id
  const { countryId } = useParams<{ countryId: string }>();

  // Province Id
  const { provinceId } = useParams<{ provinceId: string }>();

  // Read District By Province hook
  const {
    data: districtData,
    isError,
    isLoading,
    isSuccess,
  } = useReadDistrictByProvincePageQuery({
    key: provinceId,
    start,
    take,
  });

  // Data Status Handler hook
  const { dataNotFound, isDataError, isDataLoading, isDataSuccess } =
    useDataHandling({
      isError,
      isLoading,
      isSuccess,
      length: districtData?.data?.district?.length,
    });

  // District Delete Hook
  const [
    deleteDistrict,
    {
      data: districtRes,
      error: deleteError,
      isError: isDeleteError,
      isSuccess: isDeleteSuccess,
      status: deleteStatus,
    },
  ] = useDeleteDistrictMutation();

  // Country and Province Name
  const countryName = districtData?.data?.district[0]?.countryName;
  const provinceName = districtData?.data?.district[0]?.provinceName;

  // Create District modal open handler
  const handleAddDistrict = () => {
    dispatch(
      openAddModal({
        modalId: districtModalTypes?.addDistrict,
        data: {
          provinceName,
          countryName,
        },
      })
    );
  };

  // Edit District modal open handler
  const handleEditDistrict = (formData: Districts) => {
    dispatch(
      openEditModal({
        modalId: districtModalTypes?.editDistrict,
        data: {
          provinceName,
          countryName,
          formData,
        },
      })
    );
  };

  // Close Modal handler
  const closeModal = () => {
    dispatch(closeAddModal());
    dispatch(closeEditModal());
  };

  // Delete Alert
  const handleDelete = (id: number) => {
    Swal.fire(swalWarning({})).then((result) => {
      if (result.isConfirmed) {
        deleteDistrict(id);
      }
    });
  };

  // District Delete Sideeffect
  useCreateSideEffects({
    error: deleteError,
    isError: isDeleteError,
    isSuccess: isDeleteSuccess,
    status: deleteStatus,
    message: "district",
    messageType: "delete",
    response: districtRes,
  });

  return (
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

        {/* Add Button  */}
        <button onClick={handleAddDistrict} className="main_btn">
          <PlusIcon /> Add District
        </button>
      </div>
      <div className="bg-whiteColor rounded-lg pb-4">
        {isDataError && <ErrorPage />}
        {isDataLoading && <TableSkeleton />}
        {dataNotFound && <NotFound />}
        {isDataSuccess && (
          <>
            {/* District List Table  */}
            <div className="pt-5 px-8 space-y-1">
              <TitleRow data={countryName} title="Country Name" />
              <TitleRow data={provinceName} title="Province Name" />
            </div>

            <Table className="min-w-[550px]">
              <TableHeader
                data={[
                  {
                    title: "District",
                    w: "30%",
                  },
                  {
                    title: "",
                    w: "200px",
                  },
                ]}
              />
              {districtData?.data?.district?.map((district, index) => (
                <TableBody
                  key={index}
                  index={index}
                  length={districtData?.data?.district?.length}
                  data={[
                    {
                      title: district?.districtName,
                      w: "30%",
                    },
                    {
                      title: (
                        <div className="flex ">
                          <TableButton
                            className="border-r border-borderColor pe-3 me-3 "
                            onClick={() => handleEditDistrict(district)}
                            icon={<BiEdit className="text-violetColor" />}
                            text="Edit"
                          />
                          <TableButton
                            className="border-r border-borderColor pe-3 me-3"
                            onClick={() => handleDelete(district?.id)}
                            icon={<BiTrash className="text-redColor" />}
                            text="Delete"
                          />
                          <TableButton
                            className="text-violetColor"
                            onClick={() => {
                              navigate(
                                URLFacility(
                                  countryId,
                                  provinceId,
                                  String(district?.id)
                                )
                              );
                            }}
                            text="Facilities"
                          />
                        </div>
                      ),
                      w: "200px",
                    },
                  ]}
                />
              ))}
            </Table>
          </>
        )}

        {/* Pagination Component  */}
        <div className="flex justify-end mx-5">
          <CustomPagination
            take={take}
            setTake={setTake}
            start={start}
            setStart={setStart}
            totalItemsCount={districtData?.data?.totalRows ?? 0}
            showInPage={paginationDefaultShowValue}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </div>
      </div>

      {/* Open Create Modal  */}
      {addModal?.modalId === districtModalTypes?.addDistrict && (
        <CreateDistrict toggler={closeModal} />
      )}

      {/* Open Edit Modal  */}
      {editModal?.modalId === districtModalTypes?.editDistrict && (
        <EditDistrict toggler={closeModal} />
      )}
    </div>
  );
};

export default DistrictTable;
