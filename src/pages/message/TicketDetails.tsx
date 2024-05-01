/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import Accordion from "@/components/core/accordion/Accordion";
import DataRow from "@/components/core/table/DataRow";
import useWindowWidth from "@/hooks/shared/useWindowWidth";
import { DateFunc } from "@/utilities/date";
import { RxCross2 } from "react-icons/rx";

// type Props = {
//   ticketDetails: List;
// };

const TicketDetails = ({ ticketDetails }) => {
  const w1280 = useWindowWidth(1280);

  // Modal handler
  const handleConvert = (index) => {
    const modal = document.getElementById(
      `my_modal_4${index}`
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <div className=" overflow-y-auto">
      <div className="xl:col-span-1 h-full ">
        {/* Ticket Details  */}
        <Accordion
          isAccordion={w1280 && true}
          title="Ticket Details"
          boxClass="xl:border-e-0 xl:rounded-e-none "
        >
          <div className="grid gap-1 md:grid-cols-2 xl:grid-cols-1">
            <DataRow
              title="Date Reported"
              data={DateFunc?.formatDate(ticketDetails?.dateReported ?? "")}
              titleClass="text-white"
              dataClass="text-white"
            />
            <DataRow
              title="Status"
              data={
                ticketDetails?.isOpen
                  ? "Open"
                  : !ticketDetails?.isOpen
                  ? "Close"
                  : ""
              }
              titleClass="text-white"
              dataClass="text-white"
            />
            <DataRow
              title="Caller Name"
              data={ticketDetails?.callerName ?? ""}
              titleClass="text-white"
              dataClass="text-white"
            />
            <DataRow
              title="Caller Phone"
              data={ticketDetails?.callerCellphone ?? ""}
              titleClass="text-white"
              dataClass="text-white"
            />
            <DataRow
              title="Caller Email"
              data={ticketDetails?.callerEmail ?? ""}
              titleClass="text-white"
              dataClass="text-white"
            />
            <DataRow
              title="Caller Job Title"
              data={ticketDetails?.callerJobTitle ?? ""}
              titleClass="text-white"
              dataClass="text-white"
            />
          </div>

          {/* Ticket Attachment  */}
          {ticketDetails?.screenshots?.length > 0 && (
            <div className="flex col-span-full gap-4">
              {ticketDetails?.screenshots?.map((image, index) => (
                <div key={index} className=" flex">
                  <button
                    type="button"
                    className="text-sm text-white cursor-pointer underline mb-3 "
                    onClick={() => handleConvert(index)} // Pass index to identify the correct image
                  >
                    Attachment {index + 1}
                  </button>

                  <dialog id={`my_modal_4${index}`} className="modal">
                    {" "}
                    {/* Use index to generate unique IDs */}
                    <div className="modal-box w-full max-w-5xl h-[90%] p-0">
                      <form method="dialog">
                        <button className="float-end p-2 bg-borderColor">
                          <RxCross2 />
                        </button>
                      </form>
                      <img
                        src={`data:image/png;base64,${image}`}
                        alt=""
                        className="h-full"
                      />
                    </div>
                  </dialog>
                </div>
              ))}
            </div>
          )}

          <h5 className="text-white">{ticketDetails?.description}</h5>
        </Accordion>
      </div>

      {/* Attachment Modal  */}
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-full max-w-5xl p-0">
          <form method="dialog">
            <button className="float-end p-2 bg-borderColor">
              <RxCross2 />
            </button>
          </form>
          <img
            src={`data:image/png;base64,${ticketDetails?.screenshots[0]}`}
            alt=""
          />
        </div>
      </dialog>
    </div>
  );
};

export default TicketDetails;
