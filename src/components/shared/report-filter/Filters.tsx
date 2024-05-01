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
import ExportBtn from "@/components/core/form-elements/ExportBtn";
import Input from "@/components/core/form-elements/Input";
import Select from "@/components/core/form-elements/Select";
import { Incident } from "@/constants/api-interface";
import useWindowWidth from "@/hooks/shared/useWindowWidth";
import { TypeAdvanceSearch } from "@/pages/tickets/Index/Index";
import { styles } from "@/utilities/cn";
import { downloadCSV } from "@/utilities/download-csv";
import { downloadXLSX } from "@/utilities/download-xlsx";
import React, { useEffect } from "react";
import { VscRefresh } from "react-icons/vsc";

// report filter props type
type FilterTypes = {
  closeSearch: boolean;
  advanceSearch?: TypeAdvanceSearch;
  refetch?: () => void;
  data?: Incident[];
  statusChange: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  setAdvanceSearch?: React.Dispatch<React.SetStateAction<TypeAdvanceSearch>>;
  downloadFilename: string;
  reportType?: "weekly" | "lifetime" | "provincial" | "td";
};

/**
 * @description Report filters component
 */
const ReportFilters = ({
  advanceSearch,
  setAdvanceSearch,
  refetch,
  data,
  statusChange,
  downloadFilename = "ticket-lifecycle",
  reportType,
}: FilterTypes) => {
  // window width hook
  const W768 = useWindowWidth(768);

  // open advance search state
  const [openAdvancdSearch, setOpenAdvancdSearch] = React.useState(false);

  // close advance search handler
  const closeAdvanceSearch = () => setOpenAdvancdSearch(false);

  //  remove unwanted fields from data
  const updatedData = data?.slice()?.map((item) => {
    const newItem = { ...item };

    delete newItem?.provinceId;
    delete newItem?.districtId;
    delete newItem?.facilityId;
    delete newItem?.systemId;
    delete newItem?.firstLevelCategoryId;
    delete newItem?.secondLevelCategoryId;
    delete newItem?.thirdLevelCategoryId;
    delete newItem?.priorityId;
    delete newItem?.expertId;
    delete newItem?.assignTeamId;
    delete newItem?.assignId;

    for (const key in newItem) {
      if (
        Object.prototype.hasOwnProperty.call(newItem, key) &&
        (newItem[key] === null || newItem[key] === undefined)
      ) {
        newItem[key] = "";
      }
    }

    return newItem;
  });

  // refresh handler
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
    refetch();
  };

  // click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement; // Explicitly type event.target as HTMLElement
      if (
        openAdvancdSearch !== false &&
        !target.closest(".dropdown-container")
      ) {
        setOpenAdvancdSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openAdvancdSearch]);

  return (
    <div className="">
      <div
        className={`grid grid-cols-2 md:flex gap-2 md:bg-transparent !p-0 rounded-lg relative`}
      >
        <div className="col-span-full flex gap-2 items-center justify-center">
          {/* STATUS */}
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

          {/* INPUT FIELDS */}
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

          {/* REFRESH BUTTON */}
          <button className="main_btn py-3" onClick={handleRefresh}>
            <VscRefresh size={18} />
          </button>

          {/* EXPORT BUTTON */}
          <ExportBtn
            csvDownloadHandler={() =>
              downloadCSV(updatedData, downloadFilename)
            }
            xlsxDownloadHandler={() =>
              downloadXLSX(updatedData, downloadFilename)
            }
          />
        </div>

        <div className="col-span-full ">
          {W768 ? (
            <Drawer>
              <div>
                <AdvanceSearchForm
                  advanceSearch={advanceSearch}
                  setAdvanceSearch={setAdvanceSearch}
                  closeSearch={false}
                  refetch={refetch}
                  reportType={reportType}
                />
              </div>
            </Drawer>
          ) : (
            <div className="relative h-full">
              <button
                className="outline_btn dropdown-container h-full"
                onClick={() => setOpenAdvancdSearch((prev) => !prev)}
              >
                Advance Search
              </button>

              {!W768 && (
                <div
                  className={styles(
                    "bg-whiteColor absolute z-50 top-[60px] right-0 w-full sm:w-[450px] border border-borderColor shadow-xl p-5 py-4 rounded-lg dropdown-container",
                    { hidden: !openAdvancdSearch }
                  )}
                >
                  <AdvanceSearchForm
                    advanceSearch={advanceSearch}
                    setAdvanceSearch={setAdvanceSearch}
                    closeSearch={true}
                    handleAdvanceSearch={closeAdvanceSearch}
                    refetch={refetch}
                    reportType={reportType}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportFilters;
