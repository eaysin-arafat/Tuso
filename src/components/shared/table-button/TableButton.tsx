/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import { styles } from "@/utilities/cn";

// Table Button Props type
type Props = {
  onClick: () => void;
  icon?: JSX.Element;
  text: string;
  className?: string;
  title?: string;
  isTicketClosed?: boolean;
  disabled?: boolean;
};

/**
 * @description Table Button Component
 */
const TableButton = ({
  onClick,
  icon,
  text,
  className = "",
  isTicketClosed = false,
  disabled = false,
  title=""
}: Props) => {
  return (
    <button
      title={isTicketClosed ? "Ticket Closed" : title}
      disabled={isTicketClosed || disabled}
      type="button"
      className={styles(
        "flex items-center justify-center gap-[6px] text-[12px] 2xl:text-[14px] table-button",
        className,
        { "text-grayColor cursor-not-allowed": isTicketClosed || disabled }
      )}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
};

export default TableButton;
