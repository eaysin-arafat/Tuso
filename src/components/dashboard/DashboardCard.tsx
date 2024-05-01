/*
 * Created by: Andrew
 * Date created: 10.11.2023
 * Modified by: Andrew
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

// dashboard card component props
type Props = {
  title?: string;
  children: JSX.Element;
  className?: string;
};

/**
 * @description DashboardCard component
 */
const DashboardCard = ({ title, children, className }: Props) => {
  return (
    <div className={`flex flex-col gap-2 bg-whiteColor p-2 px-4 ${className}`}>
      <h3 className="mt-1">{title}</h3>
      <div className="h-full w-full mt-3">{children}</div>
    </div>
  );
};

export default DashboardCard;
