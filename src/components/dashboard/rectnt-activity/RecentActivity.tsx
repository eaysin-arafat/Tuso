/*
 * Created by: Andrew
 * Date created: 10.11.2023
 * Modified by: Andrew
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import { MdKeyboardArrowRight } from "react-icons/md";
import { TfiTicket } from "react-icons/tfi";

/**
 * RecentActivity component.
 * @param  item - The item number.
 */
const RecentActivity = ({ item }: { item: number }) => {
  return (
    <div
      className="relative w-full flex flex-col md:flex-row items-start md:items-center justify-between border border-borderColor rounded-md px-3 py-[1.5px] 2xl:py-[4px]"
      key={item}
    >
      {/* Ticket Information */}
      <div className="flex items-center justify-center gap-2 text-xl">
        <TfiTicket className="rotate-90 text-violetColor" size={22} />
        <p className="font-medium">#12345443</p>
        <p className="text-redColor font-medium">(5)</p>
      </div>

      {/* Activity Details */}
      <div className="flex items-center justify-center gap-3">
        <p className="text">John Doe Change Status</p>
        <p className="font-medium">09:12 PM</p>

        {/* Arrow Icon */}
        <MdKeyboardArrowRight
          size={15}
          className="absolute md:static top-[38%] md:top-0 right-3 md:right-0 text-textColor"
        />
      </div>
    </div>
  );
};

export default RecentActivity;
