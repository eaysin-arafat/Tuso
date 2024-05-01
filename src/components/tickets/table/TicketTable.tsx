/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import BadgeBtn from "@/components/core/buttons/BadgeBtn";
import Table from "@/components/core/table/Table";
import TableBody from "@/components/core/table/TableBody";
import TableHeader from "@/components/core/table/TableHeader";
import TableButton from "@/components/shared/table-button/TableButton";
import { Incident, User } from "@/constants/api-interface";
import { createTicketModalTypes } from "@/constants/modal-types/modal-types";
import {
  useCloseIncidentMutation,
  useUpdateIncidentMutation,
} from "@/features/incidents/incidents-api";
import {
  closeAddModal,
  closeEditModal,
  openEditModal,
} from "@/features/modal/modal-slice";
import useBaseDataEdit from "@/hooks/shared/useBaseDataEdit";
import CreateTicket from "@/pages/tickets/create/Create";
import EditTicket from "@/pages/tickets/edit/Edit";
import { URLFollowUp } from "@/routers/routes-link";
import { styles } from "@/utilities/cn";
import { DateFunc } from "@/utilities/date";
import TextShowHide from "@/utilities/show-hide-text";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiEdit, BiTrash } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaComment, FaEye, FaRegCheckCircle } from "react-icons/fa";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { clientTableHeaders, tableHeaders } from "./table-data/table-header";

