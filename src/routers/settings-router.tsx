import { lazy } from "react";

const SettingsLayout = lazy(() => import("@/layout/SettingsLayout"));
const CountryTable = lazy(() => import("@/pages/countries/index/CountryTable"));
const DeviceParameter = lazy(
  () => import("@/pages/device-parameter/index/DeviceParameter")
);
const DeviceType = lazy(() => import("@/pages/device-type/index/DeviceType"));
const DistrictTable = lazy(
  () => import("@/pages/district/index/DistrictTable")
);
const EmailAndSchedulerControl = lazy(
  () => import("@/pages/email-scheduler-control/index/EmailAndSchedulerControl")
);
const EmailTemplates = lazy(
  () => import("@/pages/email-template/index/EmailTemplates")
);
const FacilityTable = lazy(
  () => import("@/pages/facilities/index/FacilityTable")
);
const FirstLevelCategoryTable = lazy(
  () => import("@/pages/first-level-category/index/FirstLevelCategoryTable")
);
const FundingAgency = lazy(
  () => import("@/pages/funding-agency/index/FundingAgency")
);
const ImplementingPartner = lazy(
  () => import("@/pages/implementing-partner/index/ImplementingPartner")
);
const ModuleByRoleTable = lazy(
  () => import("@/pages/module-by-role/index/Modules")
);
const ModulePermissionTable = lazy(
  () => import("@/pages/module-permissions/index/ModulePermissionTable")
);
const ModuleTable = lazy(() => import("@/pages/modules/index/Modules"));
const Priority = lazy(() => import("@/pages/priority/index/Priority"));
const ProvinceTable = lazy(
  () => import("@/pages/province/index/ProvinceTable")
);
const Recovery = lazy(() => import("@/pages/recovery/index/Recovery"));
const RoleTable = lazy(() => import("@/pages/role/index/RoleTable"));
const SecondLevelCategoryTable = lazy(
  () => import("@/pages/second-level-category/index/SecondLevelCategoryTable")
);
const SystemTable = lazy(() => import("@/pages/system/index/System"));
const TeamMembers = lazy(
  () => import("@/pages/team-members/index/TeamMembers")
);
const TeamIndex = lazy(() => import("@/pages/team/index/TeamIndex"));
const ThirdLevelCategoryTable = lazy(
  () => import("@/pages/third-level-category/index/ThirdLevelCategoryTable")
);
const UserBySystem = lazy(
  () => import("@/pages/user-by-system/index/UserBySystem")
);
const EmailConfiguration = lazy(
  () => import("@/pages/email-configuration/index/EmailConfiguration")
);

const ItExpertTable = lazy(
  () => import("@/pages/it-expert/index/ItExpertTable")
);
const EmailStatus = lazy(
  () => import("@/pages/email-status/index/EmailStatus")
);
const SystemPermission = lazy(
  () => import("@/pages/user-permission/index/SystemPermission")
);
import {
  URLCategories,
  URLCountry,
  URLDeviceParameter,
  URLDeviceType,
  URLDistrict,
  URLEmailConfiguration,
  URLEmailScheduler,
  URLEmailStatus,
  URLEmailTemplate,
  URLFacility,
  URLFundingAgency,
  URLImplementingPartner,
  URLItExpert,
  URLModule,
  URLModuleByRole,
  URLModulePermission,
  URLPriority,
  URLProvince,
  URLRecovery,
  URLRole,
  URLSecondLevelCategory,
  URLSystem,
  URLSystemPermission,
  URLTeam,
  URLTeamMembers,
  URLThirdLevelCategory,
  URLUserBySystem,
} from "./routes-link";

const SettingsRoutes = [
  {
    element: <SettingsLayout />,
    children: [
      {
        path: URLCountry(),
        element: <CountryTable />,
      },
      {
        path: URLProvince(),
        element: <ProvinceTable />,
      },
      {
        path: URLDistrict(),
        element: <DistrictTable />,
      },
      {
        path: URLFacility(),
        element: <FacilityTable />,
      },
      {
        path: URLItExpert(),
        element: <ItExpertTable />,
      },
      {
        path: URLCategories(),
        element: <FirstLevelCategoryTable />,
      },
      {
        path: URLSecondLevelCategory(),
        element: <SecondLevelCategoryTable />,
      },
      {
        path: URLThirdLevelCategory(),
        element: <ThirdLevelCategoryTable />,
      },
      {
        path: URLRole(),
        element: <RoleTable />,
      },
      {
        path: URLModulePermission(),
        element: <ModulePermissionTable />,
      },
      {
        path: URLTeam(),
        element: <TeamIndex />,
      },
      {
        path: URLTeamMembers(),
        element: <TeamMembers />,
      },
      {
        path: URLModule(),
        element: <ModuleTable />,
      },
      {
        path: URLModuleByRole(),
        element: <ModuleByRoleTable />,
      },
      {
        path: URLSystem(),
        element: <SystemTable />,
      },
      {
        path: URLUserBySystem(),
        element: <UserBySystem />,
      },
      {
        path: URLRecovery(),
        element: <Recovery />,
      },
      {
        path: URLPriority(),
        element: <Priority />,
      },
      {
        path: URLDeviceType(),
        element: <DeviceType />,
      },
      {
        path: URLDeviceParameter(),
        element: <DeviceParameter />,
      },
      {
        path: URLFundingAgency(),
        element: <FundingAgency />,
      },
      {
        path: URLImplementingPartner(),
        element: <ImplementingPartner />,
      },
      {
        path: URLEmailConfiguration(),
        element: <EmailConfiguration />,
      },
      {
        path: URLEmailTemplate(),
        element: <EmailTemplates />,
      },
      {
        path: URLEmailScheduler(),
        element: <EmailAndSchedulerControl />,
      },
      {
        path: URLEmailStatus(),
        element: <EmailStatus />,
      },
      {
        path: URLSystemPermission(),
        element: <SystemPermission />,
      },
    ],
  },
];

export default SettingsRoutes;
