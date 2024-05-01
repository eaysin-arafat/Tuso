/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import Textarea from "@/components/core/form-elements/Textarea";
import { FormSubmitEventType } from "@/constants/interface/htmlEvents";
import { useCreateMessageMutation } from "@/features/message/message-api";
import useBaseDataCreate from "@/hooks/shared/useBaseDataCreate";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { styles } from "@/utilities/cn";
import { useState } from "react";
import toast from "react-hot-toast";
import { RiSendPlaneFill } from "react-icons/ri";
import { useSelector } from "react-redux";

// Props Type
type Props = {
  ticketId: number;
  isClose: boolean;
};

const MessageForm = ({ ticketId, isClose }: Props) => {
  // Local State
  const [message, setMessage] = useState<string>("");
  const [baseData] = useBaseDataCreate();

  // User Data
  const { user } = useSelector((state: RootState) => state.auth);

  // Create api mutation
  const [
    createMessage,
    {
      data: messageRes,
      status: createStatus,
      isError: isCreateError,
      error: createError,
      isSuccess: isCreateSuccess,
    },
  ] = useCreateMessageMutation();

  // Submit Handler
  const handleSubmit = (e: FormSubmitEventType) => {
    e.preventDefault();

    if (!message) {
      toast.error("Cannot Submit Empty");
      return;
    }

    const submitData = {
      ...baseData,
      messageDate: baseData?.dateCreated,
      messages: message,
      sender: user?.name + " " + user?.surname,
      isOpen: false,
      openDate: baseData?.dateCreated,
      incidentId: ticketId,
    };
    createMessage(submitData);
  };

  // handle create side Effects
  useCreateSideEffects({
    error: createError,
    isError: isCreateError,
    isSuccess: isCreateSuccess,
    status: createStatus,
    message: "message",
    messageType: "create",
    response: messageRes,
    initialState: "",
    setFormState: setMessage,
  });

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full mt-4 relative px-4"
      >
        {/* <TextEditor/> */}
        {/* Textarea Message Field */}
        <Textarea
          disabled={!isClose}
          placeholder={!isClose ? "Ticket Closed" : "Start Type..."}
          className="resize-none h-[54px] pe-24"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* Submit Button  */}
        <button
          type="submit"
          title={!isClose && "Ticket Closed"}
          disabled={!isClose}
          className={styles("absolute right-6 bottom-3 main_btn", {
            "cursor-not-allowed": !isClose,
          })}
          // onClick={handleSendMessage}
        >
          <RiSendPlaneFill /> Send
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
