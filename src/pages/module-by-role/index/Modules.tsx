/*
 * Created by:
 * Date created: 10.11.2023
 * Modified by:
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import BackIcon from "@/assets/icons/Back";
import TableSkeleton from "@/components/core/loader/TableSkeleton";
import Table from "@/components/core/table/Table";
import TableBody from "@/components/core/table/TableBody";
import TableHeader from "@/components/core/table/TableHeader";
import ErrorPage from "@/components/error-page/ErrorPage";
import NotFound from "@/components/not-found/NotFound";
import { ModuleData } from "@/constants/api-interface/modules";
import { useReadModulePermissionByModuleQuery } from "@/features/module-permission/module-permission-api";
import { useReadModulesQuery } from "@/features/modules/modules-api";
import { useReadUserRolesQuery } from "@/features/role/role-api";
import useDataHandling from "@/hooks/shared/useDataHandle";
import { URLModule } from "@/routers/routes-link";
import { useNavigate, useParams } from "react-router-dom";

const ModuleByRoleTable = () => {
  // Navigate
  const navigate = useNavigate();

  // moduleId from parameter
  const { moduleId } = useParams<{ moduleId: string }>();

  // read modules
  const { data: modules } = useReadModulesQuery();

  // read user roles
  const { data: userRoles } = useReadUserRolesQuery();

  // read module permission
  const {
    data: moduleData,
    isError,
    isLoading,
    isSuccess,
  } = useReadModulePermissionByModuleQuery(String(moduleId), {
    skip: !moduleId,
  });

  // data handling
  const { dataNotFound, isDataError, isDataLoading, isDataSuccess } =
    useDataHandling({
      isError,
      isLoading,
      isSuccess,
      length: moduleData?.data?.length,
    });

  // module name populate
  const getModuleName = (moduleId: number) => {
    const name = modules?.data?.find(
      (module: ModuleData) => module.oid === moduleId
    );
    return name?.moduleName;
  };

  // user role name populate
  const getUserRoleName = (roleId: number) =>
    userRoles?.data?.find((role) => role?.oid === roleId)?.roleName;

  return (
    <>
      <div className="flex justify-between mb-3">
        {/* Back Button  */}
        <button
          onClick={() => {
            navigate(URLModule());
          }}
          className="back_btn"
        >
          <BackIcon /> Back
        </button>
      </div>
      <div className="bg-whiteColor rounded-lg pb-4">
        {/* Loading Skeleton  */}
        {isDataLoading && <TableSkeleton />}

        {/* Error  */}
        {isDataError && <ErrorPage />}

        {/* Not Found  */}
        {dataNotFound && <NotFound />}

        {/* Table  */}
        {isDataSuccess && (
          <Table className="min-w-[550px]">
            {/* Table Header  */}
            <TableHeader
              data={[
                {
                  title: "Module Name",
                  w: "50%",
                },
                {
                  title: "Role Name",
                  w: "50%",
                },
              ]}
            />

            {/* Table Body  */}
            {moduleData?.data?.map((module, index) => (
              <TableBody
                key={index}
                index={index}
                length={moduleData?.data?.length}
                data={[
                  {
                    title: getModuleName(module?.moduleId) ?? "",
                    w: "50%",
                  },
                  {
                    title: getUserRoleName(module?.roleId) ?? "",
                    w: "50%",
                  },
                ]}
              />
            ))}
          </Table>
        )}
      </div>
    </>
  );
};

export default ModuleByRoleTable;
