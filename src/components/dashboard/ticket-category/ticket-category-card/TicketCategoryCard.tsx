/*
 * Created by: Andrew
 * Date created: 10.11.2023
 * Modified by: Andrew
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import useWindowWidth from "@/hooks/shared/useWindowWidth";
import { TfiTicket } from "react-icons/tfi";

// ticket category card props
type Props = {
  ticketColor: string;
  ticketTitle: string;
  ticketAmount: number;
  badgeIcon?: {
    icon?: React.ReactNode;
    className?: string;
  };
};

/**
 * @description TicketCategoryCard component.
 */
const TicketCategoryCard = ({
  ticketColor,
  badgeIcon,
  ticketTitle,
  ticketAmount,
}: Props) => {
  const w1536 = useWindowWidth(1536);
  return (
    <div className="bg-whiteColor py-3 flex items-center justify-center border border-borderColor shadow-sm rounded-md">
      <div className="flex items-center justify-center pr-4 gap-1 w-[150px] 2xl:w-[200px]">
        <div className={`relative ${ticketColor}`}>
          {/* Render the ticket icon */}
          <TfiTicket size={w1536 ? 35 : 43} />

          {/* Render badge icon if provided */}
          {badgeIcon && badgeIcon.icon && (
            <span
              className={`absolute top-[38%] right-[5px] items-center justify-center text-[11px] text-whiteColor rounded-full font-bold inline-flex w-[13px] h-[13px] 
              ${badgeIcon.className}`}
            >
              {badgeIcon.icon}
            </span>
          )}
        </div>
        <div>
          <h3 className="font-bold text-textColor">{ticketAmount}</h3>
          <p className="font-medium whitespace-nowrap">{ticketTitle}</p>
        </div>
      </div>
    </div>
  );
};

export default TicketCategoryCard;
