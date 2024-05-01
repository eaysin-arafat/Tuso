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
import { Facility } from "@/constants/api-interface/Facility";
import facilityEnums from "@/constants/enum/Facility";
import { facilityModalTypes } from "@/constants/modal-types/modal-types";
import { useReadCountriesQuery } from "@/features/country/country-api";
import {
  useDeleteFacilityMutation,
  useReadFacilitiesByDistrictPageQuery,
} from "@/features/facility/facility-api";
import {
  closeAddModal,
  closeEditModal,
  openAddModal,
  openEditModal,
} from "@/features/modal/modal-slice";
import { useReadProvincesQuery } from "@/features/province/province-api";
import useDataHandling from "@/hooks/shared/useDataHandle";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import useWindowWidth from "@/hooks/shared/useWindowWidth";
import { URLItExpert } from "@/routers/routes-link";
import { getItemById } from "@/utilities/get-item-by-key";
import { swalWarning } from "@/utilities/swal-fire";
import React from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import CreateFacility from "../create/CreateFacility";
import EditFacility from "../edit/EditFacility";

const FacilityTable = () => {
  // Add and Edit modal data from redux store
  const { addModal, editModal } = useSelector(
    (state: RootState) => state.modal
  );

  const w1300 = useWindowWidth(1300);

  // Navigation hook
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // pagination hook
  const paginationDefaultShowValue = [10, 20, 30, 50];
  const { setStart, start, setTake, take, activePage, setActivePage } =
    usePagination({
      paginationDefaultShowValue,
    });

  // Local State
  const [search, setSearch] = React.useState("");
  const { districtId, countryId, provinceId } = useParams<{
    countryId: string;
    provinceId: string;
    districtId: string;
  }>();

  // Read Facilities By District hook
  const {
    data: facilityData,
    isError,
    isLoading,
    isSuccess,
  } = useReadFacilitiesByDistrictPageQuery({
    key: districtId,
    start,
    take,
    search: search,
  });

  //Read Province and Country
  const { data: province } = useReadProvincesQuery(undefined);
  const { data: countries } = useReadCountriesQuery(undefined);

  // Delete Facility hook
  const [
    deleteFacility,
    {
      data: deleteFacilityRes,
      error: deleteError,
      isError: isDeleteError,
      isSuccess: isDeleteSuccess,
      status: deleteStatus,
    },
  ] = useDeleteFacilityMutation();

  // Province and District name populate
  const districtName = facilityData?.data?.facility[0]?.districtName;
  const provinceName = getItemById(
    { item: province?.data, key: "oid" },
    {
      id: Number(provinceId),
      key: "provinceName",
    }
  );

  // Country Name Populate
  const countryName = getItemById(
    { item: countries?.data, key: "oid" },
    {
      id: Number(countryId),
      key: "countryName",
    }
  );

  // Data Status Handler
  const { dataNotFound, isDataError, isDataLoading, isDataSuccess } =
    useDataHandling({
      isError,
      isLoading,
      isSuccess,
      length: facilityData?.data?.facility?.length,
    });

  // Data Delete SideEffect
  useCreateSideEffects({
    error: deleteError,
    isError: isDeleteError,
    isSuccess: isDeleteSuccess,
    status: deleteStatus,
    message: "facility",
    messageType: "delete",
    response: deleteFacilityRes,
  });

  // Create Facility Modal open handler
  const handleAddFacility = () => {
    dispatch(
      openAddModal({
        modalId: facilityModalTypes?.addFacility,
        data: { districtName, provinceName, countryName },
      })
    );
  };

  // Edit Facility Modal open handler
  const handleEditFacility = (formData: Facility) => {
    dispatch(
      openEditModal({
        modalId: facilityModalTypes?.editFacility,
        data: { formData, districtName, provinceName, countryName },
      })
    );
  };

  // Close Modal handler
  const closeModal = () => {
    dispatch(closeAddModal());
    dispatch(closeEditModal());
  };

  // Delete Alert
  const handleDelete = (id: string) => {
    Swal.fire(swalWarning({})).then((result) => {
      if (result.isConfirmed) {
        deleteFacility(id);
      }
    });
  };

  return (
    <div className="">
      <div className="flex flex-wrap md:flex-nowrap justify-between mb-3 gap-5">
        {/* Back button  */}
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="back_btn order-1"
        >
          <BackIcon /> Back
        </button>
        {/* Search input  */}
        <input
          type="search"
          placeholder="Search By Facility Name"
          className="custom_input py-2 md:py-1 rounded-md order-3 md:order-2 w-full"
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* Add Facility Button */}
        <button
          onClick={handleAddFacility}
          className="main_btn order-2 md:order-3"
        >
          <PlusIcon /> Add Facility
        </button>
      </div>

      <div className="bg-whiteColor rounded-lg pb-4">
        {isDataLoading && <TableSkeleton />}
        {isDataError && <ErrorPage />}
        {dataNotFound && <NotFound />}
        {isDataSuccess && (
          <Table className="min-w-[1400px]">
            <TableHeader
              data={[
                {
                  title: "District",
                  w: "250px",
                },
                {
                  title: "Facility",
                  w: "450px",
                },
                {
                  title: "F.Master Code",
                  w: "300px",
                },
                {
                  title: "Facility Type",
                  w: "300px",
                },
                {
                  title: "HMIS Code",
                  w: "300px",
                },
                {
                  title: "latitude",
                  w: "300px",
                },
                {
                  title: "Longitude",
                  w: "300px",
                },
                {
                  title: "Location",
                  w: "300px",
                },
                {
                  title: "Ownership",
                  w: "300px",
                },
                {
                  title: "Is Private",
                  w: "200px",
                },
                {
                  title: "",
                  w: w1300 ? "550px" : "620px",
                },
              ]}
            />
            {facilityData?.data?.facility?.map((facility, index) => (
              <TableBody
                key={index}
                index={index}
                length={facilityData?.data?.facility?.length}
                data={[
                  {
                    title: districtName,
                    w: "250px",
                  },
                  {
                    title: facility?.facilityName,
                    w: "450px",
                  },
                  {
                    title: facility?.facilityMasterCode,
                    w: "300px",
                  },
                  {
                    title: facilityEnums?.facilityType[facility?.facilityType],
                    w: "300px",
                  },
                  {
                    title: facility?.hmisCode,
                    w: "300px",
                  },
                  {
                    title: facility?.latitude,
                    w: "300px",
                  },
                  {
                    title: facility?.longitude,
                    w: "300px",
                  },
                  {
                    title: facilityEnums?.location[facility?.location],
                    w: "300px",
                  },
                  {
                    title: facilityEnums?.ownership[facility?.ownership],
                    w: "300px",
                  },
                  {
                    title: facility?.isPrivate ? "Yes" : "No",
                    w: "200px",
                  },
                  {
                    title: (
                      <div className="flex ">
                        <TableButton
                          className="border-r border-borderColor pe-3 me-3 "
                          onClick={() => handleEditFacility(facility)}
                          icon={<BiEdit className="text-violetColor" />}
                          text="Edit"
                        />
                        <TableButton
                          className="border-r border-borderColor pe-3 me-3"
                          onClick={() =>
                            handleDelete(String(facility?.facilityId))
                          }
                          icon={<BiTrash className="text-redColor" />}
                          text="Delete"
                        />
                        <TableButton
                          className="text-violetColor"
                          onClick={() => {
                            navigate(
                              URLItExpert(
                                countryId,
                                provinceId,
                                districtId,
                                String(facility?.facilityId)
                              )
                            );
                          }}
                          text="IT Expert"
                        />
                      </div>
                    ),
                    w: w1300 ? "550px" : "620px",
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
            totalItemsCount={facilityData?.data?.totalRows}
            showInPage={paginationDefaultShowValue}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </div>
      </div>

      {/* Create Facility Modal  */}
      {addModal?.modalId === facilityModalTypes?.addFacility && (
        <CreateFacility toggler={closeModal} />
      )}

      {/* Edit Facility Modal  */}
      {editModal?.modalId === facilityModalTypes?.editFacility && (
        <EditFacility toggler={closeModal} />
      )}
    </div>
  );
};

export default FacilityTable;
