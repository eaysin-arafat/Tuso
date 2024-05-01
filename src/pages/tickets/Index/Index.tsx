/*
 * Created by: Andrew
 * Date created: 10.02.2024
 * Modified by: Andrew
 * Last modified: 03.03.2024
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import AdvanceSearchForm from "@/components/advance-search-form/AdvanceSearchForm";
import CustomPagination from "@/components/core/custom-pagination/CustomPagination";
import usePagination from "@/components/core/custom-pagination/usePagination";
import TableSkeleton from "@/components/core/loader/TableSkeleton";
import ErrorPage from "@/components/error-page/ErrorPage";
import NoPermission from "@/components/no-permission/NoPermission";
import NotFound from "@/components/not-found/NotFound";
import usePermissions from "@/components/sidebar/sidebar-routes-array/usePermissions";
import TicketFilters from "@/components/tickets/filters/TicketFilters";
import TicketTable from "@/components/tickets/table/TicketTable";
import { OnchangeEventType } from "@/constants/interface/htmlEvents";
import { createTicketModalTypes } from "@/constants/modal-types/modal-types";
import {
  useReadIncidentsByAdvancedSearchQuery,
  useReadIncidentsByExpertMemberAdvancedSearchQuery,
  useReadIncidentsByExpertTeamLeadAdvancedSearchQuery,
  useReadIncidentsByUserIdQuery,
} from "@/features/incidents/incidents-api";
import { openAddModal } from "@/features/modal/modal-slice";
import useDataHandling from "@/hooks/shared/useDataHandle";
import useWindowWidth from "@/hooks/shared/useWindowWidth";
import PageLayout from "@/layout/PageLayout";
import { styles } from "@/utilities/cn";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

// advance search type
export type TypeAdvanceSearch = {
  status?: string;
  platform?: string;
  fromDate?: string;
  toDate?: string;
  ticketNo?: string;
  facilityId?: string;
  provinceId?: string;
  districtId?: string;
  systemId?: string;
  firstLevelCategoryId?: string;
  secondLevelCategoryId?: string;
  thirdLevelCategoryId?: string;
  userName?: string;
  deviceName?: string;
};

/**
 * @description Tickets component
 */
