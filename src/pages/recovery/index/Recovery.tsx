/*
 * Created by: Andrew
 * Date created: 10.02.2024
 * Modified by: Andrew
 * Last modified: 03.03.2024
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import CustomPagination from "@/components/core/custom-pagination/CustomPagination";
import usePagination from "@/components/core/custom-pagination/usePagination";
import Input from "@/components/core/form-elements/Input";
import TableSkeleton from "@/components/core/loader/TableSkeleton";
import Table from "@/components/core/table/Table";
import TableBody from "@/components/core/table/TableBody";
import TableHeader from "@/components/core/table/TableHeader";
import ErrorPage from "@/components/error-page/ErrorPage";
import NotFound from "@/components/not-found/NotFound";
import TableButton from "@/components/shared/table-button/TableButton";
import { RecoveryRequest } from "@/constants/api-interface";
import { recoveryModalTypes } from "@/constants/modal-types/modal-types";
import { closeAddModal, openAddModal } from "@/features/modal/modal-slice";
import { useReadRecoveryRequestsByPageQuery } from "@/features/recovery-request/recovery-request";
import useDataHandling from "@/hooks/shared/useDataHandle";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateRecovery from "../create/CreateRecovery";

/**
 * @description Recovery component
 */
const Recovery = () => {
  // get add modal from redux store
  const { addModal } = useSelector((state: RootState) => state.modal);

  // action dispatcher
  const dispatch = useDispatch();

  // per page items count
  const paginationDefaultShowValue = [10, 20, 30, 50];

  // pagination hooks
  const { setStart, start, setTake, take, activePage, setActivePage } =
    usePagination({
      paginationDefaultShowValue,
    });

  // search state
  const [search, setSearch] = React.useState("");

  // read recovery requests by page query
  const {
    data: userDataQuery,
    refetch,
    isError,
    isLoading,
    isSuccess,
  } = useReadRecoveryRequestsByPageQuery({
    start,
    take,
  });

  // search filtered data
  const searchFilteredData = userDataQuery?.data?.userTypes?.filter(
    (item: RecoveryRequest) => {
      const startsWith = item.username
        .toLowerCase()
        .startsWith(search.toLowerCase());
      const includes = item.username
        .toLowerCase()
        .includes(search.toLowerCase());

      return startsWith || (!startsWith && includes);
    }
  );

  // data handling hooks
  const { dataNotFound, isDataError, isDataLoading, isDataSuccess } =
    useDataHandling({
      isError,
      isLoading,
      isSuccess,
      length: searchFilteredData?.length,
    });

  // add recovery handler
  const handleAddRecovery = (user: RecoveryRequest) => {
    dispatch(
      openAddModal({
        modalId: recoveryModalTypes?.addRecovery,
        data: user,
      })
    );
  };

  // close modal handler
  const closeModal = () => {
    dispatch(closeAddModal());
  };

  return (
    <>
      {/* ERROR */}
      {isDataError && <ErrorPage />}

      {/* NOT FOUND */}
      {dataNotFound && <NotFound />}

      {/* LOADING SKELETON */}
      {isDataLoading && <TableSkeleton />}

      {isDataSuccess && (
        <div className="">
          {/* USERNAME  */}
          <div className="flex justify-end mb-4">
            <Input
              type="search"
              placeholder="Search by username..."
              name="search"
              parentClass="!w-80"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          {/* TABLE */}
          <div className="bg-whiteColor rounded-lg pb-4">
            <Table className="min-w-[550px]">
              {/* TABLE HEADER */}
              <TableHeader
                data={[
                  {
                    title: "Username",
                    w: "30%",
                  },
                  {
                    title: "Cellphone",
                    w: "30%",
                  },
                  {
                    title: "",
                    w: "300px",
                  },
                ]}
              />

              {/* TABLE BODY */}
              {searchFilteredData?.map(
                (user: RecoveryRequest, index: number) => (
                  <TableBody
                    key={index}
                    index={index}
                    length={searchFilteredData?.length}
                    data={[
                      {
                        title: user?.username,
                        w: "30%",
                      },
                      {
                        title: user?.cellphone,
                        w: "30%",
                      },
                      {
                        title: (
                          <div className="flex justify-end">
                            <TableButton
                              className="text-violetColor border border-violetColor px-2 py-0.5 rounded-md hover:bg-violetTransparentColor"
                              onClick={() => handleAddRecovery(user)}
                              text="Reset"
                            />
                          </div>
                        ),
                        w: "300px",
                      },
                    ]}
                  />
                )
              )}
            </Table>

            {/* PAGINATION */}
            <div className="flex justify-end mx-5">
              <CustomPagination
                take={take}
                setTake={setTake}
                start={start}
                setStart={setStart}
                totalItemsCount={
                  search
                    ? searchFilteredData?.length
                    : userDataQuery?.data?.userTypes?.length
                }
                showInPage={paginationDefaultShowValue}
                activePage={activePage}
                setActivePage={setActivePage}
              />
            </div>
          </div>

          {/* CREATE RECOVERY  MODAL*/}
          {addModal?.modalId === recoveryModalTypes?.addRecovery && (
            <CreateRecovery toggler={closeModal} refetch={refetch} />
          )}
        </div>
      )}
    </>
  );
};

export default Recovery;
