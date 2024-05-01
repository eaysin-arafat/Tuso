/*
 * Created by: Andrew
 * Date created: 10.11.2023
 * Modified by: Andrew
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import Table from "@/components/core/table/Table";
import TableBody from "@/components/core/table/TableBody";
import TableHeader from "@/components/core/table/TableHeader";
import TableButton from "@/components/shared/table-button/TableButton";
import { User } from "@/constants/api-interface";
import { UserRole } from "@/constants/enum/Role";
import { userModalTypes } from "@/constants/modal-types/modal-types";
import { setCountries } from "@/features/client-form/client-form-slice";
import { useReadCountriesQuery } from "@/features/country/country-api";
import { openEditModal } from "@/features/modal/modal-slice";
import { useDeleteUserAccountMutation } from "@/features/user-accounts/user-accounts-api";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import EditUser from "@/pages/user/edit/EditUser";
import { URLSystemPermission } from "@/routers/routes-link";
import { deleteAlert } from "@/utilities/sweet-alert";
import { BiEdit, BiTrash } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserTable = ({ userData }: { userData: User[] }) => {
  const { editModal } = useSelector((state: RootState) => state.modal);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: countries } = useReadCountriesQuery();
  dispatch(setCountries(countries));

  const [
    deleteUserAccount,
    { data: userRes, error, isError, isSuccess, status },
  ] = useDeleteUserAccountMutation();

  const handleEditUserModal = (user: User) => {
    dispatch(
      openEditModal({
        modalId: userModalTypes?.userEditModalTypes,
        data: user,
      })
    );
  };

  useCreateSideEffects({
    error,
    isError,
    isSuccess,
    status,
    message: "user",
    messageType: "delete",
    response: userRes,
    initialState: false,
  });

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
          <Table className="min-w-[850px]">
            <TableHeader
              data={[
                {
                  title: "Fullname",
                  w: "250px",
                },
                {
                  title: "Username",
                  w: "250px",
                },
                {
                  title: "Role",
                  w: "250px",
                },
                {
                  title: "Cellphone",
                  w: "250px",
                },
                {
                  title: "",
                  w: "350px",
                },
              ]}
            />
            {userData?.map((user: User, index: number) => (
              <TableBody
                key={index}
                index={index}
                length={userData?.length}
                data={[
                  {
                    title: `${user?.name} ${user?.surname}`,
                    w: "250px",
                  },
                  {
                    title: user?.username,
                    w: "250px",
                  },
                  {
                    title: UserRole[user?.roleId as keyof typeof UserRole],
                    w: "250px",
                  },
                  {
                    title: user?.countryCode + " " + user?.cellphone,
                    w: "250px",
                  },
                  {
                    title: (
                      <div className="flex">
                        <TableButton
                          onClick={() => handleEditUserModal(user)}
                          icon={<BiEdit className="text-violetColor" />}
                          text="Edit"
                          className="border-r border-borderColor pe-3 me-3"
                        />
                        <TableButton
                          onClick={() =>
                            navigate(URLSystemPermission(String(user?.oid)))
                          }
                          icon={
                            <IoSettingsOutline className="text-violetColor" />
                          }
                          text="System"
                          className="border-r border-borderColor pe-3 me-3"
                        />

                        <TableButton
                          onClick={() =>
                            deleteAlert(() =>
                              deleteUserAccount(Number(user?.oid))
                            )
                          }
                          icon={<BiTrash className="text-redColor" />}
                          text="Delete"
                        />
                      </div>
                    ),
                    w: "350px",
                  },
                ]}
              />
            ))}
          </Table>
        </div>
      </div>

      {editModal?.modalId === userModalTypes?.userEditModalTypes && (
        <EditUser />
      )}
    </div>
  );
};

export default UserTable;