const TicketTable = ({
  userList,
  user,
}: {
  userList: Incident[];
  user: User;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editBase] = useBaseDataEdit();

  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );

  const { addModal, editModal } = useSelector(
    (state: RootState) => state.modal
  );

  const handleEditTicketModal = (data: Incident) => {
    dispatch(
      openEditModal({
        modalId: createTicketModalTypes?.editCreateTicket,
        data: data,
      })
    );
  };

  const closeModal = () => {
    dispatch(closeAddModal());
    dispatch(closeEditModal());
  };

  // const [openDropdownIndex, setOpenDropdownIndex] = useState(0);
  const toggleDropdown = (index: number) => {
    setOpenDropdownIndex((prevIndex: number) =>
      prevIndex === index ? null : index
    );
  };

  console.log({ userList });

  // const [
  //   closeIncident,
  //   {
  //     status: deleteStatus,
  //     isError: isDeleteError,
  //     error: deleteError,
  //     isSuccess: isDeleteSuccess,
  //   },
  // ] = useCloseIncidentMutation();

  // const handleDelete = (item: Incident) => {
  //   Swal.fire({
  //     title: "Are you sure, you want to Close this ticket?",
  //     icon: "question",
  //     showCancelButton: true,
  //     confirmButtonColor: "#d33",
  //     cancelButtonColor: "#3085d6",
  //     confirmButtonText: "Close",
  //     allowOutsideClick: false,
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       closeIncident({
  //         oid: Number(item?.ticketNo),
  //         // expertId: item?.expertId,
  //         userId: editBase?.modifiedBy,
  //       });
  //     }
  //   });
  // };

  const [
    closeIncident,
    {
      status: closeStatus,
      isError: isCloseError,
      error: closeError,
      isSuccess: isCloseSuccess,
    },
  ] = useCloseIncidentMutation();

  const [
    updateIncident,
    {
      status: deleteStatus,
      isError: isDeleteError,
      error: deleteError,
      isSuccess: isDeleteSuccess,
    },
  ] = useUpdateIncidentMutation();

  const handleResolve = (item: Incident) => {
    Swal.fire({
      title:
        user?.roleId === 4
          ? "Are you sure, you want to mark resolve to this ticket?"
          : "Are you sure, you want to close this ticket?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor:
        user?.roleId === 4 ? "var(--violetColor)" : "var(--redColor)",
      cancelButtonColor: "#3085d6",
      confirmButtonText: user?.roleId === 4 ? "Resolved" : "Close",
      allowOutsideClick: false,
    }).then((result) => {
      if (result?.isConfirmed) {
        const submitEditData = {
          ...editBase,
          ...item,
          isResolved: user?.roleId === 4 ? true : false,
          isOpen: user?.roleId !== 4 ? false : true,
        };
        if (user?.roleId === 4) {
          updateIncident({ key: Number(item?.ticketNo), body: submitEditData });
        }

        if (user?.roleId !== 4) {
          closeIncident({
            oid: Number(item?.ticketNo),
            userId: editBase?.modifiedBy,
            // expertId: item?.expertId,
          });
        }
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement; // Explicitly type event.target as HTMLElement
      if (
        openDropdownIndex !== null &&
        !target.closest(".dropdown-container")
      ) {
        setOpenDropdownIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdownIndex]);

  React.useEffect(() => {
    if (isDeleteSuccess && deleteStatus === "fulfilled") {
      toast.dismiss();
      toast.success(`Ticket has been Resolved successfully`);
    } else if (isDeleteError && deleteError && "data" in deleteError) {
      toast.dismiss();
      toast.error(
        typeof deleteError.data === "string"
          ? deleteError?.data
          : "Error Close Ticket."
      );
    }
  }, [isDeleteSuccess, deleteStatus, isDeleteError, deleteError]);

  React.useEffect(() => {
    if (isCloseSuccess && closeStatus === "fulfilled") {
      toast.dismiss();
      toast.success(`Ticket has been Closed successfully`);
    } else if (isCloseError && closeError && "data" in closeError) {
      toast.dismiss();
      toast.error(
        typeof closeError.data === "string"
          ? closeError?.data
          : "Error Close Ticket."
      );
    }
  }, [isCloseSuccess, closeStatus, isCloseError, closeError]);

  const assignPermission =
    user?.roleId === 3 ||
    user?.roleId === 5 ||
    (user?.roleId === 4 && user?.isTeamLead);

  //! if Client Role
  if (user?.roleId === 1) {
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
            <Table className="min-w-[1400px]">
              {/* Table header */}
              <TableHeader data={clientTableHeaders()} />
              {/* Table body */}
              {/* Mapping through user list to render table rows */}
              {userList?.map((item, index: number) => {
                const isAgentEditHide =
                  user?.roleId === 2 && item?.thirdLevelCategoryId;
                const isSupervisorEditHide = user?.roleId === 3 && item?.teamId;
                // const isExpertEditHide =
                //   user?.roleId === 4 && user?.isTeamLead && item?.expertName;

                return (
                  <TableBody
                    key={index}
                    index={index}
                    length={userList?.length}
                    data={[
                      {
                        title:
                          "# " + item?.ticketNo?.toString()?.padStart(5, "0") ||
                          "",
                        w: "300px",
                      },
                      {
                        title: (
                          <BadgeBtn
                            className={styles(
                              "bg-lightGreenColor hover:bg-lightGreenColor text-greenColor w-28",
                              {
                                "text-redColor bg-lightRedColor hover:bg-lightRedColor":
                                  item?.status === "Close",
                              },
                              {
                                "text-violetColor bg-violetTransparentHoverColor hover:bg-violetTransparentHoverColor":
                                  item?.status === "Close" && item?.isResolved,
                              }
                            )}
                            btnText={`${
                              item?.isResolved ? "Resolved & " : " "
                            }${item?.status}`}
                            // {
                            //   `${item?.status}${
                            //     item?.isResolved ? " & Resolved" : ""
                            //   }`
                            // }
                            // btnText={item?.status ?? ""}
                            icon={<IoCheckmarkDoneOutline />}
                          />
                        ),
                        w: "450px",
                      },
                      {
                        title: item?.fullName ?? "",
                        w: "350px",
                      },
                      {
                        title: item?.provinceName ?? "",
                        w: "350px",
                      },
                      {
                        title: item?.districtName ?? "",
                        w: "350px",
                      },
                      {
                        title: item?.facilityName ?? "",
                        w: "350px",
                      },
                      {
                        title: item?.systemName ?? "",
                        w: "300px",
                      },
                      {
                        title: DateFunc.formatDate(item?.dateOfIncident),
                        w: "300px",
                      },
                      {
                        title: (
                          <TextShowHide
                            content={item?.description}
                            length={50}
                          />
                        ),
                        w: "500px",
                      },
                      {
                        title: (
                          <div className="">
                            <div className="relative ms-[10px] 2xl:ms-[13px]">
                              <BsThreeDotsVertical
                                className="cursor-pointer dropdown-container"
                                onClick={() =>
                                  toggleDropdown(Number(item?.ticketNo) || -1)
                                }
                              />
                              {/* lg:right-[110px] 2xl:top-[-68px] */}
                              {openDropdownIndex === Number(item?.ticketNo) && (
                                <div
                                  className={`dropdown-container absolute text-xl right-[110px] top-[-68px] flex flex-col items-start gap-1 bg-whiteColor px-4 py- rounded-md font-medium border border-borderColor shadow-lg `}
                                >
                                  <TableButton
                                    // isTicketClosed={item?.status === "Close"}
                                    onClick={() => {
                                      handleEditTicketModal(item);
                                      toggleDropdown(
                                        Number(item?.ticketNo) || -1
                                      );
                                    }}
                                    disabled={
                                      isAgentEditHide || isSupervisorEditHide
                                    }
                                    icon={
                                      item?.status === "Close" ? (
                                        <FaEye className="text-violetColor" />
                                      ) : (
                                        <BiEdit className="text-violetColor" />
                                      )
                                    }
                                    text={
                                      item?.status === "Close" ? "View" : "Edit"
                                    }
                                  />
                                  <TableButton
                                    // isTicketClosed={item?.status === "Close"}
                                    onClick={() => {
                                      navigate(URLFollowUp(item?.ticketNo));
                                    }}
                                    icon={
                                      <FaComment
                                        className={styles("text-violetColor")}
                                      />
                                    }
                                    text="Comments"
                                    className=""
                                  />
                                  <TableButton
                                    isTicketClosed={item?.status === "Close"}
                                    onClick={() => handleResolve(item)}
                                    icon={
                                      <BiTrash
                                        className={styles("text-redColor", {
                                          "text-grayColor":
                                            item?.status === "Close",
                                        })}
                                      />
                                    }
                                    text="Close"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        ),
                        w: "250px",
                      },
                    ]}
                  />
                );
              })}
            </Table>
          </div>
        </div>

        {addModal?.modalId === createTicketModalTypes?.addCreateTicket && (
          <CreateTicket toggler={closeModal} />
        )}
        {editModal?.modalId === createTicketModalTypes?.editCreateTicket && (
          <EditTicket toggler={closeModal} />
        )}
      </div>
    );
  } else {
    //! if no Client Role

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
            <Table className="min-w-[1800px]">
              {/* Table header */}
              <TableHeader data={tableHeaders()} />
              {/* Table body */}
              {/* Mapping through user list to render table rows */}
              {userList?.map((item, index: number) => {
                return (
                  <TableBody
                    key={index}
                    index={index}
                    length={userList?.length}
                    data={[
                      {
                        title:
                          "# " + item?.ticketNo?.toString()?.padStart(5, "0") ||
                          "",
                        w: "300px",
                      },
                      {
                        title: (
                          <BadgeBtn
                            className={styles(
                              "bg-lightGreenColor hover:bg-lightGreenColor text-greenColor w-[160px] !gap-1.5",
                              {
                                "text-redColor bg-lightRedColor hover:bg-lightRedColor":
                                  item?.status === "Close",
                              },
                              {
                                "text-violetColor bg-violetTransparentHoverColor hover:bg-violetTransparentHoverColor":
                                  item?.isResolved && item?.status === "Open",
                              }
                            )}
                            btnText={`${
                              item?.isResolved ? "Resolved & " : " "
                            }${item?.status}`}
                            icon={<IoCheckmarkDoneOutline />}
                          />
                        ),
                        w: "700px",
                      },
                      {
                        title: item?.fullName ?? "",
                        w: "350px",
                      },
                      {
                        title: item?.provinceName ?? "",
                        w: "350px",
                      },
                      {
                        title: item?.districtName ?? "",
                        w: "350px",
                      },
                      {
                        title: item?.facilityName ?? "",
                        w: "350px",
                      },
                      {
                        title: item?.systemName ?? "",
                        w: "300px",
                      },
                      {
                        title: item?.teamName ?? "",
                        w: "450px",
                      },
                      {
                        title: item?.isReassigned
                          ? "Reassign"
                          : item?.expertName ?? "Unassign",
                        // title: item?.expertName ?? "--",
                        w: "300px",
                      },
                      {
                        title: item?.firstLevelCategory ?? "",
                        w: "400px",
                      },
                      {
                        title: item?.secondLevelCategory ?? "",
                        w: "400px",
                      },
                      {
                        title: item?.thirdLevelCategory ?? "",
                        w: "400px",
                      },
                      {
                        title: DateFunc.formatDate(item?.dateReported),
                        w: "380px",
                      },
                      {
                        title: DateFunc.formatDate(item?.dateOfIncident),
                        w: "300px",
                      },
                      {
                        title: (
                          <TextShowHide
                            content={item?.description}
                            length={50}
                          />
                        ),
                        w: "600px",
                      },
                      {
                        title: (
                          <>
                            <div className="relative ms-[10px] 2xl:ms-[13px] ">
                              <BsThreeDotsVertical
                                className="cursor-pointer dropdown-container"
                                onClick={() =>
                                  toggleDropdown(Number(item?.ticketNo) || -1)
                                }
                              />

                              {openDropdownIndex === Number(item?.ticketNo) && (
                                <div className="absolute text-xl right-[80px] top-[-68px] flex flex-col items-start gap-1 bg-whiteColor px-4 py- rounded-md font-medium border border-borderColor shadow-lg dropdown-container">
                                  <TableButton
                                    // isTicketClosed={item?.status === "Close"}
                                    onClick={() => {
                                      handleEditTicketModal(item);
                                      toggleDropdown(
                                        Number(item?.ticketNo) || -1
                                      );
                                    }}
                                    // disabled={
                                    //   isAgentEditHide || isSupervisorEditHide
                                    // }
                                    icon={
                                      item?.status === "Close" ? (
                                        <FaEye className="text-violetColor" />
                                      ) : (
                                        <BiEdit className="text-violetColor" />
                                      )
                                    }
                                    text={
                                      item?.status === "Close"
                                        ? "View"
                                        : assignPermission
                                        ? item?.isReassigned
                                          ? "Reassign"
                                          : "Assign"
                                        : "Edit"
                                    }
                                  />
                                  <TableButton
                                    // isTicketClosed={item?.status === "Close"}
                                    onClick={() => {
                                      navigate(URLFollowUp(item?.ticketNo));
                                    }}
                                    icon={
                                      <FaComment
                                        className={styles("text-violetColor")}
                                      />
                                    }
                                    text="Comments"
                                    className=""
                                  />
                                  <TableButton
                                    isTicketClosed={item?.status === "Close"}
                                    onClick={() => handleResolve(item)}
                                    icon={
                                      user?.roleId === 4 ? (
                                        <FaRegCheckCircle
                                          className={styles("text-redColor", {
                                            "text-grayColor":
                                              item?.status === "Close",
                                          })}
                                        />
                                      ) : (
                                        <BiTrash
                                          className={styles("text-redColor", {
                                            "text-grayColor":
                                              item?.status === "Close",
                                          })}
                                        />
                                      )
                                    }
                                    text={
                                      user?.roleId === 4
                                        ? item?.isResolved
                                          ? "Resolved"
                                          : "Resolve"
                                        : "Close"
                                    }
                                  />
                                </div>
                              )}
                            </div>
                          </>
                        ),
                        w: "250px",
                      },
                    ]}
                  />
                );
              })}
            </Table>
          </div>
        </div>

        {addModal?.modalId === createTicketModalTypes?.addCreateTicket && (
          <CreateTicket toggler={closeModal} />
        )}
        {editModal?.modalId === createTicketModalTypes?.editCreateTicket && (
          <EditTicket toggler={closeModal} />
        )}
      </div>
    );
  }
};

export default TicketTable;
