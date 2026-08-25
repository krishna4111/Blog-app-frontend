const useUsers = () => {
  const addUser = async ({ userData }) => {
    try {
      const result = await fetch("http://localhost:4500/api/admin/add-user", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!result.ok) {
        console.error("Error when add user as admin");
        return;
      }

      const data = await result.json();

      if (!data.success) {
        console.error(data.message);
        return;
      }

      return data.data;
    } catch (error) {
      console.error("Error when add a new user", error);
    }
  };

  const updateUser = async ({ userId, updateBodyData }) => {
    try {
      const result = await fetch(
        `http://localhost:4500/api/admin/update-user/${userId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateBodyData),
        },
      );

      if (!result.ok) {
        console.error("Error when updating user data");
        return;
      }

      const data = await result.json();

      if (!data.success) {
        console.error("Error when update user", data.message);
        return;
      }
      return data.data;
    } catch (error) {
      console.error("Error when update user", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const result = await fetch(
        `http://localhost:4500/api/admin/delete-user/${userId}`,
        {
          method: "PUT",
          credentials: "include",
        },
      );

      if (!result.ok) {
        console.error("Error when delete user");
        return;
      }

      const data = await result.json();

      if (!data.success) {
        console.error("Error when delete the users", data.message);
        return;
      }
    } catch (error) {
      console.error("Error when delete user", error);
    }
  };

  const changeUserStatus = async ({ userId, status }) => {
    try {
      const result = await fetch(
        `http://localhost:4500/api/admin/change-user-status/${userId}`,
        {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify({ status }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!result.ok) {
        console.error("Error when change user status");
        return;
      }

      const data = await result.json();

      if (!data.success) {
        console.error("Error when change user status", data.message);
        return;
      }

      return data.data;
    } catch (error) {
      console.error("Error when change user status", error);
    }
  };

  return { updateUser, deleteUser, changeUserStatus, addUser };
};

export default useUsers;
