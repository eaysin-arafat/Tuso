import { lazy } from "react";
import SettingsRoutes from "./settings-router";

const Dashboard = lazy(() => import("@/pages/dashboard"));
const DevicePage = lazy(() => import("@/pages/device/index"));
const DownloadRdpAgent = lazy(
  () => import("@/pages/rdp-agent/DownloadRdpAgent")
);
const ProvincialReport = lazy(
  () => import("@/pages/reports/provincial-report/ProvincialReport")
);
const TDReport = lazy(() => import("@/pages/reports/td-report/TDReport"));
const TicketLifecycle = lazy(
  () => import("@/pages/reports/ticket-lifecycle/TicketLifecycle")
);
const WeeklyReport = lazy(
  () => import("@/pages/reports/weekly-report/WeeklyReport")
);
const TermsCondition = lazy(() => import("@/pages/terms-condition"));
const UserList = lazy(() => import("@/pages/user/index"));
const UserProfile = lazy(() => import("@/pages/user-profile"));
const Tickets = lazy(() => import("@/pages/tickets/Index/Index"));
const Messages = lazy(() => import("@/pages/message/Index"));
const PrivateGuard = lazy(() => import("@/components/guards/PrivateGuard"));
const RootLayout = lazy(() => import("@/layout/RootLayout"));
const DeviceIntermittence = lazy(
  () => import("@/pages/device-intermittence/DeviceIntermittence")
);

import {
  URLDashboard,
  URLDevice,
  URLDeviceIntermittence,
  URLDownloadRdpAgent,
  URLFollowUp,
  URLProvincialReport,
  URLTDReport,
  URLTermsCondition,
  URLTicketLifecycle,
  URLTickets,
  URLUserList,
  URLUserProfile,
  URLWeeklyReport,
} from "./routes-link";
// import DeviceIntermittence from "@/pages/device-intermittence/DeviceIntermittence";

const PrivateRoutes = [
  {
    element: <PrivateGuard />,
    children: [
      {
        element: <RootLayout />,
        children: [
          ...SettingsRoutes,
          {
            path: URLDashboard(),
            element: <Dashboard />,
          },
          {
            path: URLUserList(),
            element: <UserList />,
          },
          {
            path: URLTickets(),
            element: <Tickets />,
          },
          {
            path: URLFollowUp(),
            element: <Messages />,
          },
          {
            path: URLDevice(),
            element: <DevicePage />,
          },
          {
            path: URLDeviceIntermittence(),
            element: <DeviceIntermittence />,
          },
          {
            path: URLTermsCondition(),
            element: <TermsCondition />,
          },
          {
            path: URLDownloadRdpAgent(),
            element: <DownloadRdpAgent />,
          },
          {
            path: URLTicketLifecycle(),
            element: <TicketLifecycle />,
          },
          {
            path: URLWeeklyReport(),
            element: <WeeklyReport />,
          },
          {
            path: URLProvincialReport(),
            element: <ProvincialReport />,
          },
          {
            path: URLTDReport(),
            element: <TDReport />,
          },
          {
            path: URLUserProfile(),
            element: <UserProfile />,
          },
        ],
      },
    ],
  },
];

export default PrivateRoutes;
