/*
 * Created by: Andrew
 * Date created: 10.02.2024
 * Modified by: Andrew
 * Last modified: 03.03.2024
 * Reviewed by:
 * Date Reviewed:
 */

import CustomPagination from "@/components/core/custom-pagination/CustomPagination";
import usePagination from "@/components/core/custom-pagination/usePagination";
import TableSkeleton from "@/components/core/loader/TableSkeleton";
import ErrorPage from "@/components/error-page/ErrorPage";
import NoPermission from "@/components/no-permission/NoPermission";
import NotFound from "@/components/not-found/NotFound";
import LifeCycleTable from "@/components/reports/ticket-lifecycle/table/Table";
import ReportFilters from "@/components/shared/report-filter/Filters";
import usePermissions from "@/components/sidebar/sidebar-routes-array/usePermissions";
import { useReadIncidentsByAdvancedSearchQuery } from "@/features/incidents/incidents-api";
import useDataHandling from "@/hooks/shared/useDataHandle";
import PageLayout from "@/layout/PageLayout";
import { TypeAdvanceSearch } from "@/pages/tickets/Index/Index";
import { useState } from "react";

/**
 * @description  TicketLifecycle component
 */
const TicketLifecycle = () => {
  // advance search state
  const [advanceSearch, setAdvanceSearch] = useState<TypeAdvanceSearch>({
    status: "0",
    fromDate: "",
    toDate: "",
    ticketNo: "",
    facilityId: "",
    provinceId: "",
    districtId: "",
    systemId: "",
    firstLevelCategoryId: "",
    secondLevelCategoryId: "",
    thirdLevelCategoryId: "",
  });

  // pagination default show value
  const paginationDefaultShowValue = [10, 20, 30, 50];
  const { setStart, start, setTake, take, activePage, setActivePage } =
    usePagination({
      paginationDefaultShowValue,
    });

  // status change handler
  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdvanceSearch((prev) => ({ ...prev, status: e.target.value }));
    // setDefaultStatus(e.target.value);
  };

  // read incidents by advanced search query
  const {
    data: report,
    isError,
    isLoading,
    isSuccess,
    refetch,
  } = useReadIncidentsByAdvancedSearchQuery(
    {
      start,
      take,
      ...advanceSearch,
      isresolved:
        advanceSearch?.status && advanceSearch?.status === "3" ? true : false,
    },
    { refetchOnMountOrArgChange: true }
  );

  // ticket lifecycle data
  const ticketLifecycleData = report?.data?.list;

  // filtered ticket data
  const filteredReports = ticketLifecycleData?.filter((ticket) => {
    // Filter by first level category
    if (
      advanceSearch?.firstLevelCategoryId &&
      !ticket?.description?.includes(advanceSearch?.firstLevelCategoryId)
    )
      return false;

    // Filter by second level category
    if (
      advanceSearch?.secondLevelCategoryId &&
      !ticket?.description?.includes(advanceSearch?.secondLevelCategoryId)
    )
      return false;

    // Filter by third level category
    if (
      advanceSearch?.thirdLevelCategoryId &&
      !ticket?.description?.includes(advanceSearch?.thirdLevelCategoryId)
    )
      return false;
    return true;
  });

  // data handling
  const { dataNotFound, isDataError, isDataLoading, isDataSuccess } =
    useDataHandling({
      isError,
      isLoading,
      isSuccess,
      length: ticketLifecycleData?.length,
    });

  // check permission
  const { reportPermission } = usePermissions();
  if (!reportPermission) return <NoPermission />;

  return (
    <PageLayout
      filter={
        // REPORT FILTERS
        <ReportFilters
          downloadFilename="Ticket-Lifecycle"
          advanceSearch={advanceSearch}
          setAdvanceSearch={setAdvanceSearch}
          closeSearch={true}
          refetch={refetch}
          data={filteredReports}
          statusChange={handleStatusChange}
          reportType="lifetime"
        />
      }
      // REPORT TITLE
      heading={{ title: "Ticket Lifecycle" }}
      // PAGINATION
      pagination={
        <CustomPagination
          take={take}
          setTake={setTake}
          start={start}
          setStart={setStart}
          totalItemsCount={report?.data?.totalIncident}
          showInPage={paginationDefaultShowValue}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      }
    >
      <div className="w-full">
        {/* LOADING SKELETON */}
        {isDataLoading && <TableSkeleton />}

        {/* ERROR */}
        {isDataError && <ErrorPage />}

        {/* NOT FOUND */}
        {dataNotFound && <NotFound />}

        {/* TABLE */}
        {isDataSuccess && <LifeCycleTable itemList={filteredReports || []} />}
      </div>
    </PageLayout>
  );
};

export default TicketLifecycle;
