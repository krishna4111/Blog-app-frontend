import { Button, TableCell, TableRow, ToggleSwitch } from "flowbite-react";
import { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import useUsers from "../../../hooks/useUsers";

const UserTableBody = ({ user, handleEditUser, handleDeleteUser }) => {
  const { _id, username, status, role, createdAt } = user;

  const toggleStatus = status === "active" ? true : false;

  const [toggleOn, setToggleOn] = useState(toggleStatus);

  const { changeUserStatus } = useUsers();

  const handleStatusChange = () => {
    const changeStatus = !toggleOn;
    setToggleOn(changeStatus);
    changeUserStatus({
      userId: _id,
      status: changeStatus ? "active" : "inactive",
    });
  };

  const handleDeletingUser = () => {
    handleDeleteUser(user);
  };

  return (
    <TableRow
      className="bg-white dark:border-gray-700 dark:bg-gray-800"
      key={_id.toString()}
    >
      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {username}
      </TableCell>
      <TableCell>{role}</TableCell>
      <TableCell>{createdAt}</TableCell>
      {/* TODO: Needs to add the other action buttons */}
      <TableCell
        className={status === "active" ? "text-green-500" : "text-red-500"}
      >
        <ToggleSwitch
          checked={toggleOn}
          label={status}
          onChange={handleStatusChange}
        />
      </TableCell>
      <TableCell>
        <div className="p-2 flex justify-center items-center gap-2">
          <Button
            className="hover:cursor-pointer"
            onClick={() => {
              handleEditUser(user);
            }}
          >
            <MdModeEditOutline />
          </Button>
          <Button className="hover:cursor-pointer" onClick={handleDeletingUser}>
            <MdDelete />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default UserTableBody;
