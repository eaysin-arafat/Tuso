/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import BackIcon from "@/assets/icons/Back";
import TableSkeleton from "@/components/core/loader/TableSkeleton";
import Table from "@/components/core/table/Table";
import TableBody from "@/components/core/table/TableBody";
import TableHeader from "@/components/core/table/TableHeader";
import ErrorPage from "@/components/error-page/ErrorPage";
import NotFound from "@/components/not-found/NotFound";
import TableButton from "@/components/shared/table-button/TableButton";
import { editEmailTemplateModalTypes } from "@/constants/modal-types/modal-types";
import { useReadEmailTemplatesQuery } from "@/features/email-template/email-template-api";
import { closeEditModal, openEditModal } from "@/features/modal/modal-slice";
import useDataHandling from "@/hooks/shared/useDataHandle";
import { URLEmailConfiguration } from "@/routers/routes-link";
import TextShowHide from "@/utilities/show-hide-text";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditEmailTemplate from "../edit/EditEmailTemplate";

const EmailTemplates = () => {
  // Edit modal data from redux store
  const { editModal } = useSelector((state: RootState) => state.modal);

  // Navigate hook
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Read Email Templates hook
  const {
    data: emailTemplates,
    isError,
    isLoading,
    isSuccess,
  } = useReadEmailTemplatesQuery();

  // Read Email Templates Data status handler
  const { dataNotFound, isDataError, isDataLoading, isDataSuccess } =
    useDataHandling({
      isError,
      isLoading,
      isSuccess,
      length: emailTemplates?.data?.length,
    });

  // Edit Modal Open Handler
  const handleSchedulerEdit = (emailTemplate) => {
    dispatch(
      openEditModal({
        modalId: editEmailTemplateModalTypes?.editEmailTemplate,
        data: emailTemplate,
      })
    );
  };

  // Modal Close Handler
  const closeModal = () => {
    dispatch(closeEditModal());
  };

  return (
    <div className="">
      <div className="flex justify-between mb-3">
        {/* Back Button  */}
        <button
          onClick={() => {
            navigate(URLEmailConfiguration());
          }}
          className="back_btn"
        >
          <BackIcon /> Back
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
                  title: "Email Type",
                  w: "30%",
                },
                {
                  title: "Body",
                  w: "30%",
                },
                {
                  title: "",
                  w: "100px",
                },
              ]}
            />
            {emailTemplates?.data?.map((template, index) => (
              <TableBody
                key={index}
                index={index}
                length={emailTemplates?.data?.length}
                data={[
                  {
                    title: template?.subject,
                    w: "30%",
                  },
                  {
                    title: <TextShowHide content={template?.mailBody} />,
                    w: "30%",
                  },
                  {
                    title: (
                      <div className="flex ">
                        <TableButton
                          onClick={() => handleSchedulerEdit(template)}
                          icon={<BiEdit className="text-violetColor" />}
                          text="Edit"
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

      {/* Edit Modal  */}
      {editModal?.modalId ===
        editEmailTemplateModalTypes?.editEmailTemplate && (
        <EditEmailTemplate toggler={closeModal} />
      )}
    </div>
  );
};

export default EmailTemplates;
