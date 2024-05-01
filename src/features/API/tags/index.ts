const apiTags = ["Countries", "Provinces"];
const CategoryTags = ["Category"];
const SystemTags = ["System"];
const EmailConfigTags = ["EmailConfig"];
const EmailControl = ["EmailControl"];
const UserList = ["UserList", "ReadUserByUsername", "ExpertUser", "UpdateUser"];
const SystemPermission = ["SystemPermission"];
const Modules = ["Modules"];
const ModulePermission = [
  "ModulePermission",
  "ModulePermissionByModule",
  "ModulePermissionByRole",
];
const Messages = ["Messages", "Message"];
const FacilityPermission = ["FacilityPermission"];
const Districts = ["Districts"];
const Profile = ["ProfilePicture"];
const Teams = ["Teams"];

export default [
  ...apiTags,
  ...CategoryTags,
  ...EmailConfigTags,
  ...SystemTags,
  ...EmailControl,
  ...UserList,
  ...SystemPermission,
  ...Modules,
  ...ModulePermission,
  ...Messages,
  ...FacilityPermission,
  ...Districts,
  ...Profile,
  ...Teams,
];
