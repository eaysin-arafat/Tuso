/*
 * Created by:
 * Date created: 10.11.2023
 * Modified by:
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import BackIcon from "@/assets/icons/Back";
import TableSkeleton from "@/components/core/loader/TableSkeleton";
import ErrorPage from "@/components/error-page/ErrorPage";
import NotFound from "@/components/not-found/NotFound";
import { emailStatusModalTypes } from "@/constants/modal-types/modal-types";
import { useReadEmailControlByKeyQuery } from "@/features/email-control/email-control-api";
import {
  closeAddModal,
  closeEditModal,
  openEditModal,
} from "@/features/modal/modal-slice";
import useDataHandling from "@/hooks/shared/useDataHandle";
import { styles } from "@/utilities/cn";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditEmailStatusClose from "../edit/incident-close/Edit";
import EditEmailStatusCreate from "../edit/incident-create/Create";

const EmailStatus = () => {
  // Edit modal data from redux store
  const { editModal } = useSelector((state: RootState) => state.modal);

  // Navigate hook
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Read Email Control
  const {
    data: emailControl,
    isError,
    isLoading,
    isSuccess,
  } = useReadEmailControlByKeyQuery("1");

  // Email Control Data status handler
  const { dataNotFound, isDataError, isDataLoading, isDataSuccess } =
    useDataHandling({
      isError,
      isLoading,
      isSuccess,
      length: Object.keys(emailControl?.data || {})?.length,
    });

  // Modal Close Handler
  const closeModal = () => {
    dispatch(closeAddModal());
    dispatch(closeEditModal());
  };

  // Create Modal Open Handler
  const handleEditEmailStatusCreate = () => {
    dispatch(
      openEditModal({
        modalId: emailStatusModalTypes?.editEmailStatusCreate,
        data: emailControl?.data,
      })
    );
  };

  // Edit Modal Open Handler
  const handleEditEmailStatusClose = () => {
    dispatch(
      openEditModal({
        modalId: emailStatusModalTypes?.editEmailStatusClose,
        data: emailControl?.data,
      })
    );
  };

  return (
    <div className="">
      <div className="flex justify-between mb-3">
        {/* Back Button  */}
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="back_btn"
        >
          <BackIcon /> Back
        </button>
      </div>

      <div className="bg-whiteColor rounded-lg pb-4">
        {/* Header */}
        <div
          className={styles(
            "flex justify-between px-6 h-full border-b border-borderColor py-[6px]"
          )}
        >
          <p className="p-2 text-textColor text-[12px] 2xl:text-[14px] font-semibold">
            Email Status
          </p>
        </div>

        {/* Body */}
        {/* Scheduler */}

        {isDataLoading && <TableSkeleton />}
        {isDataError && <ErrorPage />}
        {dataNotFound && <NotFound />}
        {isDataSuccess && (
          <>
            <div
              className={styles(
                `flex justify-between items-center px-6 h-full border-b border-borderColor bg-whiteColor`
              )}
            >
              <div className="flex flex-col text-[11px] p-2 text-textColor 2xl:text-[13px] font-normal w-[30%]">
                Email Send for Incident Create
              </div>

              <div className="flex flex-col text-[11px] p-2 text-textColor 2xl:text-[13px] font-normal w-[30%]">
                {emailControl?.data?.isEmailSendForIncidentCreate
                  ? "On"
                  : "Off"}
              </div>

              <BiEdit
                className="text-violetColor cursor-pointer"
                onClick={handleEditEmailStatusCreate}
              />
            </div>

            {/* // Email */}
            <div
              className={styles(
                `flex justify-between items-center px-6 h-full border-b border-borderColor bg-whiteColor`
              )}
            >
              <div className="flex flex-col text-[11px] p-2 text-textColor 2xl:text-[13px] font-normal w-[30%]">
                Email Send for Incident Close
              </div>

              <div className="flex flex-col text-[11px] p-2 text-textColor 2xl:text-[13px] font-normal w-[30%]">
                {emailControl?.data?.isEmailSendForIncidentClose ? "On" : "Off"}
              </div>

              <BiEdit
                className="text-violetColor cursor-pointer"
                onClick={handleEditEmailStatusClose}
              />
            </div>
          </>
        )}
      </div>

      {/* Edit Email Status Create */}
      {editModal?.modalId === emailStatusModalTypes?.editEmailStatusCreate && (
        <EditEmailStatusCreate toggler={closeModal} />
      )}

      {/* Edit Email Status Close */}
      {editModal?.modalId === emailStatusModalTypes?.editEmailStatusClose && (
        <EditEmailStatusClose toggler={closeModal} />
      )}
    </div>
  );
};

export default EmailStatus;
