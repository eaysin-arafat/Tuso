import { RootState } from "@/app/store";
import TableSkeleton from "@/components/core/loader/TableSkeleton";
import Table from "@/components/core/table/Table";
import TableBody from "@/components/core/table/TableBody";
import TableHeader from "@/components/core/table/TableHeader";
import ErrorPage from "@/components/error-page/ErrorPage";
import NotFound from "@/components/not-found/NotFound";
import TableButton from "@/components/shared/table-button/TableButton";
import { modulesModalTypes } from "@/constants/modal-types/modal-types";
import { closeAddModal } from "@/features/modal/modal-slice";
import { useReadModulesQuery } from "@/features/modules/modules-api";
import useDataHandling from "@/hooks/shared/useDataHandle";
import { URLModuleByRole } from "@/routers/routes-link";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateModules from "../create/CreateModules";

const ModuleTable = () => {
  const { addModal } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: moduleData,
    isError,
    isLoading,
    isSuccess,
  } = useReadModulesQuery();

  // data handling
  const { dataNotFound, isDataError, isDataLoading, isDataSuccess } =
    useDataHandling({
      isError,
      isLoading,
      isSuccess,
      length: moduleData?.data?.length,
    });

  // const handleAddMember = () => {
  //   dispatch(
  //     openAddModal({
  //       modalId: modulesModalTypes?.addModules,
  //       data: null,
  //     })
  //   );
  // };

  // Modal Closer
  const closeModal = () => {
    dispatch(closeAddModal());
  };

  return (
    <div className="">
      <div className="flex justify-end mb-3">
        {/* <button onClick={handleAddMember} className="main_btn">
          <PlusIcon /> Add Module
        </button> */}
      </div>
      <div className="bg-whiteColor rounded-lg pb-4">
        {/* LOADING SKELETON */}
        {isDataLoading && <TableSkeleton />}

        {/* ERROR */}
        {isDataError && <ErrorPage />}

        {/* NOT FOUND */}
        {dataNotFound && <NotFound />}

        {/* TABLE  */}
        {isDataSuccess && (
          <Table className="min-w-[340px]">
            {/* Table Header  */}
            <TableHeader
              data={[
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
            {moduleData?.data?.map((module, index) => (
              <TableBody
                key={index}
                index={index}
                length={moduleData?.data?.length}
                data={[
                  {
                    title: module?.moduleName,
                    w: "30%",
                  },
                  {
                    title: (
                      <div className="flex ">
                        <TableButton
                          className="text-violetColor border border-violetColor px-2 py-0.5 rounded-md hover:bg-violetTransparentColor"
                          onClick={() => {
                            navigate(URLModuleByRole(String(module?.oid)));
                          }}
                          text="Roles"
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

      {/* Module Create Modal  */}
      {addModal?.modalId === modulesModalTypes?.addModules && (
        <CreateModules toggler={closeModal} />
      )}
    </div>
  );
};

export default ModuleTable;
