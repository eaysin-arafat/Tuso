/*
 * Created by: Andrew
 * Date created: 10.11.2023
 * Modified by: Andrew
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import Input from "@/components/core/form-elements/Input";
import Select from "@/components/core/form-elements/Select";
import { useReadUserRolesQuery } from "@/features/role/role-api";

const UserFilters = ({
  filterRole,
  setFilterRole,
  search,
  setSearch,
  setStart,
  setActivePage,
}: {
  filterRole: string;
  setFilterRole: (role: string) => void;
  search: string;
  setSearch: (search: string) => void;
  setStart: (start: number) => void;
  setActivePage: (activePage: number) => void;
}) => {
  const { data: userRoles } = useReadUserRolesQuery();

  // render role options
  const renderRoleOptions = () => {
    return userRoles?.data?.map((role) => (
      <option key={role?.oid} value={role?.oid}>
        {role?.description}
      </option>
    ));
  };

  return (
    <div className="flex md:grid md:grid-cols-3 sm:col-span-full md:col-span-1 gap-3 items-center justify-center">
      <Input
        type="search"
        placeholder="Search by name..."
        name="search"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          setStart(1);
          setActivePage(1);
        }}
      />

      <Select
        selectShow="All"
        name="filterRole"
        value={filterRole}
        onChange={(event) => {
          setFilterRole(event.target.value);
          setStart(1);
          setActivePage(1);
        }}
      >
        {renderRoleOptions()}
      </Select>
    </div>
  );
};

export default UserFilters;
