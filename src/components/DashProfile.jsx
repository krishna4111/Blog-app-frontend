import { TextInput, Button, Label } from "flowbite-react";
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteAccount, updateUser } from "../redux/user/userSlice";
import { mapUser } from "../dto/user.dto";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "./ChangePasswordModal";
import ToastMessage from "./ToastMessage";
import useSignOut from "../hooks/useSignOut";

export default function DashProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signout = useSignOut();

  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef();
  const [changePassword, setChangePassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

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

  const selfDeleteAccount = async () => {
    try {
      const result = await fetch("http://localhost:4500/api/user/self-delete", {
        method: "PUT",
        credentials: "include",
      });

      const data = await result.json();

      if (!result.ok && !data.success) {
        //does we needs alert in here
        console.error(data.message);
        return;
      }
      //clean redux store
      dispatch(deleteAccount());
      //navigate to new sign up
      navigate("/sign-up");
    } catch (error) {
      console.error("Error when deleting the account", error);
    }
  };

  const handleChangePassword = () => {
    setChangePassword(true);
  };

  console.log("toast state is", showToast);

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      {showToast && (
        <ToastMessage
          setShowToast={setShowToast}
          setShowToast={setShowToast}
          messageContent={"Password Changed Successfully"}
          type={"success"}
        />
      )}
      {changePassword ? (
        <ChangePasswordModal
          isOpen={changePassword}
          setIsOpen={setChangePassword}
          onSuccess={(message) => {
            setToastMessage(message);
            setShowToast(true);
          }}
        />
      ) : null}
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
          type="button"
          className="bg-blue-300 cursor-pointer text-white"
          outline
          onClick={handleChangePassword}
        >
          Change Password
        </Button>
        <Button
          type="submit"
          className="bg-blue-300 cursor-pointer text-white"
          outline
        >
          Update
        </Button>
        <div className="text-red-600 flex justify-between mt-5">
          <span className="cursor-pointer" onClick={selfDeleteAccount}>
            Delete Account
          </span>
          <span className="cursor-pointer" onClick={signout}>
            Sign Out
          </span>
        </div>
      </form>
    </div>
  );
}
