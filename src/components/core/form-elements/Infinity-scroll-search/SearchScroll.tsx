/*
 * Created by: Andrew
 * Date created: 10.11.2023
 * Modified by: Andrew
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import { styles } from "@/utilities/cn";

// Search item style
const style = {
  display: "flex",
  alignItems: "center",
};

// Search Scroll Component
const SearchScroll = ({ handler, searchItems, className = "" }) => {
  return (
    <div
      className={styles(
        "absolute bg-bgColor w-full right-0 max-h-52 2xl:max-h-96 overflow-auto ",
        { "border border-borderColor": searchItems?.length > 0 },
        className
      )}
      style={{ zIndex: "999999" }}
    >
      {searchItems?.slice(0, 100)?.map((item, index) => (
        <div
          style={style}
          key={index}
          onClick={() => handler(item)}
          className="border border-borderColor text-textColor hover:bg-borderColor !text-[10px] 2xl:!text-[12px] text-xs cursor-pointer !px-3 py-1 2xl:py-1.5"
        >
          {item?.facilityName}
        </div>
      ))}
    </div>
  );
};

export default SearchScroll;
