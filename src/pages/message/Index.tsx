import Divider from "@/components/core/devider/Devider";
import NoPermission from "@/components/no-permission/NoPermission";
import usePermissions from "@/components/sidebar/sidebar-routes-array/usePermissions";
import { useReadIncidentsByTicketKeyQuery } from "@/features/incidents/incidents-api";
import { useReadMessageByIncidentKeyQuery } from "@/features/message/message-api";
import { URLTickets } from "@/routers/routes-link";
import { styles } from "@/utilities/cn";
import { transformMessage } from "@/utilities/transform-message";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import MessageForm from "./MessageForm";
import TicketDetails from "./TicketDetails";

const Messages = () => {
  // Local State
  const [transFormedMessages, setTransFormedMessages] = useState({});
  const { ticketId } = useParams<{ ticketId: string }>();

  // Messages End Reference
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Navigate hook
  const navigate = useNavigate();

  //Read Incidents By Ticket
  const { data: ticketData } = useReadIncidentsByTicketKeyQuery(ticketId, {
    skip: !ticketId,
    refetchOnMountOrArgChange: true,
  });

  // Read Message By Incident
  const { data: messageData } = useReadMessageByIncidentKeyQuery(ticketId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  // SideEffect for Scroll to bottom
  useEffect(() => {
    scrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageData, transFormedMessages]);

  const ticketDetails = ticketData?.data?.incidents;

  // Messages SideEffect
  useEffect(() => {
    if (messageData)
      setTransFormedMessages(transformMessage(messageData?.data));
  }, [messageData]);

  // module Permission hook
  const { ticketPermission } = usePermissions();
  if (!ticketPermission) return <NoPermission />;

  return (
    <div className="px-4">
      <div className="flex items-center gap-2">
        {/* Back Button  */}
        <button
          onClick={() => {
            navigate(URLTickets());
          }}
          title="Back"
          className="bg-whiteColor py-1.5 px-3 border border-borderColor rounded text-textColor text-sm 2xl:text-base"
        >
          <FaArrowLeft />
        </button>
        <h2 className="font-bold">Tickets</h2>{" "}
        <IoIosArrowForward className="h-3 text-grayColor" />
        {/* Ticket Number  */}
        <h4 className="font-bold">
          Ticket No : {ticketDetails?.oid?.toString()?.padStart(5, "0") || ""}
        </h4>
      </div>

      <div className="grid xl:grid-cols-3 gap-4 xl:gap-0 mt-3 pb-8 ">
        {/* Ticket Details  */}
        <TicketDetails ticketDetails={ticketDetails} />
        <div className="xl:col-span-2 bg-whiteColor shadow-light rounded-lg py-5 xl:rounded-s-none relative min-h-[430px] ">
          <div className="overflow-y-auto max-h-[400px] mb-9">
            {/* Messages  */}
            {Object.keys(transFormedMessages)?.map((key) => (
              <div key={key}>
                <Divider
                  text={dayjs(key)?.format("DD-MMM-YYYY")}
                  className="my-5"
                />
                {transFormedMessages?.[key]?.map((message, index) => {
                  return (
                    <div
                      key={index}
                      className={styles(`flex border-b mb-5 pb-5`, {
                        "border-none":
                          index === transFormedMessages?.[key]?.length - 1,
                      })}
                    >
                      <div className="max-w-12 max-h-12 ms-4 ">
                        <div className="h-1w-11 w-11 rounded-lg border shadow p-1 flex justify-center items-center">
                          <FaUserCircle className="h-full w-12 text-violetColor" />
                        </div>
                      </div>
                      <div className="mx-3">
                        <div className="flex items-center gap-4">
                          <h5 className="text-textColor font-bold capitalize">
                            {message?.result?.sender}
                          </h5>
                          <h5 className="text-lightGrayColor font-semibold text-xs">
                            at &nbsp;
                            {dayjs(message?.result?.messageDate).format(
                              "h:mm:ss a"
                            )}
                          </h5>
                        </div>
                        <p className="text-xs">{message?.result?.messages}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Form  */}
          <div className="absolute bottom-0 w-full mb-3 ">
            <MessageForm
              ticketId={Number(ticketId)}
              isClose={ticketDetails?.isOpen}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
