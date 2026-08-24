import { useEffect, useState } from "react";
import useGetUsers from "../../hooks/useGetUsers";
import UserFilter from "./Components/UserFilter";
import UserHeader from "./Components/UserHeader";
import UserTable from "./Components/UserTable";
import ConfirmModal from "../../components/ConfirmModal";
import useUsers from "../../hooks/useUsers";
import ModalForm from "./Components/ModalForm";
import ToastMessage from "../../components/ToastMessage";
import PaginationButton from "../../components/PaginationButton";

//TODO:Don't pass the setstate down to the child pass the cb instead
const AdminUsers = () => {
  const { getUsers, users, loading, errorMessage, pagination } = useGetUsers();
  const { deleteUser, updateUser, addUser } = useUsers();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isFailureToast, setIsFailureToast] = useState(false);

  const [selectedUser, setSelectedUser] = useState();
  const [modalType, setModalType] = useState();

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    status: "",
    role: "",
    search: "",
  });

  //NOTE: used to close the normal modal box , handling from  the parent
  const closeModal = () => {
    setSelectedUser(null);
    setModalType(null);
  };

  //NOTE: used to close the form Modal , from the parent
  const closeFormModal = () => {
    setSelectedUser(null);
    setModalType(null);
    setIsOpenModal(null);
  };

  //NOTE: from modal this function will be triggered
  const deleteUserAd = () => {
    deleteUser(selectedUser._id);
  };

  //NOTE: used to open the modal
  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setModalType("delete");
  };

  //NOTE: The following functions are used to open the form modal
  const handleEditUser = (user) => {
    setModalType("edit");
    setSelectedUser(user);
    setIsOpenModal(true);
  };

  const handleAddUser = () => {
    setModalType("add");
    setIsOpenModal(true);
  };

  //NOTE: The following two functions are called from the form modal
  const handleUpdateUser = async ({ userId, updateUserData }) => {
    try {
      await updateUser({
        userId,
        updateBodyData: updateUserData,
      });
      setShowToast(true);
      setToastMessage("User Updated Successfully!!!");
    } catch (error) {
      console.error("error when update user", error);
      setShowToast(true);
      setToastMessage("User Update Failed");
      setIsFailureToast(true);
    }
  };

  const createUser = async ({ userData }) => {
    try {
      console.log("it is triggered");
      await addUser({ userData });
      setShowToast(true);
      setToastMessage("user added successfully!!!");
    } catch (error) {
      setShowToast(true);
      setToastMessage("user creation failed");
      setIsFailureToast(true);
      console.error("Error when create User ", error);
    }
  };

  const handleFilterChange = (newFilters) => {
    setPage(1);
    setFilters((prev) => {
      return {
        ...prev,
        ...newFilters,
      };
    });
  };

  useEffect(() => {
    getUsers({
      page,
      limit: 10,
      ...filters,
    });
  }, [page, filters]);

  return (
    <div className="w-full flex flex-col gap-6">
      {showToast && (
        <ToastMessage
          showToast={showToast}
          setShowToast={setShowToast}
          messageContent={toastMessage}
          isSuccess={!isFailureToast}
        />
      )}
      <UserHeader handleAddUser={handleAddUser} />
      <UserFilter filters={filters} onFilterChange={handleFilterChange} />
      {loading && <p>loading users ...</p>}
      {errorMessage && <p>{errorMessage}</p>}
      {!loading && !errorMessage && (
        <>
          <UserTable
            users={users}
            setModalType={setModalType}
            setSelectedUser={setSelectedUser}
            handleEditUser={handleEditUser}
            handleDeleteUser={handleDeleteUser}
          />
          <PaginationButton
            paginationData={pagination}
            onPageChange={setPage}
          />
        </>
      )}
      {modalType === "delete" && (
        <ConfirmModal
          isOpenModal={true}
          title={"Delete User"}
          message={"This action will delete user"}
          buttonMessage={"Delete User"}
          isDelete={true}
          onClose={closeModal}
          onSuccess={deleteUserAd}
        />
      )}
      {modalType === "add" && (
        <ModalForm
          isOpen={isOpenModal}
          title={"Add User"}
          type={modalType}
          closeModal={closeFormModal}
          handleFormSubmit={createUser}
        />
      )}
      {modalType === "edit" && (
        <ModalForm
          isOpen={isOpenModal}
          title={"Update User"}
          type={modalType}
          closeModal={closeFormModal}
          userData={selectedUser}
          handleFormSubmit={handleUpdateUser}
        />
      )}
    </div>
  );
};

export default AdminUsers;
