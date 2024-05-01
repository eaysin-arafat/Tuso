/*
 * Created by: Andrew
 * Date created: 10.11.2023
 * Modified by: Andrew
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import { ClientIncdent, IncidentByUserName } from "@/constants/api-interface";
import { FaPlus } from "react-icons/fa";
import { LuCheck } from "react-icons/lu";
import { TiMinus } from "react-icons/ti";
import TicketCategoryCard from "../ticket-category-card/TicketCategoryCard";

/**
 * @description TicketCategory component.
 */
const TicketCategory = ({
  incidents,
  isAdministrator,
  isAgent,
  isExpert,
  isSupervisor,
  isClient,
  clientIncident,
}: {
  incidents: IncidentByUserName;
  isClient: boolean;
  isAgent: boolean;
  isSupervisor: boolean;
  isExpert: boolean;
  isAdministrator: boolean;
  clientIncident: ClientIncdent;
}) => {
  // Check if the user is a role without client
  const isRoleWithoutClient =
    isAgent || isSupervisor || isAdministrator || isExpert;

  return (
    <div
      className="flex gap-5 overflow-x-auto"
      style={{ scrollbarWidth: "none" }}
    >
      {(isClient || isRoleWithoutClient) && (
        <TicketCategoryCard
          ticketColor="text-orangeColor"
          ticketTitle="Total Tickets"
          ticketAmount={
            isClient ? clientIncident?.totalTickets : incidents?.totalIncidents
          }
        />
      )}

      {(isClient || isRoleWithoutClient) && (
        <TicketCategoryCard
          ticketColor="text-violetColor"
          ticketTitle="Open Tickets"
          ticketAmount={
            isClient
              ? clientIncident?.totalOpenTickets
              : incidents?.unresolvedIncidents
          }
        />
      )}

      {(isClient || isRoleWithoutClient) && (
        <TicketCategoryCard
          ticketColor="text-greenColor"
          badgeIcon={{
            icon: <LuCheck size={7} />,
            className: "bg-greenColor",
          }}
          ticketTitle="Closed Tickets"
          ticketAmount={
            isClient
              ? clientIncident?.totalCloseTickets
              : incidents?.resolvedIncidents
          }
        />
      )}

      {isRoleWithoutClient && (
        <TicketCategoryCard
          ticketColor="text-redColor"
          ticketTitle="Urgent Tickets"
          ticketAmount={incidents?.totalUrgent}
        />
      )}

      {(isAgent || isSupervisor || isAdministrator) && (
        <TicketCategoryCard
          ticketColor="text-lightVioletColor"
          ticketTitle="Unassigned Tickets"
          badgeIcon={{
            icon: <TiMinus size={7} />,
            className: "bg-lightVioletColor",
          }}
          ticketAmount={incidents?.totalUnassigned}
        />
      )}

      {(isAgent || isAdministrator || isSupervisor) && (
        <TicketCategoryCard
          ticketColor="text-violetColor"
          badgeIcon={{
            icon: <FaPlus size={7} />,
            className: "bg-violetColor",
          }}
          ticketTitle="Assigned Tickets"
          ticketAmount={incidents?.totalAssigned}
        />
      )}
    </div>
  );
};

export default TicketCategory;
