/*
 * Created by: Andrew
 * Date created: 10.02.2024
 * Modified by: Andrew
 * Last modified: 03.03.2024
 * Reviewed by:
 * Date Reviewed:
 */
import { RootState } from "@/app/store";
import PlusIcon from "@/assets/icons/PlusIcon";
import CustomPagination from "@/components/core/custom-pagination/CustomPagination";
import usePagination from "@/components/core/custom-pagination/usePagination";
import TableSkeleton from "@/components/core/loader/TableSkeleton";
import Table from "@/components/core/table/Table";
import TableBody from "@/components/core/table/TableBody";
import TableHeader from "@/components/core/table/TableHeader";
import ErrorPage from "@/components/error-page/ErrorPage";
import NotFound from "@/components/not-found/NotFound";
import TableButton from "@/components/shared/table-button/TableButton";
import { Team } from "@/constants/api-interface";
import { teamMemberModalTypes } from "@/constants/modal-types/modal-types";
import {
  closeAddModal,
  closeEditModal,
  openAddModal,
  openEditModal,
} from "@/features/modal/modal-slice";
import {
  useDeleteTeamMutation,
  useReadTeamsByPageQuery,
} from "@/features/team/team-api";
import useDataHandling from "@/hooks/shared/useDataHandle";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import useWindowWidth from "@/hooks/shared/useWindowWidth";
import { URLTeamMembers } from "@/routers/routes-link";
import TextShowHide from "@/utilities/show-hide-text";
import { swalWarning } from "@/utilities/swal-fire";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CreateTeam from "../create/CreateTeam";
import EditTeam from "../edit/EditTeam";

/**
 * @description Team Index component
 */
const TeamIndex = () => {
  // get modal data form the redux store
  const { addModal, editModal } = useSelector(
    (state: RootState) => state.modal
  );

  // window width for responsive design
  const w1380 = useWindowWidth(1380);

  // action dispatcher
  const dispatch = useDispatch();

  // navigator
  const navigate = useNavigate();

  // per page items count
  const paginationDefaultShowValue = [10, 20, 30, 50];

  // pagination hooks
  const { setStart, start, setTake, take, activePage, setActivePage } =
    usePagination({
      paginationDefaultShowValue,
    });

  // read team query
  const {
    data: teamData,
    isError,
    isLoading,
    isSuccess,
  } = useReadTeamsByPageQuery({
    start,
    take,
  });

  // delete team mutation
  const [
    deleteTeam,
    {
      data: teamDeleteRes,
      status: deleteStatus,
      isError: isDeleteError,
      error: deleteError,
      isSuccess: isDeleteSuccess,
    },
  ] = useDeleteTeamMutation();

  //  add member handler
  const handleAddMember = () => {
    dispatch(
      openAddModal({
        modalId: teamMemberModalTypes?.addMember,
        data: null,
      })
    );
  };

  // edit member handler
  const handleEditMember = (data: Team) => {
    dispatch(
      openEditModal({
        modalId: teamMemberModalTypes?.editMember,
        data: data,
      })
    );
  };

  // close modal handler
  const closeModal = () => {
    dispatch(closeAddModal());
    dispatch(closeEditModal());
  };

  // delete team handler
  const handleDelete = (id: number) => {
    Swal.fire(swalWarning({})).then((result) => {
      if (result.isConfirmed) {
        deleteTeam(id);
      }
    });
  };

  // data handling
  const { dataNotFound, isDataError, isDataLoading, isDataSuccess } =
    useDataHandling({
      isError,
      isLoading,
      isSuccess,
      length: teamData?.data?.team?.length,
    });

  // delete side effect
  useCreateSideEffects({
    error: deleteError,
    isError: isDeleteError,
    isSuccess: isDeleteSuccess,
    status: deleteStatus,
    message: "team",
    messageType: "delete",
    response: teamDeleteRes,
  });
  

  return (
    <div className="">
      <div className="flex justify-end mb-3">
        {/* ADD BUTTON */}
        <button onClick={handleAddMember} className="main_btn">
          <PlusIcon /> Add Team
        </button>
      </div>
      <div className="bg-whiteColor rounded-lg pb-4">
        {/* LOADING SKELETON */}
        {isDataLoading && <TableSkeleton />}

        {/* ERROR */}
        {isDataError && <ErrorPage />}

        {/* NOT FOUND */}
        {dataNotFound && <NotFound />}

        {/* TABLE  */}
        {isDataSuccess && (
          <Table className="min-w-[550px]">
            {/* TABLE HEADER */}
            <TableHeader
              data={[
                {
                  title: "Team Name",
                  w: "60%",
                },
                {
                  title: "",
                  w: w1380 ? "210px" : "250px",
                },
              ]}
            />

            {/* TABLE BODY */}
            {teamData?.data?.team?.map((team, index) => (
              <TableBody
                key={index}
                index={index}
                length={teamData?.data?.team?.length}
                data={[
                  {
                    title: <div className="font-bold">{team?.title ?? ""}</div>,
                    subTitle: (
                      <TextShowHide
                        content={team?.description ?? ""}
                        length={60}
                      />
                    ),

                    w: "60%",
                  },
                  {
                    title: (
                      <div className="flex ">
                        <TableButton
                          className="border-r border-borderColor pe-3 me-3 "
                          onClick={() => handleEditMember(team)}
                          icon={<BiEdit className="text-violetColor" />}
                          text="Edit"
                        />
                        <TableButton
                          className="border-r border-borderColor pe-3 me-3"
                          onClick={() => handleDelete(team?.oid)}
                          icon={<BiTrash className="text-redColor" />}
                          text="Delete"
                        />
                        <TableButton
                          className="text-violetColor border border-violetColor px-2 py-0.5 rounded-md hover:bg-violetTransparentColor"
                          onClick={() => {
                            navigate(URLTeamMembers(String(team?.oid)));
                          }}
                          text="Members"
                        />
                      </div>
                    ),
                    w: w1380 ? "210px" : "250px",
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
            totalItemsCount={teamData?.data?.totalRows?.result}
            showInPage={paginationDefaultShowValue}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </div>
      </div>

      {/* CREATE TEAM MODAL */}
      {addModal?.modalId === teamMemberModalTypes?.addMember && (
        <CreateTeam toggler={closeModal} />
      )}

      {/* EDIT TEAM MODAL */}
      {editModal?.modalId === teamMemberModalTypes?.editMember && (
        <EditTeam toggler={closeModal} />
      )}
    </div>
  );
};

export default TeamIndex;
