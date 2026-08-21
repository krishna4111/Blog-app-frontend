import { useState } from "react";

const useGetUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const getUsers = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);

      const result = await fetch(`http://localhost:4500/api/admin/get-users`, {
        method: "GET",
        credentials: "include",
      });

      if (!result.ok) {
        console.error("Error when fetching user details");
        setErrorMessage("Error when fetching user details");
        setLoading(false);
        return;
      }

      const data = await result.json();

      if (!data.success) {
        throw new Error(data.message || "Error when fetching user details");
      }

      setErrorMessage(null);

      setLoading(false);

      setUsers((prev) => {
        return data.data;
      });
    } catch (error) {
      console.error("Error when get users", error);
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return { users, loading, errorMessage, getUsers };
};

export default useGetUsers;
