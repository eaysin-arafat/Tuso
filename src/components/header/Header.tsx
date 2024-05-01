/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import ChangePassword from "@/components/change-password/ChangePassword";
import { changePasswordModalTypes } from "@/constants/modal-types/modal-types";
import { logout } from "@/features/auth/auth-slice";
import { closeAddModal, openAddModal } from "@/features/modal/modal-slice";
import { useReadProfilePictureByKeyQuery } from "@/features/profile-picture/profile-picture-api";
import { setSidebarOpen } from "@/features/sidebar/sidebar";
import useRoleName from "@/hooks/shared/useRoleName";
import { styles } from "@/utilities/cn";
import { cookieManager } from "@/utilities/cookie-manager";
import { isTrainingPortal } from "@/utilities/training";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ThemeSwitcher from "../core/theme/theme-switcher";
import NotificationDropdown from "../notifications/NotificationDropdown";

// header component
const Header = () => {
  // action dispatcher
  const dispatch = useDispatch();

  // get add modal data from store
  const { addModal } = useSelector((state: RootState) => state.modal);

  // get logged in user from store
  const { user } = useSelector((state: RootState) => state.auth);

  // get sidebar state from store
  const { sidebarOpen } = useSelector((store: RootState) => store.sidebar);

  // dropdown state
  const [dropdown, setDropDown] = useState(false);

  // get role name
  const roleName = useRoleName(user?.roleId);

  // get profile image by key
  const { data: profileImage } = useReadProfilePictureByKeyQuery(user?.oid, {
    skip: !user?.oid,
    refetchOnMountOrArgChange: true,
  });

  // handle password change open
  const handlePasswordChangeOpen = () => {
    dispatch(
      openAddModal({
        modalId: changePasswordModalTypes?.addChangePassword,
        data: null,
      })
    );
    setDropDown(false);
  };

  // handle logout
  const handleLogout = () => {
    cookieManager.removeCookie("tuso_accessToken");
    cookieManager.removeCookie("tuso_refreshToken");
    dispatch(logout());
  };

  // close modal
  const closeModal = () => {
    dispatch(closeAddModal());
  };

  // handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (dropdown !== false && !target.closest(".dropdown-container")) {
        setDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdown]);

  return (
    <>
      <div className="navbar bg-whiteColor min-h-[2rem] !max-h-[3rem] px-5 z-10 fixed top-0 border-b border-borderColor flex justify-between">
        <div className="">
          {/* SIDEBAR TOGGLER BUTTON */}
          <button
            onClick={() => dispatch(setSidebarOpen(!sidebarOpen))}
            type="button"
            className={styles("inline-flex items-center text-sm ")}
          >
            <MdOutlineMenu size={22} className="text-grayColor" />
          </button>

          {/* LOGO */}
          <img
            src="/images/logo/tuso.png"
            className={"ml-2 h-5 2xl:h-5 tuso_logo"}
            alt="Logo"
          />
        </div>

        {/* TRAINING TEXT */}
        {isTrainingPortal && (
          <div className="text-redColor text-sm me-5">Training Portal </div>
        )}

        <div>
          {/* NOTIFICATION DROPDOWN */}
          <NotificationDropdown />
          <div className="flex items-center dropdown gap-2 z-50">
            <div className="relative">
              <button
                onClick={() => setDropDown(!dropdown)}
                className="gap-1 flex items-center  text-textColor dropdown-container"
              >
                {/* USER PROFILE */}
                {profileImage?.data?.profilePictures ? (
                  <img
                    src={`data:image/png;base64,${profileImage?.data?.profilePictures}`}
                    alt="profile"
                    className="object-cover h-9 w-9 rounded-lg"
                  />
                ) : (
                  <FaUserCircle
                    className={`w-[30px] h-[30px] text-grayColor bg-lightBlue rounded-full cursor-pointer `}
                  />
                )}

                {/* USER NAME */}
                <div className="hidden sm:block">
                  <p
                    className={`text-textColor text-xs font-medium capitalize`}
                  >
                    {user?.name} {user?.surname}
                  </p>

                  {/* USER ROLE */}
                  <p
                    className={`text-lightGrayColor text-[10px] font-medium text-start `}
                  >
                    {roleName}{" "}
                    {user?.roleId === 4
                      ? !user?.isTeamLead
                        ? "Member"
                        : "Leader"
                      : ""}
                  </p>
                </div>
              </button>

              {/* DROPDOWN */}
              <div
                className={styles(
                  "absolute top-9 right-0 menu shadow bg-bgColor border rounded overflow-hidden p-0 m-0 w-[250px] 2xl:w-[300px] dropdown-container dropdownList",
                  { hidden: !dropdown }
                )}
              >
                {/* USER NAME AND ROLE */}
                <li className="w-full rounded-b-none">
                  <div className="text-center flex flex-col border-b py-2 2xl:py-4 text-textColor capitalize text-sm 2xl:text-base">
                    {user?.name} {user?.surname}
                    <span className="text-xs 2xl:text-sm">
                      {roleName}{" "}
                      {user?.roleId === 4
                        ? !user?.isTeamLead
                          ? "Member"
                          : "Leader"
                        : ""}
                    </span>
                  </div>
                </li>

                {/* USER SETTINGS */}
                <li className="w-full">
                  <NavLink
                    className="border-b py-2 2xl:py-3 text-textColor text-[11px] 2xl:text-[13px] flex hover:bg-violetColor hover:text-white rounded-none"
                    to={"/user-profile"}
                    onClick={() => setDropDown(!dropdown)}
                  >
                    My Settings
                  </NavLink>
                </li>

                {/* CHANGE PASSWORD */}
                <li className="w-full">
                  <button
                    className="border-b py-2 2xl:py-3 text-textColor text-[11px] 2xl:text-[13px] flex hover:bg-violetColor hover:text-white rounded-none"
                    onClick={handlePasswordChangeOpen}
                  >
                    Change Password
                  </button>
                </li>

                {/* DOWNLOAD RDP AGENT */}
                <li className="w-full">
                  <NavLink
                    className="border-b py-2 2xl:py-3 text-textColor text-[11px] 2xl:text-[13px] flex hover:bg-violetColor hover:text-white rounded-none"
                    to={"/terms-condition"}
                    onClick={() => setDropDown(!dropdown)}
                  >
                    Download RDP Agent
                  </NavLink>
                </li>

                {/* LOGOUT */}
                <li className="w-full">
                  <button
                    className="border-b py-2 2xl:py-3 text-textColor text-[11px] 2xl:text-[13px] flex hover:bg-violetColor hover:text-white rounded-none"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>

                {/* THEME SWITCHER */}
                <li className="w-full">
                  <div className="p-0 h- w-full">
                    <ThemeSwitcher isHeader />
                  </div>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CHANGE PASSWORD MODAL */}
      {addModal?.modalId === changePasswordModalTypes?.addChangePassword && (
        <ChangePassword toggler={closeModal} />
      )}
    </>
  );
};

export default Header;
