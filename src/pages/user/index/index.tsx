/*
 * Created by: Andrew
 * Date created: 10.02.2024
 * Modified by: Andrew
 * Last modified: 03.03.2024
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import CustomPagination from "@/components/core/custom-pagination/CustomPagination";
import usePagination from "@/components/core/custom-pagination/usePagination";
import TableSkeleton from "@/components/core/loader/TableSkeleton";
import ErrorPage from "@/components/error-page/ErrorPage";
import NoPermission from "@/components/no-permission/NoPermission";
import NotFound from "@/components/not-found/NotFound";
import usePermissions from "@/components/sidebar/sidebar-routes-array/usePermissions";
import UserFilters from "@/components/user/filters/UserFilters";
import UserTable from "@/components/user/table/Table";
import { userModalTypes } from "@/constants/modal-types/modal-types";
import { openAddModal } from "@/features/modal/modal-slice";
import { useReadUserAccountByRoleNamePageQuery } from "@/features/user-accounts/user-accounts-api";
import useDataHandling from "@/hooks/shared/useDataHandle";
import PageLayout from "@/layout/PageLayout";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import CreateUser from "../create/CreateUser";

/**
 * @description UserList component
 */
const UserList = () => {
  // get modal state from redux
  const { addModal } = useSelector((state: RootState) => state.modal);

  // action dispatcher
  const dispatch = useDispatch();

  // role state
  const [role, setRole] = React.useState("");

  // search state
  const [search, setSearch] = React.useState("");

  // per page items count
  const paginationDefaultShowValue = [10, 20, 30, 50];

  // pagination custom hook
  const { setStart, start, setTake, take, activePage, setActivePage } =
    usePagination({
      paginationDefaultShowValue,
    });

  // user account by role name query
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

  // users data
  const users = userData?.data?.list;

  // total items count
  const totalItemsCount = userData?.data?.totalUser;

  // user modal open handler
  const handleOpenUserModal = () => {
    dispatch(
      openAddModal({
        modalId: userModalTypes?.userAddModalTypes,
        data: null,
      })
    );
  };

  // data handling custom hook
  const { dataNotFound, isDataError, isDataLoading, isDataSuccess } =
    useDataHandling({ isError, isLoading, isSuccess, length: users?.length });

  // user permission hooks
  const { userPermission } = usePermissions();

  // return no permission component if user has no permission
  if (!userPermission) return <NoPermission />;

  return (
    <>
      <div>
        {/* PAGE LAYOUT */}
        <PageLayout
          // USER FILTERS
          filter={
            <UserFilters
              filterRole={role}
              setStart={setStart}
              setActivePage={setActivePage}
              search={search}
              setFilterRole={setRole}
              setSearch={setSearch}
            />
          }
          // TITLE
          heading={{ title: "User List" }}
          // ADD USER BUTTON
          button={{
            buttonName: "Add User",
            buttonIcon: <FaPlus />,
            onClick: handleOpenUserModal,
          }}
          // PAGINATION
          pagination={
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
          }
        >
          {/* USER TABLE */}
          <div className="w-full">
            {/* TABLE SKELETON */}
            {isDataLoading && <TableSkeleton />}

            {/* ERROR MESSAGE */}
            {isDataError && <ErrorPage />}

            {/* NOT FOUND */}
            {dataNotFound && <NotFound />}

            {/* TABLE */}
            {isDataSuccess && <UserTable userData={users ?? []} />}
          </div>
        </PageLayout>

        {/* CREATE USER MODAL */}
        {addModal?.modalId === userModalTypes?.userAddModalTypes && (
          <CreateUser />
        )}
      </div>
    </>
  );
};

export default UserList;
