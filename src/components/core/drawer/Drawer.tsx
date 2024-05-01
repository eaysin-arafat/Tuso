/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import { toggleDrawer } from "@/features/drawar/drawar-slice";
import { styles } from "@/utilities/cn";
import { useDispatch, useSelector } from "react-redux";

// Drawer Component
const Drawer = ({ children }: { children: JSX.Element }) => {
  // get is drawer open state from redux
  const isDrawerOpen = useSelector(
    (state: RootState) => state.drawer.isDrawerOpen
  );

  // action dispatcher
  const dispatch = useDispatch();

  // drawer toggle handler
  const handleToggleDrawer = () => {
    dispatch(toggleDrawer());
  };

  return (
    <div
      className={styles("drawer drawer-end", {
        active: isDrawerOpen,
      })}
    >
      {/* TOGGLER CHECKBOX */}
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={handleToggleDrawer}
      />

      {/* ADVANCE SEARCH */}
      <div className="drawer-content">
        <label htmlFor="my-drawer-4" className="outline_btn">
          Advance Search
        </label>
      </div>
      <div
        className="drawer-side z-40"
        style={{
          scrollbarWidth: "none",
        }}
      >
        {/* DRAWER LABEL */}
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={handleToggleDrawer}
        ></label>

        {/* CHILDREN */}
        <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content bg-whiteColor pt-7">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
