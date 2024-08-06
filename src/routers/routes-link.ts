export const URLDashboard = (): string => "/dashboard";
// user routes
export const URLUserList = (): string => "/user-list";
export const URLUserProfile = (): string => "/user-profile";

export const URLUserSignIn = (): string => "/user-signin";

// ticket routes
export const URLTickets = () => "/tickets";
export const URLFollowUp = (ticketId: string = ":ticketId"): string =>
  `/tickets/${ticketId}`;
// export const URLFollowUpImage = (ticketId: string = ":ticketId"): string =>
//   `/tickets/image/${ticketId}`;

// device routes
export const URLDevice = (): string => "/device";
export const URLDeviceIntermittence = (): string => "/device-intermittence";

// terms condition routes
export const URLTermsCondition = (): string => "/terms-condition";

// download rdp agent routes
export const URLDownloadRdpAgent = (): string => "/download-rdp-agent";

// report routes
export const URLTicketLifecycle = (): string => "/report/ticket-lifecycle";
export const URLWeeklyReport = (): string => "/report/weekly-report";
export const URLProvincialReport = (): string => "/report/provincial-report";
export const URLTDReport = (): string => "/report/td-report";

export const URLSettings = (): string => "/settings";

// geography routes
export const URLCountry = (): string => "/geography/countries";
export const URLProvince = (countryId: string = ":countryId"): string =>
  `/geography/countries/province/${countryId}`;
export const URLDistrict = (
  countryId: string = ":countryId",
  provinceId: string = ":provinceId"
): string => `/geography/countries/district/${countryId}/${provinceId}`;
export const URLFacility = (
  countryId: string = ":countryId",
  provinceId: string = ":provinceId",
  districtId: string = ":districtId"
): string =>
  `/geography/countries/facility/${countryId}/${provinceId}/${districtId}`;
export const URLItExpert = (
  countryId: string = ":countryId",
  provinceId: string = ":provinceId",
  districtId: string = ":districtId",
  facilityId: string = ":facilityId"
): string =>
  `/geography/countries/it-expert/${countryId}/${provinceId}/${districtId}/${facilityId}`;

// advanced routes
export const URLRole = (): string => "/advance/role";
export const URLTeam = (): string => "/advance/team";
export const URLTeamMembers = (teamId: string = ":teamId"): string =>
  `/advance/team/team-members/${teamId}`;
export const URLModule = (): string => "/advance/module";
export const URLModuleByRole = (moduleId: string = ":moduleId"): string =>
  `/advance/module/module-by-role/${moduleId}`;
export const URLSystem = (): string => "/advance/system";
export const URLUserBySystem = (systemId: string = ":systemId"): string =>
  `/advance/system/user-by-system/${systemId}`;
export const URLRecovery = (): string => "/advance/recovery";
export const URLPriority = (): string => "/advance/priority";
export const URLDeviceType = (): string => "/advance/device-type";
export const URLDeviceParameter = (): string => "/advance/device-parameter";
export const URLFundingAgency = (): string => "/advance/funding-agency";
export const URLImplementingPartner = (): string =>
  "/advance/implementing-partner";
export const URLEmailConfiguration = (): string =>
  "/advance/email-configuration";
export const URLEmailTemplate = (): string =>
  `/advance/email-configuration/email-template/`;
export const URLEmailScheduler = (): string => "/advance/email-scheduler";
export const URLEmailStatus = (): string =>
  "/advance/email-scheduler/email-status";
export const URLModulePermission = (roleId: string = ":roleId"): string =>
  `/advance/role/module-permission/${roleId}`;
export const URLCategories = (): string => "/advance/categories";
export const URLSecondLevelCategory = (
  categoryId: string = ":categoryId"
): string => `/advance/categories/second-level-category/${categoryId}`;
export const URLThirdLevelCategory = (
  firstCategoryId: string = ":firstCategoryId",
  secondCategoryId: string = ":secondCategoryId"
): string =>
  `/advance/categories/third-level-category/${firstCategoryId}/${secondCategoryId}`;
export const URLSystemPermission = (userId: string = ":userId"): string =>
  `/advance/system/system-permission/${userId}`;
