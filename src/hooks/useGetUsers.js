import { useState } from "react";

const useGetUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [pagination, setPagination] = useState({});

  const getUsers = async ({
    page = 1,
    limit = 10,
    search = "",
    role = "",
    status = "",
  }) => {
    try {
      setLoading(true);
      setErrorMessage(null);

      const params = new URLSearchParams({
        page,
        limit,
      });

      if (search) {
        params.append("search", search);
      }
      if (status) {
        params.append("status", status);
      }
      if (role) {
        params.append("role", role);
      }

      const result = await fetch(
        `http://localhost:4500/api/admin/get-users?${params}`,
        {
          method: "GET",
          credentials: "include",
        },
      );

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

      setPagination(() => {
        return data.pagination;
      });
    } catch (error) {
      console.error("Error when get users", error);
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return { users, setUsers, loading, errorMessage, getUsers, pagination };
};

export default useGetUsers;
