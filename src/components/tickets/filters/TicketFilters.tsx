/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import AdvanceSearchForm from "@/components/advance-search-form/AdvanceSearchForm";
import Drawer from "@/components/core/drawer/Drawer";
import Input from "@/components/core/form-elements/Input";
import Select from "@/components/core/form-elements/Select";
import { User } from "@/constants/api-interface";
import useWindowWidth from "@/hooks/shared/useWindowWidth";
import { TypeAdvanceSearch } from "@/pages/tickets/Index/Index";
import { styles } from "@/utilities/cn";
import React, { ChangeEvent } from "react";
import { VscRefresh } from "react-icons/vsc";

/**
 * ProvincialFilters component
 * @description Component representing the filters for provincial reports.
 * @param {Function} handleAdvanceSearch - Function to handle the advance search action.
 * @returns {JSX.Element} ProvincialFilters component
 */

type FilterTypes = {
  handleAdvanceSearch: () => void;
  statusChange: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  setAssignFilter: (value: string) => void;
  assignFilter: string;
  setUsernameFilter: (value: string) => void;
  usernameFilter: string;
  handleFormChange: (e: ChangeEvent<HTMLInputElement>) => void;
  advanceSearch: TypeAdvanceSearch;
  setAdvanceSearch: React.Dispatch<React.SetStateAction<TypeAdvanceSearch>>;
  refetch?: () => void;
  classStr?: string;
  user: User;
  clientTicketNo: string;
  clientStatus: string;
  setClientTicketNo: (value: string) => void;
  setClientStatus: (value: string) => void;
};

const TicketFilters = ({
  handleAdvanceSearch,
  statusChange,
  setAssignFilter,
  assignFilter,
  // ticketNoFilter,
  setUsernameFilter,
  setAdvanceSearch,
  advanceSearch,
  refetch,
  classStr,
  user,
  clientTicketNo,
  clientStatus,
  setClientTicketNo,
  setClientStatus,
  usernameFilter,
}: FilterTypes) => {
  const W768 = useWindowWidth(768);
  const [openFilter, setOpenFilter] = React.useState(true);
  const expertMember = user?.roleId === 4 && !user?.isTeamLead;

  const handleRefresh = () => {
    setAdvanceSearch({
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
    setAssignFilter("All");
    setUsernameFilter("");
    setClientStatus("");
    setClientTicketNo("");

    if (refetch) {
      refetch();
    }
  };

  React.useEffect(() => {
    if (W768) {
      setOpenFilter(false);
    } else {
      setOpenFilter(true);
    }
  }, [W768]);

  if (user?.roleId === 1) {
    return (
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Select
          isHideSelect
          onChange={(e) => setClientStatus(e.target.value)}
          value={clientStatus}
        >
          <option value="0">All</option>
          <option value="1">Open</option>
          <option value="2">Close</option>
        </Select>
        <Input
          placeholder="Search by Ticket no"
          value={clientTicketNo}
          onChange={(e) => setClientTicketNo(e.target.value)}
        />
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-7 gap-2 md:bg-transparent !p-0 rounded-lg ${
        openFilter && "bg-whiteColor !py-2 sm:items-end sm:justify-center"
      }`}
    >
      {user?.roleId !== 1 && openFilter && (
        <>
          <Select
            isHideSelect
            onChange={statusChange}
            value={advanceSearch?.status}
          >
            <option value="0">All</option>
            <option value="1">Open</option>
            <option value="2">Close</option>
            <option value="3">Resolved</option>
          </Select>

          {!expertMember && (
            <Select
              isHideSelect
              value={assignFilter}
              onChange={(e) => setAssignFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="1">Assign</option>
              <option value="2">Unassign</option>
            </Select>
          )}
          <Input
            placeholder="Search by Ticket no"
            value={advanceSearch?.ticketNo}
            onChange={(e) =>
              setAdvanceSearch((prev) => ({
                ...prev,
                ticketNo: e.target.value,
              }))
            }
          />
          <Input
            placeholder="Search by Username"
            value={usernameFilter}
            onChange={(e) => setUsernameFilter(e.target.value)}
          />

          {W768 ? (
            <Drawer>
              <div>
                <AdvanceSearchForm
                  advanceSearch={advanceSearch}
                  setAdvanceSearch={setAdvanceSearch}
                  handleAdvanceSearch={handleAdvanceSearch}
                  closeSearch={false}
                  refetch={refetch}
                />
              </div>
            </Drawer>
          ) : (
            <button
              className={`outline_btn py-2 2xl:pt-3 ${classStr}`}
              onClick={handleAdvanceSearch}
            >
              Advance Search
            </button>
          )}
          <button className="main_btn h-full" onClick={handleRefresh}>
            <VscRefresh size={18} />
          </button>
        </>
      )}

      {user?.roleId !== 1 && (
        <div className="grid md:block grid-cols-3 col-span-full md:col-span-full gap-3 items-center justify-center">
          <button
            onClick={() => setOpenFilter((prev) => !prev)}
            className={styles(
              "outline_btn py-[7px] col-span-full flex md:hidden justify-center w-fit",
              { "col-span-full w-full": openFilter }
            )}
          >
            Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default TicketFilters;
