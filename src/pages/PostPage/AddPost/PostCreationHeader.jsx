import { Button } from "flowbite-react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaSave } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";

const PostCreationHeader = () => {
  return (
    <div className="flex justify-between m-4 p-4 rounded-2xl bg-gray-700">
      <div className="flex items-center gap-4 ">
        <button className="m-2 hover:cursor-pointer hover:scale-115 w-5 h-5">
          <IoMdArrowRoundBack />
        </button>
        <h1 className="text-3xl font-bold">Create New Post</h1>
      </div>
      <div className="flex gap-4">
        <Button className="hover:cursor-pointer">
          <FaSave className="mr-2" />
          Save Draft
        </Button>
        <Button className="hover:cursor-pointer">
          <BsFillSendFill className="mr-2" />
          Publish
        </Button>
      </div>
    </div>
  );
};

export default PostCreationHeader;
