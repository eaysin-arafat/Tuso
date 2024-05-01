import { RootState } from "@/app/store";
import PlusIcon from "@/assets/icons/PlusIcon";
import CustomPagination from "@/components/core/custom-pagination/CustomPagination";
import usePagination from "@/components/core/custom-pagination/usePagination";
import TableSkeleton from "@/components/core/loader/TableSkeleton";
import Table from "@/components/core/table/Table";
import TableBody from "@/components/core/table/TableBody";
import TableHeader from "@/components/core/table/TableHeader";
import ErrorPage from "@/components/error-page/ErrorPage";
import NotFound from "@/components/not-found/NotFound";
import TableButton from "@/components/shared/table-button/TableButton";
import { SystemDataType } from "@/constants/api-interface/system";
import { systemModalTypes } from "@/constants/modal-types/modal-types";
import {
  closeAddModal,
  closeEditModal,
  openAddModal,
  openEditModal,
} from "@/features/modal/modal-slice";
import {
  useDeleteSystemMutation,
  useReadSystemsPaginationQuery,
} from "@/features/systems/system-api";
import useDataHandling from "@/hooks/shared/useDataHandle";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { URLUserBySystem } from "@/routers/routes-link";
import TextShowHide from "@/utilities/show-hide-text";
import { deleteAlert } from "@/utilities/sweet-alert";
import { BiEdit, BiTrash, BiUser } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateSystem from "../create/CreateSystem";
import EditSystem from "../edit/EditSystem";

const SystemTable = () => {
  const { addModal, editModal } = useSelector(
    (state: RootState) => state.modal
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // pagination default show value
  const paginationDefaultShowValue = [10, 20, 30, 50];
  const { setStart, start, setTake, take, activePage, setActivePage } =
    usePagination({
      paginationDefaultShowValue,
    });

  const {
    data: system,
    isError,
    isLoading,
    isSuccess,
  } = useReadSystemsPaginationQuery({
    start,
    take,
  });

  const [
    deleteSystem,
    {
      data: systemDataRes,
      status: deleteStatus,
      isError: isDeleteError,
      error: deleteError,
      isSuccess: isDeleteSuccess,
    },
  ] = useDeleteSystemMutation();

  const handleAddSystem = () => {
    dispatch(
      openAddModal({
        modalId: systemModalTypes?.addSystem,
        data: null,
      })
    );
  };

  const handleEditSystem = (item: SystemDataType) => {
    dispatch(
      openEditModal({
        modalId: systemModalTypes?.editSystem,
        data: item,
      })
    );
  };

  const closeModal = () => {
    dispatch(closeAddModal());
    dispatch(closeEditModal());
  };

  const { dataNotFound, isDataError, isDataLoading, isDataSuccess } =
    useDataHandling({
      isError,
      isLoading,
      isSuccess,
      length: system?.data?.systems?.length,
    });

  useCreateSideEffects({
    error: deleteError,
    isError: isDeleteError,
    isSuccess: isDeleteSuccess,
    status: deleteStatus,
    message: "system",
    messageType: "delete",
    response: systemDataRes,
  });

  return (
    <div className="">
      <div className="flex justify-end mb-3">
        <button onClick={handleAddSystem} className="main_btn">
          <PlusIcon /> Add System
        </button>
      </div>
      <div className="bg-whiteColor rounded-lg pb-4">
        {isDataLoading && <TableSkeleton />}
        {isDataError && <ErrorPage />}
        {dataNotFound && <NotFound />}
        {isDataSuccess && (
          <Table className="min-w-[550px]">
            <TableHeader
              data={[
                {
                  title: "Systems Name",
                  w: "30%",
                },
                {
                  title: "",
                  w: "210px",
                },
              ]}
            />
            {system?.data?.systems?.map(
              (item: SystemDataType, index: number) => {
                return (
                  <TableBody
                    key={index}
                    index={index}
                    length={system?.data?.systems?.length}
                    data={[
                      {
                        title: (
                          <>
                            <p className="font-bold">{item?.title}</p>
                            <TextShowHide
                              content={item?.description}
                              length={60}
                            />
                            <p>
                              <span className="font-bold">
                                Funding Agency : &nbsp;{" "}
                              </span>
                              {item?.fundingAgencies
                                ?.map((item) => item?.fundingAgencyName)
                                ?.join(", ")}
                            </p>
                            <p>
                              <span className="font-bold">
                                Implementing Partner : &nbsp;
                              </span>
                              {item?.implementingPartners
                                ?.map((item) => item?.implementingPartnerName)
                                ?.join(", ")}
                            </p>
                          </>
                        ),
                        w: "65%",
                      },
                      {
                        title: (
                          <div className="flex ">
                            <TableButton
                              className="border-r border-borderColor pe-3 me-3 "
                              onClick={() => handleEditSystem(item)}
                              icon={<BiEdit className="text-violetColor" />}
                              text="Edit"
                            />
                            <TableButton
                              className="border-r border-borderColor pe-3 me-3"
                              onClick={() =>
                                deleteAlert(() =>
                                  deleteSystem(String(item?.oid))
                                )
                              }
                              icon={<BiTrash className="text-redColor" />}
                              text="Delete"
                            />
                            <TableButton
                              onClick={() => {
                                navigate(URLUserBySystem(String(item?.oid)));
                              }}
                              icon={<BiUser className="text-blueColor" />}
                              text="Users"
                            />
                          </div>
                        ),
                        w: "210px",
                      },
                    ]}
                  />
                );
              }
            )}
          </Table>
        )}
        <div className="flex justify-end mx-5">
          <CustomPagination
            take={take}
            setTake={setTake}
            start={start}
            setStart={setStart}
            totalItemsCount={system?.data?.systems?.length}
            showInPage={paginationDefaultShowValue}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </div>
      </div>

      {addModal?.modalId === systemModalTypes?.addSystem && (
        <CreateSystem toggler={closeModal} />
      )}

      {editModal?.modalId === systemModalTypes?.editSystem && (
        <EditSystem toggler={closeModal} />
      )}
    </div>
  );
};

export default SystemTable;
