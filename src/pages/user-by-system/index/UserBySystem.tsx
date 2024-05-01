/*
 * Created by: Andrew
 * Date created: 10.11.2023
 * Modified by: Andrew
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import BackIcon from "@/assets/icons/Back";
import CustomPagination from "@/components/core/custom-pagination/CustomPagination";
import usePagination from "@/components/core/custom-pagination/usePagination";
import TableSkeleton from "@/components/core/loader/TableSkeleton";
import Table from "@/components/core/table/Table";
import TableBody from "@/components/core/table/TableBody";
import TableHeader from "@/components/core/table/TableHeader";
import TitleRow from "@/components/core/table/TitleRow";
import ErrorPage from "@/components/error-page/ErrorPage";
import NotFound from "@/components/not-found/NotFound";
import { useReadSystemPermissionByProjectQuery } from "@/features/system-permission/system-permission-api";
import useDataHandling from "@/hooks/shared/useDataHandle";
import { URLSystem } from "@/routers/routes-link";
import { useNavigate, useParams } from "react-router-dom";

/**
 * @description User by system component
 */
const UserBySystem = () => {
  // navigator
  const navigate = useNavigate();

  // get system id from url
  const { systemId } = useParams<{ systemId: string }>();

  // per page items count
  const paginationDefaultShowValue = [10, 20, 30, 50];

  // use pagination hooks
  const { setStart, start, setTake, take, activePage, setActivePage } =
    usePagination({
      paginationDefaultShowValue,
    });

  // read system permission by project query
  const {
    data: systemData,
    isError,
    isLoading,
    isSuccess,
  } = useReadSystemPermissionByProjectQuery(
    { key: systemId, start, take },
    {
      skip: !systemId,
      refetchOnMountOrArgChange: true,
    }
  );

  // data handling hooks
  const { dataNotFound, isDataError, isDataLoading, isDataSuccess } =
    useDataHandling({
      isError,
      isLoading,
      isSuccess,
      length: systemData?.data?.systemPermission?.length,
    });

  return (
    <div className="">
      <div className="flex justify-end mb-3">
        {/* BACK BUTTON */}
        <button
          onClick={() => {
            navigate(URLSystem());
          }}
          className="back_btn"
        >
          <BackIcon /> Back
        </button>
      </div>

      <div className="bg-whiteColor rounded-lg pb-4">
        {/* TABLE SKELETON */}
        {isDataLoading && <TableSkeleton />}

        {/* ERROR MESSAGE */}
        {isDataError && <ErrorPage />}

        {/* NOT FOUND */}
        {dataNotFound && <NotFound />}

        {/* TABLE */}
        {isDataSuccess && (
          <Table className="">
            {/* TITLE ROW */}
            <TitleRow
              data={systemData?.data?.systemPermission[0]?.systemName}
              title="System"
              className="pt-5 px-8"
            />

            {/* TABLE HEADER */}
            <TableHeader
              data={[
                {
                  title: "Username",
                  w: "50%",
                },
              ]}
            />

            {/* TABLE BODY */}
            {systemData?.data?.systemPermission?.map((user, index) => (
              <TableBody
                key={index}
                index={index}
                length={systemData?.data?.systemPermission?.length}
                data={[
                  {
                    title: user?.username,
                    w: "50%",
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
            totalItemsCount={systemData?.data?.totalRows}
            showInPage={paginationDefaultShowValue}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </div>
      </div>
    </div>
  );
};

export default UserBySystem;
