/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

/**
 * PageLayout component
 * @description Component representing a layout for pages with a heading, button, filter, pagination, and children content.
 * @param {Object} heading - Optional heading configuration.
 * @param {string} heading.title - The title of the page.
 * @param {string} heading.subtitle - The subtitle of the page.
 * @param {string} heading.headingClass - Additional CSS class for the heading.
 * @param {Object} button - Optional button configuration.
 * @param {string} button.buttonName - The name of the button.
 * @param {JSX.Element} button.buttonIcon - The icon of the button.
 * @param {() => void} button.onClick - The click handler for the button.
 * @param {JSX.Element} filter - Optional filter component.
 * @param {JSX.Element} children - The children elements of the layout.
 * @param {string} childrenClassName - Additional CSS class for the children container.
 * @param {JSX.Element} pagination - Optional pagination component.
 * @returns {JSX.Element} PageLayout component
 */

import CustomPagination from "@/components/core/custom-pagination/CustomPagination";
import usePagination from "@/components/core/custom-pagination/usePagination";
import Input from "@/components/core/form-elements/Input";
import Select from "@/components/core/form-elements/Select";
import TableSkeleton from "@/components/core/loader/TableSkeleton";
import ErrorPage from "@/components/error-page/ErrorPage";
import NoPermission from "@/components/no-permission/NoPermission";
import NotFound from "@/components/not-found/NotFound";
import usePermissions from "@/components/sidebar/sidebar-routes-array/usePermissions";
import UserTable from "@/components/user/table/Table";
import { useReadUserRolesQuery } from "@/features/role/role-api";
import { useReadUserAccountByRoleNamePageQuery } from "@/features/user-accounts/user-accounts-api";
import useDataHandling from "@/hooks/shared/useDataHandle";
import React from "react";
import { FaPlus } from "react-icons/fa";

const PageLayoutE = () => {
  const [role, setRole] = React.useState("");
  const [search, setSearch] = React.useState("");

  // pagination default show value
  const paginationDefaultShowValue = [10, 20, 30, 50];
  const { setStart, start, setTake, take, activePage, setActivePage } =
    usePagination({
      paginationDefaultShowValue,
    });

  const {
    data: userData,
    isLoading,
    isError,
    isSuccess,
  } = useReadUserAccountByRoleNamePageQuery({
    search,
    key: role,
    start,
    take,
  });

  const users = userData?.data?.list;
  const totalItemsCount = userData?.data?.totalUser;

  const { data: userRoles } = useReadUserRolesQuery();

  // render role options
  const renderRoleOptions = () => {
    return userRoles?.data?.map((role) => (
      <option key={role?.oid} value={role?.oid}>
        {role?.description}
      </option>
    ));
  };

  const { dataNotFound, isDataError, isDataLoading, isDataSuccess } =
    useDataHandling({ isError, isLoading, isSuccess, length: users?.length });

  const { userPermission } = usePermissions();
  if (!userPermission) return <NoPermission />;

  return (
    <div className="bg-bgColor w-full px-4">
      <div className="flex flex-col">
        {/* Heading */}
        <div className={`flex justify-between items-end`}>
          <div className="pt-2">
            <h1>User List</h1>
          </div>

          <button className="main_btn" onClick={() => {}}>
            <FaPlus /> Add User
          </button>
        </div>

        {/* Filter */}
        <div className="leading-[125%] mt-2">
          <div className="grid grid-cols-3 sm:col-span-full md:col-span-1 gap-3 items-center justify-center">
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
              value={role}
              onChange={(event) => {
                setRole(event.target.value);
                setStart(1);
                setActivePage(1);
              }}
            >
              {renderRoleOptions()}
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className={`bg-whiteColor rounded-xl min-w-full my-3 shadow-sm`}>
          <div className="w-full">
            {isDataLoading && <TableSkeleton />}
            {isDataError && <ErrorPage />}
            {dataNotFound && <NotFound />}
            {isDataSuccess && <UserTable userData={users ?? []} />}
          </div>
          {/* Pagination */}
          <CustomPagination
            take={take}
            setTake={setTake}
            start={start}
            setStart={setStart}
            totalItemsCount={totalItemsCount}
            showInPage={paginationDefaultShowValue}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </div>
      </div>
    </div>
  );
};

export default PageLayoutE;
