import { Button, TableCell, TableRow, ToggleSwitch } from "flowbite-react";
import { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const UserTableBody = ({ user }) => {
  const { _id, username, status, role, createdAt } = user;

  const toggleStatus = status === "active" ? true : false;

  const [toggleOn, setToggleOn] = useState(toggleStatus);

  const handleStatusChange = () => {
    console.log("toggle user status");
    setToggleOn(!toggleOn);
  };

  const handleEditUser = () => {
    console.log("handle edit");
  };
  const handleDeleteUser = () => {
    console.log("handle delete");
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
        <div className="flex justify-between p-2">
          <Button className="hover:cursor-pointer" onClick={handleEditUser}>
            <MdModeEditOutline />
          </Button>
          <Button className="hover:cursor-pointer" onClick={handleDeleteUser}>
            <MdDelete />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default UserTableBody;
