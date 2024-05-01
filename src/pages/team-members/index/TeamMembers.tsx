/*
 * Created by: Andrew
 * Date created: 10.02.2024
 * Modified by: Andrew
 * Last modified: 03.03.2024
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import BackIcon from "@/assets/icons/Back";
import PlusIcon from "@/assets/icons/PlusIcon";
import CustomPagination from "@/components/core/custom-pagination/CustomPagination";
import usePagination from "@/components/core/custom-pagination/usePagination";
import TableSkeleton from "@/components/core/loader/TableSkeleton";
import Table from "@/components/core/table/Table";
import TableBody from "@/components/core/table/TableBody";
import TableHeader from "@/components/core/table/TableHeader";
import TitleRow from "@/components/core/table/TitleRow";
import ErrorPage from "@/components/error-page/ErrorPage";
import NotFound from "@/components/not-found/NotFound";
import TableButton from "@/components/shared/table-button/TableButton";
import { teamMemberModalTypes } from "@/constants/modal-types/modal-types";
import {
  useReadMemberByTeamPageQuery,
  useUpdateIdDeleteMemberMutation,
} from "@/features/member/member-api";
import {
  closeAddModal,
  closeEditModal,
  openAddModal,
  openEditModal,
} from "@/features/modal/modal-slice";
import useBaseDataEdit from "@/hooks/shared/useBaseDataEdit";
import useDataHandling from "@/hooks/shared/useDataHandle";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { URLTeam } from "@/routers/routes-link";
import { swalWarning } from "@/utilities/swal-fire";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import CreateTeamMember from "../create/CreateTeamMember";
import EditTeamMember from "../edit/EditTeamMember";

/**
 * @description Team Members component
 */
const TeamMembers = () => {
  // get modal data form the redux store
  const { addModal, editModal } = useSelector(
    (state: RootState) => state.modal
  );

  // edit base data for update
  const [editBase] = useBaseDataEdit();

  // navigator
  const navigate = useNavigate();

  // per page items count
  const paginationDefaultShowValue = [10, 20, 30, 50];

  // pagination hooks
  const { setStart, start, setTake, take, activePage, setActivePage } =
    usePagination({ paginationDefaultShowValue });

  // get team id from url
  const { teamId } = useParams<{ teamId: string }>();

  // read member by team page query
  const {
    data: teamMemberData,
    isError,
    isLoading,
    isSuccess,
  } = useReadMemberByTeamPageQuery(
    {
      key: teamId,
      start,
      take,
    },
    {
      skip: !teamId,
    }
  );

  // delete member mutation
  const [
    deleteMember,
    {
      data: memberDataRes,
      error: deleteError,
      isError: isDeleteError,
      isSuccess: isDeleteSuccess,
      status: deleteStatus,
    },
  ] = useUpdateIdDeleteMemberMutation();

  // action dispatcher
  const dispatch = useDispatch();

  // add team member handler
  const handleAddTeamMember = () => {
    dispatch(
      openAddModal({
        modalId: teamMemberModalTypes?.addMember,
        data: null,
      })
    );
  };

  // edit team member handler
  const handleEditTeamMember = (data) => {
    dispatch(
      openEditModal({
        modalId: teamMemberModalTypes?.editMember,
        data: data,
      })
    );
  };

  //  close modal handler
  const closeModal = () => {
    dispatch(closeAddModal());
    dispatch(closeEditModal());
  };

  // delete handler
  const handleDelete = (member) => {
    Swal.fire(swalWarning({})).then((result) => {
      if (result.isConfirmed) {
        const updateData = {
          ...editBase,
          ...member,
          isDeleted: true,
        };
        deleteMember({ key: member?.oid, body: updateData });
      }
    });
  };

  // data handling hook
  const { dataNotFound, isDataError, isDataLoading, isDataSuccess } =
    useDataHandling({
      isError,
      isLoading,
      isSuccess,
      length: teamMemberData?.data?.members?.length,
    });

  // handle side effects on create team member
  useCreateSideEffects({
    error: deleteError,
    isError: isDeleteError,
    isSuccess: isDeleteSuccess,
    status: deleteStatus,
    message: "member",
    messageType: "delete",
    response: memberDataRes,
  });

  return (
    <div className="">
      <div className="flex justify-between mb-3">
        {/* BACK BUTTON */}
        <button
          onClick={() => {
            navigate(URLTeam());
          }}
          className="back_btn"
          title="back to Team"
        >
          <BackIcon /> Back
        </button>

        {/* ADD BUTTON */}
        <button onClick={handleAddTeamMember} className="main_btn">
          <PlusIcon /> Add Member
        </button>
      </div>
      <div className="bg-whiteColor rounded-lg pb-4">
        {/* LOADING SKELETON */}
        {isDataLoading && <TableSkeleton />}

        {/* ERROR */}
        {isDataError && <ErrorPage />}

        {/* NOT FOUND */}
        {dataNotFound && <NotFound />}

        {/* TABLE */}
        {isDataSuccess && (
          <Table className="min-w-[550px]">
            {/* TABLE TITLE */}
            <TitleRow
              data={teamMemberData?.data?.members[0]?.teamName}
              title="Team"
              className="mt-5 px-8"
            />

            {/* TABLE HEADER */}
            <TableHeader
              data={[
                {
                  title: "Member Name",
                  w: "30%",
                },
                {
                  title: "",
                  w: "30%",
                },
                {
                  title: "",
                  w: "140px",
                },
              ]}
            />

            {/* TABLE BODY */}
            {teamMemberData?.data?.members?.map((member, index) => (
              <TableBody
                key={index}
                index={index}
                length={teamMemberData?.data?.members?.length}
                data={[
                  {
                    title: `${
                      member?.userAccountName ? member?.userAccountName : ""
                    } ${member?.surName ? member?.surName : ""}`,
                    w: "30%",
                  },
                  {
                    title: member?.isTeamLead ? "Leader" : "Member",
                    w: "30%",
                  },
                  {
                    title: (
                      <div className="flex ">
                        <TableButton
                          title={
                            member?.isTeamLead && "Team Lead cannot be edit"
                          }
                          className="border-r border-borderColor pe-3 me-3 "
                          onClick={() => handleEditTeamMember(member)}
                          icon={<BiEdit className="text-violetColor" />}
                          text="Edit"
                          disabled={member?.isTeamLead}
                        />
                        <TableButton
                          className=""
                          title={
                            member?.isTeamLead && "Team Lead cannot be deleted"
                          }
                          onClick={() => handleDelete(member)}
                          icon={<BiTrash className="text-redColor" />}
                          text="Delete"
                          disabled={member?.isTeamLead}
                        />
                      </div>
                    ),
                    w: "140px",
                  },
                ]}
              />
            ))}
          </Table>
        )}

        {/* PAGINATION */}
        <div className="flex justify-end mx-5">
          <CustomPagination
            take={take}
            setTake={setTake}
            start={start}
            setStart={setStart}
            totalItemsCount={teamMemberData?.data?.totalRows}
            showInPage={paginationDefaultShowValue}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </div>
      </div>

      {/* CREATE MEMBER MODAL */}
      {addModal?.modalId === teamMemberModalTypes?.addMember && (
        <CreateTeamMember toggler={closeModal} />
      )}

      {/* EDIT TEAM MEMBER MODAL */}
      {editModal?.modalId === teamMemberModalTypes?.editMember && (
        <EditTeamMember toggler={closeModal} />
      )}
    </div>
  );
};

export default TeamMembers;
