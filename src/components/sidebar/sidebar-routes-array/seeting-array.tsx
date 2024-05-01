/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import {
  URLCategories,
  URLCountry,
  URLDeviceParameter,
  URLDeviceType,
  URLEmailConfiguration,
  URLEmailScheduler,
  URLFundingAgency,
  URLImplementingPartner,
  URLModule,
  URLPriority,
  URLRecovery,
  URLRole,
  URLSystem,
  URLTeam,
} from "@/routers/routes-link";
import { HiTicket } from "react-icons/hi";
import { PiNoteFill } from "react-icons/pi";
import { TbCircle } from "react-icons/tb";

interface MenuItem {
  label: string;
  url: string;
  icon: JSX.Element;
  submenu?: Submenu[];
}
interface Submenu {
  label: string;
  url: string;
  icon: JSX.Element;
}

export const seetingMenuItems: MenuItem[] = [
  {
    label: "Geography",
    url: "#",
    icon: <HiTicket className="rotate-90" />,
    submenu: [
      { label: "Country", url: URLCountry(), icon: <TbCircle size={12} /> },
    ],
  },
  {
    url: "#",
    label: "Advance",
    icon: <PiNoteFill />,
    submenu: [
      {
        label: "Categories",
        url: URLCategories(),
        icon: <TbCircle size={12} />,
      },
      { label: "Role", url: URLRole(), icon: <TbCircle size={12} /> },
      { label: "Team", url: URLTeam(), icon: <TbCircle size={12} /> },
      { label: "Module", url: URLModule(), icon: <TbCircle size={12} /> },
      { label: "System", url: URLSystem(), icon: <TbCircle size={12} /> },
      { label: "Recovery", url: URLRecovery(), icon: <TbCircle size={12} /> },
      { label: "Priority", url: URLPriority(), icon: <TbCircle size={12} /> },
      {
        label: "Device Type",
        url: URLDeviceType(),
        icon: <TbCircle size={12} />,
      },
      {
        label: "Device Parameter",
        url: URLDeviceParameter(),
        icon: <TbCircle size={12} />,
      },
      {
        label: "Funding Agency",
        url: URLFundingAgency(),
        icon: <TbCircle size={12} />,
      },
      {
        label: "Implementing Partner",
        url: URLImplementingPartner(),
        icon: <TbCircle size={12} />,
      },
      {
        label: "Email Configuration",
        url: URLEmailConfiguration(),
        icon: <TbCircle size={12} />,
      },
      {
        label: "Email Scheduler Control",
        url: URLEmailScheduler(),
        icon: <TbCircle size={12} />,
      },
    ],
  },
];
