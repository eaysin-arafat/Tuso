/*
 * Created by: Andrew
 * Date created: 10.11.2023
 * Modified by: Andrew
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

type Props = {
  title: string;
  data: number;
  className?: string;
};

/**
 * @description UserCountCard component
 */
const UserCountCard = ({ title, data, className }: Props) => {
  return (
    <div
      className={`text-center bg-violetColor !text-whiteColor rounded-md h-full w-full flex flex-col items-center justify-center py-3 lg:py-6 ${className}`}
    >
      <h4 className="text-whiteColor">{title}</h4>
      <h5 className="text-whiteColor">{data}</h5>
    </div>
  );
};

export default UserCountCard;
