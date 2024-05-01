/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import TableButton from "@/components/shared/table-button/TableButton";
import { URLFollowUp } from "@/routers/routes-link";
import { BiEdit, BiTrash } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type TableBodyProps = {
  index: number;
  actionOpen: boolean[];
  toggleAction: (index: number) => void;
  handleOpenUserModal: () => void;
};

const ActionBtn = ({
  index,
  actionOpen,
  toggleAction,
  handleOpenUserModal,
}: TableBodyProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative  ms-[10px] 2xl:ms-[13px]">
      <BsThreeDotsVertical
        className="cursor-pointer "
        onClick={() => toggleAction(index)}
      />

      {actionOpen[index] && (
        <div className="absolute text-xl right-[77px] lg:right-[75px] 2xl:right-[90px] top-[-3px] flex flex-col items-start gap-1 bg-whiteColor px-4 py-2 rounded-md font-medium border border-borderColor shadow-lg">
          <TableButton
            onClick={() => {
              handleOpenUserModal();
              toggleAction(index);
            }}
            icon={<BiEdit className="text-violetColor" />}
            text="Edit"
          />
          <TableButton
            onClick={() => {
              navigate(URLFollowUp());
            }}
            icon={<FaComment className="text-violetColor" />}
            text="Comments"
            className=""
          />

          <TableButton
            onClick={() => {}}
            icon={<BiTrash className="text-redColor" />}
            text="Delete"
          />
        </div>
      )}
    </div>
  );
};

export default ActionBtn;
