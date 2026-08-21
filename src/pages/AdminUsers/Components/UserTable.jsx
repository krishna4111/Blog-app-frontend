import {
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

import UserTableBody from "./UserTableBody";

const UserTable = ({ users }) => {
  return (
    <div className="p-2">
      <Table hoverable>
        <TableHead>
          <TableRow>
            <TableHeadCell>User name</TableHeadCell>
            <TableHeadCell>Role</TableHeadCell>
            <TableHeadCell className="text-center">Joined At</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell className="text-center">Actions</TableHeadCell>
            {/* <TableHeadCell>
              <span className="sr-only">Edit</span>
            </TableHeadCell> */}
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {users.map((user) => {
            return <UserTableBody key={user._id.toString()} user={user} />;
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
