import { useReadUserRolesQuery } from "@/features/role/role-api";

const useRoleName = (roleId) => {
  const { data: userRoles } = useReadUserRolesQuery();

  // Find the role name based on the roleId
  const roleName = userRoles?.data?.find(
    (userRole) => userRole?.oid === roleId
  )?.roleName;

  return roleName;
};

export default useRoleName;