const Tickets = () => {
  // window width hooks for responsive design
  const W768 = useWindowWidth(768);

  // action dispatcher
  const dispatch = useDispatch();

  // get logged in user from redux
  const { user } = useSelector((state: RootState) => state.auth);

  // advance search modal toggle state
  const [openAdvancedSearch, setOpenAdvancedSearch] = React.useState(false);

  // assign filter state
  const [assignFilter, setAssignFilter] = useState<string>("All");

  // username filter state
  const [usernameFilter, setUsernameFilter] = useState<string>("");

  // client status state
  const [clientStatus, setClientStatus] = useState<string>("0");

  // client ticket no state
  const [clientTicketNo, setClientTicketNo] = useState<string>("");

  // advance search form state
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

  // form field change handler
  const handleFormChange = (e: OnchangeEventType) => {
    const { name, value } = e.target;
    setAdvanceSearch((prev) => ({ ...prev, [name]: value }));
  };

  // pagination default show value
  const paginationDefaultShowValue = [10, 20, 30, 50];
  const { setStart, start, setTake, take, activePage, setActivePage } =
    usePagination({
      paginationDefaultShowValue,
    });

  // status change handler
  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdvanceSearch((prev) => ({ ...prev, status: e.target.value }));
  };

  // read all tickets for expert members
  const {
    data: ticketsByExpertMember,
    isError: isMemberError,
    isLoading: isMemberLoading,
    isSuccess: isMemberSuccess,
  } = useReadIncidentsByExpertMemberAdvancedSearchQuery(
    {
      key: String(user?.oid),
      start,
      take,
      ...advanceSearch,
      isresolved:
        advanceSearch?.status && advanceSearch?.status === "3" ? true : false,
    },
    {
      skip: user?.roleId !== 4 || user?.isTeamLead,
      refetchOnMountOrArgChange: true,
    }
  );

  //  read all ticket for expert team lead
  const {
    data: ticketsByExpertLeader,
    isError: isLeaderError,
    isLoading: isLeaderLoading,
    isSuccess: isLeaderSuccess,
  } = useReadIncidentsByExpertTeamLeadAdvancedSearchQuery(
    {
      key: String(user?.teamId),
      start,
      take,
      ...advanceSearch,
      isresolved:
        advanceSearch?.status && advanceSearch?.status === "3" ? true : false,
    },
    {
      skip: !user?.teamId || user?.roleId !== 4 || !user?.isTeamLead,
      refetchOnMountOrArgChange: true,
    }
  );

  // Admin , Supervisor  , Agent
  const {
    data: tickets,
    refetch,
    isError: isAdminError,
    isLoading: isAdminLoading,
    isSuccess: isAdminSuccess,
  } = useReadIncidentsByAdvancedSearchQuery(
    {
      start,
      take,
      ...advanceSearch,
      isresolved:
        advanceSearch?.status && advanceSearch?.status === "3" ? true : false,
    },
    {
      skip: user?.roleId === 4 || user?.roleId === 1,
      refetchOnMountOrArgChange: true,
    }
  );

  // read client's tickets
  const {
    data: clientTickets,
    isError: isClientError,
    isLoading: isClientLoading,
    isSuccess: isClientSuccess,
  } = useReadIncidentsByUserIdQuery(
    {
      userAccountId: user?.oid,
      status: clientStatus,
      start,
      take,
    },
    { skip: user?.roleId !== 1, refetchOnMountOrArgChange: true }
  );

  // check if data is loading, error or success
  const isError =
    isClientError || isMemberError || isLeaderError || isAdminError;
  const isLoading =
    isClientLoading || isMemberLoading || isLeaderLoading || isAdminLoading;
  const isSuccess =
    isClientSuccess || isMemberSuccess || isLeaderSuccess || isAdminSuccess;

  // tickets length base on use role
  const clientLength = clientTickets?.data?.list?.length;
  const ticketsLength = tickets?.data?.list?.length;
  const leaderLength = ticketsByExpertLeader?.data?.list?.length;
  const memberLength = ticketsByExpertMember?.data?.list?.length;
  const length =
    (clientLength >= 0 ? String(clientLength) : undefined) ||
    (ticketsLength >= 0 ? String(ticketsLength) : undefined) ||
    (leaderLength >= 0 ? String(leaderLength) : undefined) ||
    (memberLength >= 0 ? String(memberLength) : undefined);

  // data handling hooks
  const { dataNotFound, isDataError, isDataLoading, isDataSuccess } =
    useDataHandling({
      isError,
      isLoading,
      isSuccess,
      length: Number(length),
    });

  // filtered tickets
  const filteredAdvanceSearch =
    ticketsByExpertLeader || ticketsByExpertMember || tickets || clientTickets;

  // user modal open handler
  const handleOpenUserModal = () => {
    dispatch(
      openAddModal({
        modalId: createTicketModalTypes?.addCreateTicket,
        data: null,
      })
    );
  };

  // advance search modal close handler
  const closeAdvanceSearch = () => setOpenAdvancedSearch(false);

  // filter tickets
  const filteredTickets = filteredAdvanceSearch?.data?.list?.filter(
    (ticket) => {
      if (assignFilter !== "All") {
        if (user?.roleId === 2) {
          if (assignFilter === "1" && !ticket?.thirdLevelCategory) return false;
          if (assignFilter === "2" && ticket?.thirdLevelCategory) return false;
        } else if (user?.roleId === 3) {
          if (assignFilter === "1" && !ticket?.teamName) return false;
          if (assignFilter === "2" && ticket?.teamName) return false;
        } else {
          if (assignFilter === "1" && !ticket?.expertName) return false;
          if (assignFilter === "2" && ticket?.expertName) return false;
        }
      }

      // Filter by username
      if (
        usernameFilter &&
        !ticket?.fullName
          ?.toLowerCase()
          ?.includes(usernameFilter?.toLowerCase())
      )
        return false;
      // Filter by ticket no
      if (clientTicketNo && !ticket?.ticketNo?.includes(clientTicketNo))
        return false;

      if (
        advanceSearch?.firstLevelCategoryId &&
        !(
          ticket?.firstLevelCategoryId ===
          Number(advanceSearch?.firstLevelCategoryId)
        )
      )
        return false;

      // filter based on second level category
      if (
        advanceSearch?.secondLevelCategoryId &&
        !(
          ticket?.secondLevelCategoryId ===
          Number(advanceSearch?.secondLevelCategoryId)
        )
      )
        return false;

      // filter based on third level category
      if (
        advanceSearch?.thirdLevelCategoryId &&
        !(
          ticket?.thirdLevelCategoryId ===
          Number(advanceSearch?.thirdLevelCategoryId)
        )
      )
        return false;

      return true;
    }
  );

  //  handle mouse click event
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        openAdvancedSearch !== false &&
        !target.closest(".dropdown-container")
      ) {
        setOpenAdvancedSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openAdvancedSearch]);

  // check create permission
  const isNotCreatePermission = user?.roleId === 4;

  // check user permission to access page
  const { ticketPermission } = usePermissions();

  // if no permission show no permission component
  if (!ticketPermission) return <NoPermission />;

  return (
    <div>
      {/* PAGE LAYOUT */}
      <PageLayout
        isNotCreatePermission={isNotCreatePermission}
        // TICKET FILTERS
        filter={
          <TicketFilters
            statusChange={handleStatusChange}
            setAssignFilter={setAssignFilter}
            assignFilter={assignFilter}
            setUsernameFilter={setUsernameFilter}
            usernameFilter={usernameFilter}
            handleAdvanceSearch={() => setOpenAdvancedSearch((prev) => !prev)}
            advanceSearch={advanceSearch}
            handleFormChange={handleFormChange}
            setAdvanceSearch={setAdvanceSearch}
            refetch={refetch}
            classStr="dropdown-container"
            user={user}
            clientTicketNo={clientTicketNo}
            clientStatus={clientStatus}
            setClientTicketNo={setClientTicketNo}
            setClientStatus={setClientStatus}
          />
        }
        // TITLE
        heading={{ title: "Tickets" }}
        // CREATE TICKETS BUTTON
        button={{
          buttonName: "Create Tickets",
          buttonIcon: <FaPlus />,
          onClick: handleOpenUserModal,
        }}
        // PAGINATION
        pagination={
          <CustomPagination
            take={take}
            setTake={setTake}
            start={start}
            setStart={setStart}
            totalItemsCount={filteredAdvanceSearch?.data?.totalIncident}
            showInPage={paginationDefaultShowValue}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        }
      >
        <div className="w-full relative">
          {/* LOADER */}
          {isDataLoading && <TableSkeleton />}

          {/* ERROR */}
          {isDataError && <ErrorPage />}

          {/* NOT FOUND */}
          {dataNotFound && <NotFound />}

          {/* TABLE */}
          {isDataSuccess && (
            <TicketTable user={user} userList={filteredTickets || []} />
          )}
          {!W768 && (
            <div
              className={styles(
                "bg-whiteColor absolute z-50 top-0 right-0 sm:right-9 xl:right-[400px] 2xl:right-[475px] w-full sm:w-[450px] border border-borderColor shadow-xl p-5 py-4 rounded-lg dropdown-container",
                { hidden: !openAdvancedSearch }
              )}
            >
              {/* ADVANCE SEARCH FORM */}
              <AdvanceSearchForm
                advanceSearch={advanceSearch}
                setAdvanceSearch={setAdvanceSearch}
                closeSearch={true}
                handleAdvanceSearch={closeAdvanceSearch}
                refetch={refetch}
              />
            </div>
          )}
        </div>
      </PageLayout>
    </div>
  );
};

export default Tickets;
