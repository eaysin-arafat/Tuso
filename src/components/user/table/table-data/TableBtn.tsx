/*
 * Created by: Andrew
 * Date created: 10.11.2023
 * Modified by: Andrew
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import TableButton from "@/components/shared/table-button/TableButton";
import { User } from "@/constants/api-interface";
import { BiEdit, BiTrash } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";

const TableBtn = ({
  handleEditUserModal,
  handleDeleteUser,
  data,
}: {
  handleEditUserModal: (data: User) => void;
  handleDeleteUser: (oid: number) => void;
  data: User;
}) => {
  return (
    <div className="flex">
      <TableButton
        onClick={() => handleEditUserModal(data)}
        icon={<BiEdit className="text-violetColor" />}
        text="Edit"
        className="border-r border-borderColor pe-3 me-3"
      />
      <TableButton
        onClick={() => {}}
        icon={<IoSettingsOutline className="text-violetColor" />}
        text="Setting"
        className="border-r border-borderColor pe-3 me-3"
      />

      <TableButton
        onClick={() => handleDeleteUser(Number(data?.oid))}
        icon={<BiTrash className="text-redColor" />}
        text="Delete"
      />
    </div>
  );
};

export default TableBtn;
