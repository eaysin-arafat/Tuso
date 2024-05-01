import { RootState } from "@/app/store";
import BackIcon from "@/assets/icons/Back";
import PlusIcon from "@/assets/icons/PlusIcon";
import CustomPagination from "@/components/core/custom-pagination/CustomPagination";
import usePagination from "@/components/core/custom-pagination/usePagination";
import TableSkeleton from "@/components/core/loader/TableSkeleton";
import Table from "@/components/core/table/Table";
import TableBody from "@/components/core/table/TableBody";
import TableHeader from "@/components/core/table/TableHeader";
import ErrorPage from "@/components/error-page/ErrorPage";
import NotFound from "@/components/not-found/NotFound";
import { UserRole } from "@/constants/enum/Role";
import { permissionModalTypes } from "@/constants/modal-types/modal-types";
import { closeAddModal, openAddModal } from "@/features/modal/modal-slice";
import {
  useDeleteModulePermissionMutation,
  useReadModulePermissionByRolePageQuery,
} from "@/features/module-permission/module-permission-api";
import { useReadModulesQuery } from "@/features/modules/modules-api";
import useDataHandling from "@/hooks/shared/useDataHandle";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { URLRole } from "@/routers/routes-link";
import { styles } from "@/utilities/cn";
import { deleteAlert } from "@/utilities/sweet-alert";
import { BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CreateModulePermission from "../create/CreateModulePermission";

const ModulePermissionTable = () => {
  const { addModal } = useSelector((state: RootState) => state.modal);

  // roleId from parameter
  const { roleId } = useParams<{ roleId: string }>();

  // Navigate
  const navigate = useNavigate();

  // action dispatcher
  const dispatch = useDispatch();

  // per page items count
  const paginationDefaultShowValue = [10, 20, 30, 50];

  // pagination hooks
  const { setStart, start, setTake, take, activePage, setActivePage } =
    usePagination({
      paginationDefaultShowValue,
    });

  // read role query
  const {
    data: userByRoleQuery,
    isError,
    isLoading,
    isSuccess,
  } = useReadModulePermissionByRolePageQuery(
    {
      key: roleId,
      start,
      take,
    },
    { skip: !roleId, refetchOnMountOrArgChange: true }
  );

  // read module query
  const { data: moduleData } = useReadModulesQuery();

  const getModuleName = (moduleId: number) => {
    const name = moduleData?.data?.find((module) => module.oid === moduleId);
    return name?.moduleName;
  };

  // Delete module permission mutation
  const [
    deleteModulePermission,
    {
      data: modulePermissionDeleteRes,
      status: deleteStatus,
      isError: isDeleteError,
      error: deleteError,
      isSuccess: isDeleteSuccess,
    },
  ] = useDeleteModulePermissionMutation();

  //  add module permission handler
  const handleAddModulePermission = () => {
    dispatch(
      openAddModal({
        modalId: permissionModalTypes?.addPermission,
        data: { roleId, moduleData: moduleData?.data },
      })
    );
  };

  // Modal closer
  const closeModal = () => {
    dispatch(closeAddModal());
  };

  // data handling
  const { dataNotFound, isDataError, isDataLoading, isDataSuccess } =
    useDataHandling({
      isError,
      isLoading,
      isSuccess,
      length: userByRoleQuery?.data?.length,
    });

  // Create SideEffect
  useCreateSideEffects({
    error: deleteError,
    isError: isDeleteError,
    isSuccess: isDeleteSuccess,
    message: "module permission",
    messageType: "delete",
    response: modulePermissionDeleteRes,
    status: deleteStatus,
  });

  return (
    <div className="">
      <div className="flex justify-between mb-3">
        {/* Back Button  */}
        <button
          onClick={() => {
            navigate(URLRole());
          }}
          className="back_btn"
        >
          <BackIcon /> Back
        </button>

        {/* Create Button  */}
        <button onClick={handleAddModulePermission} className="main_btn">
          <PlusIcon /> Create Permission
        </button>
      </div>
      <div className="bg-whiteColor rounded-lg pb-4">
        {/* Table Skeleton  */}
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
                  title: "Role Name",
                  w: "30%",
                },
                {
                  title: "Module Name",
                  w: "30%",
                },
                {
                  title: "",
                  w: "100px",
                },
              ]}
            />

            {/* Table Body  */}
            {userByRoleQuery?.data?.map((user, index) => (
              <TableBody
                key={index}
                index={index}
                length={userByRoleQuery?.data?.length}
                data={[
                  {
                    title: UserRole[user.roleId],
                    w: "30%",
                  },
                  {
                    title: getModuleName(user.moduleId) ?? "",
                    w: "30%",
                  },
                  {
                    title: (
                      <button
                        type="button"
                        className={styles(
                          "flex items-center justify-center gap-[6px] text-[12px] 2xl:text-[14px] table-button"
                        )}
                        onClick={() =>
                          deleteAlert(() =>
                            deleteModulePermission(String(user?.oid))
                          )
                        }
                      >
                        <BiTrash className="text-redColor" />
                        Delete
                      </button>
                    ),
                    w: "100px",
                  },
                ]}
              />
            ))}
          </Table>
        )}

        {/* Pagination  */}
        <div className="flex justify-end mx-5">
          <CustomPagination
            setStart={setStart}
            start={start}
            setTake={setTake}
            take={take}
            totalItemsCount={userByRoleQuery?.data?.length ?? 0}
            showInPage={paginationDefaultShowValue}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </div>
      </div>

      {/* Module Permission Create Modal */}
      {addModal?.modalId === permissionModalTypes?.addPermission && (
        <CreateModulePermission toggler={closeModal} />
      )}
    </div>
  );
};

export default ModulePermissionTable;
