/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import {
  URLCountry,
  URLDashboard,
  URLDevice,
  URLDeviceIntermittence,
  URLProvincialReport,
  URLTDReport,
  URLTicketLifecycle,
  URLTickets,
  URLUserList,
  URLWeeklyReport,
} from "@/routers/routes-link";
import { AiFillDashboard } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";
import { HiTicket } from "react-icons/hi";
import { PiDevicesFill, PiNoteFill } from "react-icons/pi";
import { RiFileUserFill, RiSettings3Fill } from "react-icons/ri";
import usePermissions from "./usePermissions";

interface MenuItem {
  label: string;
  url: string;
  badge?: JSX.Element;
  icon: JSX.Element;
  submenu?: Submenu[];
  moduleName: string;
  isModuleAccess: boolean;
}
interface Submenu {
  label: string;
  url: string;
  badge?: JSX.Element;
  icon: JSX.Element;
}

export const GetMenuItems = () => {
  const {
    settingsPermission,
    devicePermission,
    reportPermission,
    ticketPermission,
    userPermission,
  } = usePermissions();

  const menuItems: MenuItem[] = [
    {
      label: "Dashboard",
      url: URLDashboard(),
      icon: <AiFillDashboard size={19} />,
      moduleName: "",
      isModuleAccess: true,
    },
    {
      label: "Tickets",
      url: URLTickets(),
      icon: <HiTicket className="rotate-90" size={19} />,
      moduleName: "",
      isModuleAccess: ticketPermission,
    },
    // {
    //   label: "Device",
    //   url: URLDevice(),
    //   icon: <PiDevicesFill size={19} />,
    //   moduleName: "",
    //   isModuleAccess: devicePermission,
    // },
    {
      label: "Device",
      url: URLDevice(),
      icon: <PiDevicesFill size={19} />,
      moduleName: "",
      isModuleAccess: devicePermission,
      submenu: [
        {
          label: "Device Inventory",
          url: URLDevice(),
          icon: <GoDotFill size={19} />,
        },
        {
          label: "Device Intermittence",
          url: URLDeviceIntermittence(),
          icon: <GoDotFill size={19} />,
        },
      ],
    },
    {
      url: URLTicketLifecycle(),
      label: "Report",
      icon: <PiNoteFill size={19} />,
      moduleName: "",
      isModuleAccess: reportPermission,
      submenu: [
        {
          label: "Ticket Lifecycle",
          url: URLTicketLifecycle(),
          icon: <GoDotFill size={19} />,
        },
        { label: "Weekly Report", url: URLWeeklyReport(), icon: <GoDotFill /> },
        {
          label: "Provincial Report",
          url: URLProvincialReport(),
          icon: <GoDotFill size={19} />,
        },
        {
          label: "TD Report",
          url: URLTDReport(),
          icon: <GoDotFill size={19} />,
        },
      ],
    },
    {
      label: "User",
      url: URLUserList(),
      icon: <RiFileUserFill size={19} />,
      moduleName: "",
      isModuleAccess: userPermission,
    },
    {
      label: "Settings ",
      url: URLCountry(),
      icon: <RiSettings3Fill size={19} />,
      moduleName: "",
      isModuleAccess: settingsPermission,
    },
  ];

  // Filter menu items based on condition
  const filteredMenuItems = menuItems?.filter(
    (item) => item?.isModuleAccess !== false
  );

  return { menuItems: filteredMenuItems };
};
