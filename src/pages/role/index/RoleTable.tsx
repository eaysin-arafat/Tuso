/*
 * Created by: Andrew
 * Date created: 10.02.2024
 * Modified by: Andrew
 * Last modified: 03.03.2024
 * Reviewed by:
 * Date Reviewed:
 */

import TableSkeleton from "@/components/core/loader/TableSkeleton";
import Table from "@/components/core/table/Table";
import TableBody from "@/components/core/table/TableBody";
import TableHeader from "@/components/core/table/TableHeader";
import ErrorPage from "@/components/error-page/ErrorPage";
import NotFound from "@/components/not-found/NotFound";
import TableButton from "@/components/shared/table-button/TableButton";
import { useReadUserRolesQuery } from "@/features/role/role-api";
import useDataHandling from "@/hooks/shared/useDataHandle";
import { URLModulePermission } from "@/routers/routes-link";
import { useNavigate } from "react-router-dom";

/**
 * @description RoleTable component
 */
const RoleTable = () => {
  // read user roles query
  const {
    data: userRoles,
    isError,
    isLoading,
    isSuccess,
  } = useReadUserRolesQuery();

  // navigator
  const navigate = useNavigate();

  // data handling
  const { dataNotFound, isDataError, isDataLoading, isDataSuccess } =
    useDataHandling({
      isError,
      isLoading,
      isSuccess,
      length: userRoles?.data?.length,
    });

  return (
    <div className="">
      <div className="bg-whiteColor rounded-lg pb-4">
        {/* LOADING SKELETON */}
        {isDataLoading && <TableSkeleton />}

        {/* ERROR */}
        {isDataError && <ErrorPage />}

        {/* NOT FOUND */}
        {dataNotFound && <NotFound />}

        {/* TABLE  */}
        {isDataSuccess && (
          <Table className="min-w-[550px]">
            {/* TABLE HEADER */}
            <TableHeader
              data={[
                {
                  title: "Role Name",
                  w: "30%",
                },
                {
                  title: "",
                  w: "100px",
                },
              ]}
            />

            {/* TABLE BODY */}
            {userRoles?.data?.map((role, index) => (
              <TableBody
                key={index}
                index={index}
                length={userRoles?.data?.length}
                data={[
                  {
                    title: role?.roleName,
                    w: "30%",
                  },
                  {
                    title: (
                      <div className="flex ">
                        <TableButton
                          className="text-violetColor border border-violetColor px-2 py-0.5 rounded-md hover:bg-violetTransparentColor"
                          onClick={() => {
                            navigate(URLModulePermission(String(role?.oid)));
                          }}
                          text="Modules"
                        />
                      </div>
                    ),
                    w: "100px",
                  },
                ]}
              />
            ))}
          </Table>
        )}
      </div>
    </div>
  );
};

export default RoleTable;
