/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

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
import { EmailConfiguration } from "@/constants/api-interface";
import { emailConfigurationModalTypes } from "@/constants/modal-types/modal-types";
import {
  useDeleteEmailConfigurationMutation,
  useReadEmailConfigurationsQuery,
} from "@/features/email-configuration/email-configuration-api";
import {
  closeAddModal,
  closeEditModal,
  openAddModal,
  openEditModal,
} from "@/features/modal/modal-slice";
import useDataHandling from "@/hooks/shared/useDataHandle";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { URLEmailTemplate } from "@/routers/routes-link";
import { deleteAlert } from "@/utilities/sweet-alert";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateEmailConfiguration from "../create/Create";
import EditEmailConfiguration from "../edit/Edit";

const EmailConfig = () => {
  //Add and Edit modal data from redux store
  const { addModal, editModal } = useSelector(
    (state: RootState) => state.modal
  );

  // pagination hook
  const paginationDefaultShowValue = [10, 20, 30, 50];
  const { setStart, start, setTake, take, activePage, setActivePage } =
    usePagination({
      paginationDefaultShowValue,
    });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Read Email Configuration hook
  const {
    data: emailConfigData,
    isError,
    isLoading,
    isSuccess,
  } = useReadEmailConfigurationsQuery();

  // Delete Email Configuration hook
  const [
    deleteEmailConfig,
    {
      data: emailDeleteRes,
      status: deleteStatus,
      isError: isDeleteError,
      error: deleteError,
      isSuccess: isDeleteSuccess,
    },
  ] = useDeleteEmailConfigurationMutation();

  // Read Email Configuration status handler hook
  const { dataNotFound, isDataError, isDataLoading, isDataSuccess } =
    useDataHandling({
      isError,
      isLoading,
      isSuccess,
      length: emailConfigData?.data?.length,
    });

  // Email Configuration Delete SideEffect
  useCreateSideEffects({
    error: deleteError,
    isError: isDeleteError,
    isSuccess: isDeleteSuccess,
    status: deleteStatus,
    message: "configuration email",
    messageType: "delete",
    response: emailDeleteRes,
  });

  // Create Modal Open Handler
  const handleAddEmailConfig = () => {
    dispatch(
      openAddModal({
        modalId: emailConfigurationModalTypes?.addEmailConfiguration,
        data: null,
      })
    );
  };

  // Edit Modal Open Handler
  const handleEditEmailConfig = (item: EmailConfiguration) => {
    dispatch(
      openEditModal({
        modalId: emailConfigurationModalTypes?.editEmailConfiguration,
        data: item,
      })
    );
  };

  // Close Modal handler
  const closeModal = () => {
    dispatch(closeAddModal());
    dispatch(closeEditModal());
  };

  return (
    <div className="">
      <div className="flex justify-end mb-3">
        <button onClick={handleAddEmailConfig} className="main_btn">
          <PlusIcon /> Add Configuration Email
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
                  title: "Email",
                  w: "20%",
                },
                {
                  title: "SMTP Server",
                  w: "20%",
                },
                {
                  title: "Port",
                  w: "20%",
                },
                {
                  title: "",
                  w: "220px",
                },
              ]}
            />
            {emailConfigData?.data?.map((item, index) => (
              <TableBody
                key={index}
                index={index}
                length={emailConfigData?.data?.length}
                data={[
                  {
                    title: item?.emailAddress,
                    w: "20%",
                  },
                  {
                    title: item?.smtpServer,
                    w: "20%",
                  },
                  {
                    title: String(item?.port),
                    w: "20%",
                  },
                  {
                    title: (
                      <div className="flex">
                        {/* Edit Button  */}
                        <TableButton
                          className="border-r border-borderColor pe-3 me-3 "
                          onClick={() => handleEditEmailConfig(item)}
                          icon={<BiEdit className="text-violetColor" />}
                          text="Edit"
                        />
                        {/* Delete Button  */}
                        <TableButton
                          className="border-r border-borderColor pe-3 me-3 "
                          onClick={() =>
                            deleteAlert(() =>
                              deleteEmailConfig(String(item?.oid))
                            )
                          }
                          icon={<BiTrash className="text-redColor" />}
                          text="Delete"
                        />

                        {/* Template Button */}
                        <TableButton
                          className="text-violetColor border border-violetColor px-2 py-0.5 rounded-md hover:bg-violetTransparentColor"
                          onClick={() => {
                            navigate(URLEmailTemplate());
                          }}
                          text="Template"
                        />
                      </div>
                    ),
                    w: "220px",
                  },
                ]}
              />
            ))}
          </Table>
        )}

        {/* Pagination Component  */}
        <div className="flex justify-end mx-5">
          <CustomPagination
            take={take}
            setTake={setTake}
            start={start}
            setStart={setStart}
            totalItemsCount={emailConfigData?.data?.length}
            showInPage={paginationDefaultShowValue}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </div>
      </div>

      {/* Create Modal Component */}
      {addModal?.modalId ===
        emailConfigurationModalTypes?.addEmailConfiguration && (
        <CreateEmailConfiguration toggler={closeModal} />
      )}

      {/* Edit Modal Component */}
      {editModal?.modalId ===
        emailConfigurationModalTypes?.editEmailConfiguration && (
        <EditEmailConfiguration toggler={closeModal} />
      )}
    </div>
  );
};

export default EmailConfig;
