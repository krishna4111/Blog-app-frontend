import { Button } from "flowbite-react";
import { IoIosAdd } from "react-icons/io";

const UserHeader = () => {
  const handleAddUser = async () => {
    console.log("handling add user ");
  };

  return (
    <div className="px-4 flex items-center justify-between m-2 bg-">
      <div className="mr-2">
        <h1 className="font-bold text-3xl ">Users</h1>
        <h3 className="font-semibold text-md ">
          Here you can see the Users Present in our application also you can
          apply filer in here
        </h3>
      </div>
      <div>
        <Button onClick={handleAddUser} className="hover:cursor-pointer ">
          <IoIosAdd size={20} />
          Add User
        </Button>
      </div>
    </div>
  );
};

export default UserHeader;
