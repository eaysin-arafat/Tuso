/*
 * Created by: Andrew
 * Date created: 10.02.2024
 * Modified by: Andrew
 * Last modified: 03.03.2024
 * Reviewed by:
 * Date Reviewed:
 */

import DefaultModal from "@/components/core/modal/DefaultModal";
import TicketForm from "@/components/tickets/ticket-form/TicketForm";

/**
 * @description Create Ticket component
 */
const CreateTicket = ({ toggler }: { toggler: () => void }) => {
  return (
    <DefaultModal toggler={toggler} title="Create Ticket">
      {/* TICKET FORM */}
      <TicketForm toggler={toggler} />
    </DefaultModal>
  );
};

export default CreateTicket;
