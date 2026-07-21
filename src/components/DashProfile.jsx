import { TextInput, Button } from "flowbite-react";
import { useSelector } from "react-redux";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 font-semibold text-3xl text-center">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full border-8 object-cover border-[lightgray]"
          ></img>
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        ></TextInput>
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        ></TextInput>
        <TextInput
          type="password"
          id="password"
          placeholder="password"
        ></TextInput>
        <Button
          type="submit"
          className="bg-blue-300 cursor-pointer text-white"
          outline
        >
          Update
        </Button>
        <div className="text-red-600 flex justify-between mt-5">
          <span className="cursor-pointer">Delete Account</span>
          <span className="cursor-pointer">Delete Account</span>
        </div>
      </form>
    </div>
  );
}
