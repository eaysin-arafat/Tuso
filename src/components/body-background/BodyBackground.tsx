/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import { styles } from "@/utilities/cn";
import ThemeSwitcher from "../core/theme/theme-switcher";

// body background props
type Props = {
  children: JSX.Element;
  noBackground?: boolean;
  className?: string;
};

/**
 * @description BodyBackground component
 */
function BodyBackground({ children, noBackground, className = "" }: Props) {
  return (
    // body background
    <div
      className={`${
        noBackground
          ? " bg-bodyColor "
          : `background_image body-background bg-cover bg-center`
      } w-full overflow-auto h-screen text-left text-sm text-black font-poppins`}
    >
      {/* THEME SWITCHER */}
      <div className="z-20 absolute top-2 right-2 lg:right-10 xs:top-5 xs:right-5">
        <ThemeSwitcher />
      </div>

      {/* CHILDREN */}
      <div
        className={styles(
          "relative z-10 align-middle m-auto flex justify-center self-center items-center pt-32 xl:pt-16 2xl:pt-4 xxl:pt-32 3xl:pt-60 4xl:pt-80",
          className
        )}
      >
        {children}
      </div>

      {/* BACKGROUND OVERLAY */}
      {!noBackground && (
        <div className="fixed inset-0 md:bg-overlyBg opacity-75 h-[100%]" />
      )}
    </div>
  );
}

export default BodyBackground;
