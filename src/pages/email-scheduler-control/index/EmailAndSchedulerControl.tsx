/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import { emailAndSchedulerControlModalTypes } from "@/constants/modal-types/modal-types";
import { closeEditModal, openEditModal } from "@/features/modal/modal-slice";
import { URLEmailStatus } from "@/routers/routes-link";
import { styles } from "@/utilities/cn";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditDeviceStatusEmail from "../edit/EditDeviceStatusEmail";

const EmailAndSchedulerControl = () => {
  // Edit modal data from redux store
  const { editModal } = useSelector((state: RootState) => state.modal);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Edit Modal Open handler
  const handleSchedulerEdit = () => {
    dispatch(
      openEditModal({
        modalId:
          emailAndSchedulerControlModalTypes?.editEmailAndSchedulerControl,
        data: null,
      })
    );
  };

  // Modal Close Handler
  const closeModal = () => {
    dispatch(closeEditModal());
  };

  return (
    <div className="">
      <div className="bg-whiteColor rounded-lg pb-4">
        {/* Header */}
        <div
          className={styles(
            "flex justify-between px-6 h-full border-b border-borderColor py-[6px]"
          )}
        >
          <p className="p-2 text-textColor text-[12px] 2xl:text-[14px] font-semibold">
            Email and Scheduler Control
          </p>
        </div>

        {/* Body */}
        {/* Scheduler */}
        <div
          className={styles(
            `flex justify-between items-center px-6 h-full border-b border-borderColor bg-whiteColor`
          )}
        >
          <div className="flex flex-col text-[11px] p-2 text-textColor 2xl:text-[13px] font-normal">
            Scheduler
          </div>

          <BiEdit
            className="text-violetColor cursor-pointer"
            onClick={handleSchedulerEdit}
          />
        </div>

        {/* // Email */}
        <div
          className={styles(
            `flex justify-between items-center px-6 h-full bg-whiteColor`
          )}
        >
          <div className="flex flex-col text-[11px] p-2 text-textColor 2xl:text-[13px] font-normal">
            Email
          </div>

          <BiEdit
            className="text-violetColor cursor-pointer"
            onClick={() => {
              navigate(URLEmailStatus());
            }}
          />
        </div>
      </div>

      {/* Scheduler Edit Modal  */}
      {editModal?.modalId ===
        emailAndSchedulerControlModalTypes?.editEmailAndSchedulerControl && (
        <EditDeviceStatusEmail toggler={closeModal} />
      )}
    </div>
  );
};

export default EmailAndSchedulerControl;
