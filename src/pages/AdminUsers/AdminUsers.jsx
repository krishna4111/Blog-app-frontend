import { useEffect } from "react";
import useGetUsers from "../../hooks/useGetUsers";
import UserFilter from "./Components/UserFilter";
import UserHeader from "./Components/UserHeader";
import UserTable from "./Components/UserTable";

const AdminUsers = () => {
  const { getUsers, users, loading, errorMessage } = useGetUsers();

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="w-full flex flex-col gap-6">
      <UserHeader />
      <UserFilter />
      {loading && <p>loading users ...</p>}
      {errorMessage && <p>{errorMessage}</p>}
      {!loading && !errorMessage && <UserTable users={users} />}
    </div>
  );
};

export default AdminUsers;
