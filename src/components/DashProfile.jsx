import { TextInput, Button, Label } from "flowbite-react";
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signOutSuccess, updateUser } from "../redux/user/userSlice";
import { mapUser } from "../dto/user.dto";
import { useNavigate } from "react-router-dom";

export default function DashProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef();

  const [formData, setFormData] = useState({
    username: currentUser.name ?? "",
    email: currentUser.email ?? "",
    password: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
      setFormData((prev) => {
        return {
          ...prev,
          isImageChange: true,
        };
      });
    }
  };

  const updateUserProfile = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();

      data.append("name", formData.username);
      data.append("email", formData.email);
      data.append("password", formData.password);

      if (imageFile) {
        data.append("image", imageFile);
      }

      //TODO: verify the url is correct?
      const result = await fetch(
        `http://localhost:4500/api/user/update-profile/me`,
        {
          method: "PUT",
          credentials: "include", //we are telling the browser to send the cookies to the backend
          body: data,
        },
      );

      const finalData = await result.json();

      if (!finalData.success) {
        console.error(finalData.data.message);
      }

      const user = mapUser(finalData.data);

      dispatch(updateUser(user));
    } catch (error) {
      console.error("Error when update user Profile", error);
    }
  };

  const signOutUser = async () => {
    console.log("signout triggered");
    try {
      const result = await fetch("http://localhost:4500/api/user/signout", {
        method: "Post",
        credentials: "include",
      });

      const data = await result.json();

      if (!data.success) {
        console.error("Error when sing out user", data.message);
      }
      dispatch(signOutSuccess());
    } catch (error) {
      console.error("Error when signout user", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 font-semibold text-3xl text-center">Profile</h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={(event) => {
          return updateUserProfile(event);
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        ></input>
        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => {
            return filePickerRef.current.click();
          }}
        >
          <img
            src={imageFileUrl || currentUser.profileUrl}
            alt="user"
            className="rounded-full w-full h-full border-8 object-cover border-[lightgray]"
          ></img>
        </div>
        <Label>User Name</Label>
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.name}
          onChange={(e) => {
            return setFormData((prev) => {
              return {
                ...prev,
                username: e.target.value,
              };
            });
          }}
        ></TextInput>
        <Label>Email</Label>
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={(e) => {
            setFormData((prev) => {
              return {
                ...prev,
                email: e.target.value,
              };
            });
          }}
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
          <span className="cursor-pointer" onClick={signOutUser}>
            Sign Out
          </span>
        </div>
      </form>
    </div>
  );
}
