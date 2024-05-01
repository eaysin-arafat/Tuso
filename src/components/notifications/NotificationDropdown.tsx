/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import { useReadIncidentByClientNotificationQuery } from "@/features/incidents/incidents-api";
import { URLFollowUp } from "@/routers/routes-link";
import { styles } from "@/utilities/cn";
import { DateFunc } from "@/utilities/date";
import React, { useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

/**
 * @description Notification dropdown component
 */
const NotificationDropdown = () => {
  // get logged in user from store
  const { user } = useSelector((state: RootState) => state.auth);

  // notification open state
  const [open, setOpen] = useState(false);

  // get notification data
  const { data: notificationData } = useReadIncidentByClientNotificationQuery(
    user?.oid,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  // handle open notification
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  // handle click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement; // Explicitly type event.target as HTMLElement
      if (open !== false && !target.closest(".dropdown-container")) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="flex-none gap-2">
      <div className=" relative">
        <div role="button" className="dropdown-container" onClick={handleOpen}>
          <div className="me-5 rounded-full relative">
            <IoNotifications className="h-6 w-6 text-grayTextColor" />
          </div>
        </div>
        {open && (
          <ul className="absolute mt-[12px] sm:mt-[13px] z-[1] -right-7 sm:right-2 p-2 shadow menu menu-sm bg-base-100 rounded-md w-80 md:w-80 bg-whiteColor text-textColor overflow-y-auto dropdown-container">
            <div className=" max-h-[400px]">
              <li className="mb-2">
                <div className="flex justify-between">
                  <p className="font-semibold text-base text-textColor">
                    Notifications
                  </p>
                </div>
              </li>
              {notificationData?.map((item, index) => {
                return (
                  <Link
                    key={index}
                    to={URLFollowUp(String(item?.incidentId))}
                    className="border-b pb-3"
                    onClick={() => setOpen(false)}
                  >
                    <li
                      className={styles("border-b pb-3 pt-1", {
                        "border-none": notificationData?.length - 1 === index,
                      })}
                    >
                      <div className="flex items-start">
                        <div className="h-10 w-10 bg-violetColor rounded-lg flex items-center justify-center relative">
                          <IoNotifications className="h-5 w-5 text-whiteColor" />
                          <div className="badge badge-primary badge-xs text-[10px] p-2 h-[10px] w-[10px] absolute -top-[9px] -right-2 bg-gradient-to-b from-violetColor to-hotPinkColor border-2 !border-whiteColor mt-1 text-white">
                            {item?.totalMessage ? item?.totalMessage : "0"}
                          </div>
                        </div>
                        <div className=" ms-2">
                          <p className="text-textColor">{item?.ticketTitle}</p>
                          <div className="flex justify-between">
                            <p className="text-grayTextColor">
                              {DateFunc.formatDate(item?.dateOfIncident)}
                            </p>
                            <p className="text-violetColor font-medium text-text-[11px] ms-2">
                              {item?.totalMessage > 0 && "Mark as read"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  </Link>
                );
              })}
            </div>
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
