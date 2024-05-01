/*
 * Created by: Andrew
 * Date created: 10.11.2023
 * Modified by: Andrew
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import ticketCategorySVG from "../../../assets/svg/dashboard.svg"; // Adjust the path as per your project structure

/**
 * @description TicketStatus component.
 */

const TicketStatus = () => {
  return (
    <div
      className="hidden md:flex bg-no-repeat bg-right bg-whiteColor flex-col justify-between gap-14 p-5 rounded-lg"
      style={{
        backgroundImage: `url(${ticketCategorySVG})`,
      }}
    >
      {/* Ticket Count */}
      <h1 className="text-4xl font-semibold">8,642</h1>

      {/* Ticket Description */}
      <div>
        <p>Description of the ticket category.</p>
        <p>
          This is a two-line text block with specified word count for each line.
        </p>
      </div>
    </div>
  );
};

export default TicketStatus;
