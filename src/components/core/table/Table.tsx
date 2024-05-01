/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import { styles } from "@/utilities/cn";

// Table component props
type Props = {
  children: React.ReactNode;
  className?: string;
};

// Table component
const Table = ({ children, className = "" }: Props) => {
  return (
    <div className="overflow-x-auto bg-whiteColor rounded-lg">
      <div className={styles(" w-full", className)}>{children}</div>
    </div>
  );
};

export default Table;
