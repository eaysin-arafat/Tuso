/*
 * Created by: Andrew
 * Date created: 10.11.2023
 * Modified by: Andrew
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import { useAppDispatch } from "@/app/store";
import { Facility } from "@/constants/api-interface/Facility";
import {
  facilityApiEndpoints,
  useReadFacilitiesByDistrictPageQuery,
} from "@/features/facility/facility-api";
import { styles } from "@/utilities/cn";
import { debounce } from "lodash";
import React, {  useEffect, useRef, useState } from "react";
import InfiniteScrollWithApi from "./InfiniteScrollWithApi";
import SearchScroll from "./SearchScroll";

// Facility Scroll Search Props
interface FacilityScrollSearchProps {
  label: string;
  required?: boolean;
  placeholder: string;
  className?: string;
  errorMsg?: string;
  setFacilityId: React.Dispatch<React.SetStateAction<string>>;
  facilityId: string;
  facilities: Facility[];
  setFacilities: React.Dispatch<React.SetStateAction<Facility[]>>;
  districtId: string;
  prevFacilityId?: string;
  disabled?: boolean;
}

// Facility Scroll Search Component
const FacilityScrollSearch = ({
  label,
  required = false,
  placeholder,
  className = "",
  errorMsg,
  setFacilityId,
  facilities,
  setFacilities,
  districtId,
  prevFacilityId,
  disabled,
}: FacilityScrollSearchProps) => {
  // focus state
  const [focus, setFocus] = useState(false);

  // search term state
  const [searchTerm, setSearchTerm] = useState("");

  // has more items state
  const [hasMore, setHasMore] = React.useState(true);

  // page count state
  const [page, setPage] = React.useState(1);

  // search input reference
  const searchInputRef = useRef(null);

  // scroll div reference
  const scrollDivRef = useRef(null);

  // action dispatcher
  const appDispatch = useAppDispatch();

  // debounce search input change handler
  const handleSearchInputChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);

      if (searchInputRef?.current) {
        searchInputRef.current.value = e.target.value;
      }
    },
    300
  );

  // read facilities by district page query
  const { data: searchFacilities } = useReadFacilitiesByDistrictPageQuery(
    {
      key: districtId,
      start: 1,
      take: 10,
      search: searchTerm,
    },
    {
      skip: !searchTerm,
      refetchOnMountOrArgChange: true,
    }
  );

  // fetch more data handler
  const fetchMoreData = () => {
    setPage((prev) => prev + 1);
  };

  // select handler
  const selectHandler = (facility: Facility) => {
    setFacilityId(String(facility?.facilityId));

    if (searchInputRef.current && facility) {
      searchInputRef.current.value = facility?.facilityName;
    }
  };

  // set focus to false when clicked outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event?.target?.classList?.contains("infinite_scroll_main_div") &&
        !event?.target?.classList?.contains("custom_input")
      ) {
        setFocus(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [searchInputRef]);

  // set facility name when prevFacilityId is available
  useEffect(() => {
    if (prevFacilityId) {
      appDispatch(
        facilityApiEndpoints?.readFacilityByKey?.initiate(prevFacilityId)
      )
        ?.unwrap()
        ?.then((res) => {
          if (res?.isSuccess) {
            searchInputRef.current.value = res?.data?.facilityName;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prevFacilityId]);

  // fetch facilities by district id
  useEffect(() => {
    if (districtId) {
      appDispatch(
        facilityApiEndpoints.readFacilitiesByDistrictInfinite.initiate({
          key: districtId,
          start: page,
        })
      )
        .unwrap()
        .then((res) => {
          if (page == 1) {
            setFacilities(res?.data?.facility);
          } else {
            setFacilities((prev) => [...prev, ...(res?.data?.facility || [])]);
          }
          if (res?.data?.facility?.length < 10) {
            setHasMore(false);
          }
        });
    }
  }, [page, appDispatch, setFacilities, districtId]);

  // reset facilities when district id changes
  useEffect(() => {
    setFacilities([]);
    searchInputRef.current.value = "";
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districtId]);

  return (
    <div className="flex flex-col gap-[1px] relative custom_infinite_search_input">
      {/* INPUT LABEL */}
      <div>
        <div className="flex items-center w-full justify-between">
          <div className="flex">
            <div className="input_label">{label}</div>
            {required && <span className="input_required">*</span>}
          </div>
        </div>
        <div
          className={`overflow-auto rounded-md  ${
            focus && "border-transparent rounded-b-none"
          }`}
        >
          {/* INPUT */}
          <input
            disabled={disabled}
            type="text"
            ref={searchInputRef}
            className={styles(
              "custom_input disabled:!text-gray-400",
              className
            )}
            placeholder={placeholder}
            onChange={handleSearchInputChange}
            onFocus={() => setFocus(true)}
          />

          {focus && (
            <>

            {/* SEARH SCROLL COMPONENTS */}
              {searchTerm && searchFacilities?.data?.facility ? (
                <SearchScroll
                  handler={selectHandler}
                  searchItems={searchFacilities?.data?.facility}
                  className="2xl:!max-h-[230px]"
                />
              ) : null}

              {/* INFINITY SCROLL COMPONENTS */}
              {!searchTerm && (
                <InfiniteScrollWithApi
                  data={facilities || []}
                  handler={selectHandler}
                  scrollDivId={"test_scroll_2"}
                  className="2xl:!max-h-[230px]"
                  fetchMoreData={fetchMoreData}
                  hasMore={hasMore}
                  ref={scrollDivRef}
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* ERROR MESSAGE */}
      {errorMsg && (
        <p className="text-redColor text-[11px] 2xl:text-[13px]">{errorMsg}</p>
      )}
    </div>
  );
};

export default FacilityScrollSearch;
