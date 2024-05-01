/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */


import { RootState } from "@/app/store";
import { setSidebarOpen } from "@/features/sidebar/sidebar";
import useWindowWidth from "@/hooks/shared/useWindowWidth";
import { styles } from "@/utilities/cn";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdOutlineMenu } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { GetMenuItems } from "./sidebar-routes-array/sidebar-array";

// sidebar props type
type Props = {
  children: React.ReactNode;
};

/**
 * @description Sidebar component
 */
const Sidebar = ({ children }: Props) => {
  // action dispatcher
  const dispatch = useDispatch();

  // get sidebar open state from store
  const { sidebarOpen } = useSelector((store: RootState) => store.sidebar);

  // selected menu state
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);

  // use window width hook
  const w900 = useWindowWidth(900);

  // sidebar open state
  const sidebarVal = w900 ? false : true;

  // navigate hook
  const navigate = useNavigate();

  // router location
  const router = useLocation();

  // route array
  const routeArray = router?.pathname?.split("/");

  // get menu items
  const { menuItems } = GetMenuItems();

  // active menu index
  const activeIndex = menuItems?.findIndex((element) => {
    const url = element?.url?.split("/")[1];
    return url === routeArray[1]?.toLowerCase();
  });

  // menu click handler
  const handleMenuClick = (index: number) => {
    if (selectedMenu === index) {
      setSelectedMenu(null);
    } else {
      setSelectedMenu(index);
    }

    if (
      selectedMenu !== null &&
      !menuItems[selectedMenu]?.submenu &&
      selectedMenu !== index
    ) {
      setSelectedMenu(null);
    }
  };

  // set sidebar open state
  useEffect(() => {
    dispatch(setSidebarOpen(sidebarVal));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [w900, dispatch]);

  // set selected menu
  useEffect(() => {
    if (activeIndex !== -1 && menuItems) {
      setSelectedMenu(activeIndex);
    }
  }, [activeIndex, menuItems]);

  return (
    <>
      <aside
        className={styles(
          "fixed top-0 left-0 z-40 w-52 h-screen  duration-500 ease-in-out sidebar",
          { "-translate-x-52": !sidebarOpen },
          { "translate-x-0": sidebarOpen }
        )}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-whiteColor ">
          <div className="flex justify-between items-center">
            {/* LOGO */}
            <img
              src="/images/logo/tuso.png"
              className={"h-7 2xl:h-8 tuso_logo"}
              alt="Logo"
            />

            {/* SIDEBAR CONTROL BUTTON */}
            <button onClick={() => dispatch(setSidebarOpen(false))}>
              <MdOutlineMenu size={22} className="text-grayColor" />
            </button>
          </div>

          {/* SIDEBAR ITEM LIST */}
          <ul className="space-y-2 font-medium mt-8">
            {menuItems?.map((menuItem, index) => (
              <li key={index}>
                {menuItem?.submenu ? (
                  <>
                    <label
                      htmlFor={`menu-${index}`}
                      onClick={() =>
                        navigate(
                          menuItem?.submenu ? menuItem?.submenu?.[0]?.url : ""
                        )
                      }
                      className="flex items-center justify-between p-2 text-grayTextColor rounded-lg group cursor-pointer hover:text-activeVioletColor"
                    >
                      <div
                        className={styles("flex items-center ", {
                          "text-activeVioletColor": selectedMenu === index,
                        })}
                      >
                        {menuItem?.icon}
                        <span
                          className={styles(
                            "ms-3  text-[12px] 2xl:text-[14px]",
                            {
                              "text-activeVioletColor": selectedMenu === index,
                            }
                          )}
                        >
                          {menuItem?.label}
                        </span>
                      </div>
                      {selectedMenu != index && <IoIosArrowDown size={14} />}
                      {selectedMenu === index && <IoIosArrowUp size={14} />}
                    </label>
                    <input
                      type="checkbox"
                      id={`menu-${index}`}
                      className="hidden"
                      checked={selectedMenu === index}
                      onChange={() => handleMenuClick(index)}
                    />
                    <ul
                      className={`pl-5 space-y-2 ${
                        selectedMenu === index ? "block" : "hidden"
                      }`}
                    >
                      {menuItem?.submenu?.map((subMenuItem, subIndex) => (
                        <li key={subIndex}>
                          <NavLink
                            to={subMenuItem?.url}
                            onClick={() =>
                              dispatch(
                                setSidebarOpen(w900 ? false : sidebarOpen)
                              )
                            }
                            className="flex items-center py-2 text-grayTextColor rounded-lg group hover:text-activeVioletColor"
                          >
                            {subMenuItem?.icon}
                            <span
                              className={styles(
                                "ms-3 text-[12px] 2xl:text-[14px]"
                              )}
                            >
                              {subMenuItem?.label}
                            </span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <NavLink
                    onClick={() => {
                      setSelectedMenu(null),
                        dispatch(setSidebarOpen(w900 ? false : sidebarOpen));
                    }}
                    to={menuItem?.url}
                    className="flex items-center justify-between p-2 text-grayTextColor text-base rounded-lg group hover:text-activeVioletColor"
                  >
                    <div className="flex items-center">
                      {menuItem?.icon}
                      <span className="ms-3 text-xs">{menuItem?.label}</span>
                    </div>
                    {menuItem?.badge && menuItem?.badge}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div
        onClick={() => dispatch(setSidebarOpen(w900 ? false : sidebarOpen))}
        className={styles(
          ` duration-500 ease-in-out bg-bgColor `,
          { "ml-52": sidebarOpen && !w900 },
          { "ml-0": sidebarOpen && w900 }
        )}
      >
        {children}
      </div>
    </>
  );
};

export default Sidebar;
