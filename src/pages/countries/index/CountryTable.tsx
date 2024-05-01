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
import { Country } from "@/constants/api-interface";
import { countryModalTypes } from "@/constants/modal-types/modal-types";
import {
  useDeleteCountryMutation,
  useReadCountriesByPageQuery,
} from "@/features/country/country-api";
import {
  closeAddModal,
  closeEditModal,
  openAddModal,
  openEditModal,
} from "@/features/modal/modal-slice";
import useDataHandling from "@/hooks/shared/useDataHandle";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import useWindowWidth from "@/hooks/shared/useWindowWidth";
import { URLProvince } from "@/routers/routes-link";
import { swalWarning } from "@/utilities/swal-fire";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CreateCountry from "../create/CreateCountry";
import EditCountry from "../edit/EditCountry";

const CountryTable = () => {
  const { addModal, editModal } = useSelector(
    (state: RootState) => state.modal
  );
  const W768 = useWindowWidth(768);
  const W1280 = useWindowWidth(1280);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // pagination hook
  const paginationDefaultShowValue = [10, 20, 30, 50];
  const { setStart, start, setTake, take, activePage, setActivePage } =
    usePagination({
      paginationDefaultShowValue,
    });

  // Read Country Data
  const {
    data: countriesData,
    isLoading,
    isError,
    isSuccess,
  } = useReadCountriesByPageQuery({
    start,
    take,
  });

  const { dataNotFound, isDataError, isDataLoading, isDataSuccess } =
    useDataHandling({
      isError,
      isLoading,
      isSuccess,
      length: countriesData?.data?.country?.length,
    });

  // Delete Hook
  const [
    deleteCountry,
    {
      data: countryDeleteRes,
      status: deleteStatus,
      isError: isDeleteError,
      error: deleteError,
      isSuccess: isDeleteSuccess,
    },
  ] = useDeleteCountryMutation();

  // Delete SideEffect
  useCreateSideEffects({
    error: deleteError,
    isError: isDeleteError,
    isSuccess: isDeleteSuccess,
    status: deleteStatus,
    message: "country",
    messageType: "delete",
    response: countryDeleteRes,
  });

  //Add Country Modal handler
  const handleAddCountry = () => {
    dispatch(
      openAddModal({
        modalId: countryModalTypes?.addCountry,
        data: null,
      })
    );
  };

  //Edit Country Modal handler
  const handleEditCountry = (data: Country) => {
    dispatch(
      openEditModal({
        modalId: countryModalTypes?.editCountry,
        data,
      })
    );
  };

  //Close Modal Handler
  const closeModal = () => {
    dispatch(closeAddModal());
    dispatch(closeEditModal());
  };

  //Delete Alert
  const deleteFunction = (id: string) => {
    Swal.fire(swalWarning({}))?.then((result) => {
      if (result.isConfirmed) {
        deleteCountry(id);
      }
    });
  };

  return (
    <>
      <div className="flex justify-end mb-3">
        <button onClick={handleAddCountry} className="main_btn">
          <PlusIcon /> Add Country
        </button>
      </div>
      <div className="bg-whiteColor rounded-lg pb-4">
        {isDataLoading && <TableSkeleton />}
        {isDataError && <ErrorPage />}
        {dataNotFound && <NotFound />}
        {isDataSuccess && (
          <Table className="min-w-[450px]">
            <TableHeader
              data={[
                {
                  title: "Country",
                  w: W768 ? "30%" : "40%",
                },
                {
                  title: "",
                  w: "180px",
                },
              ]}
            />
            {countriesData?.data?.country?.map((country: Country, index) => (
              <TableBody
                key={index}
                index={index}
                length={countriesData?.data?.country?.length}
                data={[
                  {
                    title: country?.countryName,
                    w: W768 ? "30%" : "40%",
                  },
                  {
                    title: (
                      <div className="flex ">
                        <TableButton
                          className="border-r border-borderColor pe-3 me-3 "
                          onClick={() => handleEditCountry(country)}
                          icon={<BiEdit className="text-violetColor" />}
                          text="Edit"
                        />
                        <TableButton
                          className="border-r border-borderColor pe-3 me-3"
                          onClick={() => deleteFunction(String(country?.oid))}
                          icon={<BiTrash className="text-redColor" />}
                          text="Delete"
                        />
                        <TableButton
                          className="text-violetColor"
                          onClick={() => {
                            navigate(URLProvince(String(country?.oid)));
                          }}
                          text="Provinces"
                        />
                      </div>
                    ),
                    w: W1280 ? "180px" : "200px",
                  },
                ]}
              />
            ))}
          </Table>
        )}

        {/* Pagination Component */}
        <div className="flex justify-end mx-5">
          <CustomPagination
            take={take}
            activePage={activePage}
            setActivePage={setActivePage}
            setTake={setTake}
            start={start}
            setStart={setStart}
            totalItemsCount={countriesData?.data?.totalRows ?? 0}
            showInPage={paginationDefaultShowValue}
          />
        </div>
      </div>

      {/* Create Country Component */}
      {addModal?.modalId === countryModalTypes?.addCountry && (
        <CreateCountry toggler={closeModal} />
      )}

      {/* Edit Country Component */}
      {editModal?.modalId === countryModalTypes?.editCountry && (
        <EditCountry toggler={closeModal} />
      )}
    </>
  );
};

export default CountryTable;
