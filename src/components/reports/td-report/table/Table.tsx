/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import BadgeBtn from "@/components/core/buttons/BadgeBtn";
import Table from "@/components/core/table/Table";
import TableBody from "@/components/core/table/TableBody";
import TableHeader from "@/components/core/table/TableHeader";
import { Incident } from "@/constants/api-interface";
import { styles } from "@/utilities/cn";
import TextShowHide from "@/utilities/show-hide-text";
import dayjs from "dayjs";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { tableHeader } from "./table-data/table-header";

const TDReportTable = ({ itemList }: { itemList: Incident[] }) => {
  return (
    <div className="">
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="w-full mt-2 rounded-lg pb-2">
          {/* Table component */}
          <Table className="min-w-[5000px]">
            {/* Table header */}
            <TableHeader data={tableHeader()} />
            {/* Table body */}
            {/* Mapping through user list to render table rows */}
            {itemList?.map((item, index) => (
              <TableBody
                key={index}
                index={index}
                length={itemList?.length}
                data={[
                  {
                    title: item?.provinceName ?? "",
                    w: "150px",
                  },
                  {
                    title: item?.districtName ?? "",
                    w: "150px",
                  },
                  {
                    title: item?.facilityName ?? "",
                    w: "350px",
                  },
                  {
                    title: item?.startDate
                      ? dayjs(item?.startDate).format("DD-MMM-YYYY HH:mm")
                      : "",
                    w: "300px",
                  },
                  {
                    title: item?.fullName ?? "",
                    w: "200px",
                  },
                  {
                    title: item?.userCellphone ?? "",
                    w: "300px",
                  },
                  {
                    title: item?.userEmail ?? "",
                    w: "300px",
                  },
                  {
                    title: item?.dateOfIncident
                      ? dayjs(item?.dateOfIncident).format("DD-MMM-YYYY HH:mm")
                      : "",
                    w: "250px",
                  },
                  {
                    title: (
                      <BadgeBtn
                        className={styles(
                          "bg-lightGreenColor hover:bg-lightGreenColor text-greenColor",
                          {
                            "text-redColor bg-lightRedColor hover:bg-lightRedColor":
                              item?.status === "Close",
                          },
                          {
                            "text-violetColor bg-violetTransparentHoverColor hover:bg-violetTransparentHoverColor":
                              item?.isResolved && item?.status === "Open",
                          }
                        )}
                        btnText={`${item?.isResolved ? "Resolved & " : " "}${
                          item?.status
                        }`}
                        icon={<IoCheckmarkDoneOutline />}
                      />
                    ),
                    w: "300px",
                  },
                  {
                    title: item?.openByAdmin
                      ? dayjs(item?.openByAdmin).format("DD-MMM-YYYY HH:mm")
                      : null,
                    w: "250px",
                  },
                  {
                    title: item?.adminName,
                    w: "200px",
                  },
                  {
                    title: item?.openByAgent
                      ? dayjs(item?.openByAgent).format("DD-MMM-YYYY HH:mm")
                      : null,
                    w: "300px",
                  },
                  {
                    title: item?.agentName,
                    w: "150px",
                  },
                  {
                    title: item?.openBySupervisor
                      ? dayjs(item?.openBySupervisor).format(
                          "DD-MMM-YYYY HH:mm"
                        )
                      : null,
                    w: "300px",
                  },
                  {
                    title: item?.supervisorName,
                    w: "250px",
                  },
                  {
                    title: item?.openByExpertLead
                      ? dayjs(item?.openByExpertLead).format(
                          "DD-MMM-YYYY HH:mm"
                        )
                      : null,
                    w: "300px",
                  },
                  {
                    title: item?.expertLeadName,
                    w: "250px",
                  },
                  {
                    title: item?.openByExpert
                      ? dayjs(item?.openByExpert).format("DD-MMM-YYYY HH:mm")
                      : null,
                    w: "300px",
                  },
                  {
                    title: item?.expertName,
                    w: "200px",
                  },
                  {
                    title: item?.reassignDate
                      ? dayjs(item?.reassignDate).format("DD-MMM-YYYY HH:mm")
                      : "",
                    w: "300px",
                  },
                  {
                    title: item?.reassignedTo,
                    w: "250px",
                  },
                  {
                    title: item?.ticketTitle ?? "",
                    w: "300px",
                  },
                  {
                    title: item?.firstLevelCategory ?? "",
                    w: "200px",
                  },
                  {
                    title: item?.secondLevelCategory ?? "",
                    w: "200px",
                  },
                  {
                    title: item?.thirdLevelCategory ?? "",
                    w: "250px",
                  },
                  {
                    title: item?.systemName ?? "",
                    w: "400px",
                  },
                  {
                    title: item?.implementingPartnerName ?? "",
                    w: "250px",
                  },
                  {
                    title: item?.fundingAgencyName ?? "",
                    w: "200px",
                  },
                  {
                    title: item?.ticketClosed
                      ? dayjs(item?.ticketClosed).format("DD-MMM-YYYY ,HH:mm")
                      : "",
                    w: "300px",
                  },
                  {
                    title: item?.ticketNo?.toString()?.padStart(5, "0") || "",
                    w: "100px",
                  },
                  {
                    title: item?.totalPendingTime ?? "",
                    w: "150px",
                  },
                  {
                    title: item?.totalTime ?? "",
                    w: "150px",
                  },
                  {
                    title: item?.callerName ?? "",
                    w: "170px",
                  },

                  {
                    title: item?.callerEmail ?? "",
                    w: "300px",
                  },
                  {
                    title: item?.callerCellphone ?? "",
                    w: "280px",
                  },
                  {
                    title: item?.callerJobTitle ?? "",
                    w: "200px",
                  },
                  {
                    title: (
                      <TextShowHide
                        content={item?.description ?? ""}
                        length={50}
                      />
                    ),
                    w: "300px",
                  },
                ]}
              />
            ))}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TDReportTable;
