/*
 * Created by: Andrew
 * Date created: 10.11.2023
 * Modified by: Andrew
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import { Facility } from "@/constants/api-interface/Facility";
import { styles } from "@/utilities/cn";
import { forwardRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

// Scroll item style
const style = {
  display: "flex",
  alignItems: "center",
};

// infinite scroll with api props
interface InfiniteApiScrollWrapProps {
  handler: (facility: Facility) => void;
  scrollDivId: string;
  className?: string;
  data: Facility[];
  fetchMoreData: () => void;
  hasMore: boolean;
}

// reference type
export type Ref = HTMLDivElement;

// infinite scroll with api component
const InfiniteScrollWithApi = forwardRef<Ref, InfiniteApiScrollWrapProps>(
  (
    { handler, scrollDivId, className = "", data, fetchMoreData, hasMore },
    ref
  ) => {
    return (
      <div ref={ref} className="infinite_scroll_main_div">
        <div
          id={scrollDivId}
          className={styles(
            "absolute bg-bgColor w-full right-0 max-h-24 2xl:max-h-24 overflow-auto ",
            { "border border-borderColor": data?.length > 0 },
            className
          )}
          style={{ zIndex: "999999" }}
        >
          {/* INFINITE SCROLL */}
          <InfiniteScroll
            dataLength={data?.length || 0}
            next={fetchMoreData}
            hasMore={hasMore}
            scrollableTarget={scrollDivId}
            loader={<h4 className="px-3 py-1.5 text-sm"></h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                {/* <b>Yay! You have seen it all</b> */}
              </p>
            }
          >
            {/* SCROLL ITEM */}
            {data?.map((item, index) => (
              <div
                style={style}
                key={index}
                onClick={() => handler(item)}
                className="border border-borderColor text-textColor hover:bg-borderColor !text-[10px] 2xl:!text-[12px] text-xs cursor-pointer !px-3 py-1 2xl:py-1.5"
              >
                {item?.facilityName}
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
);

export default InfiniteScrollWithApi;
