import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

const ChangePasswordModal = ({ isOpen, setIsOpen, onSuccess }) => {
  const [showPassword, setShowPassword] = useState({
    viewOld: false,
    viewNew: false,
    viewRe: false,
  });

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    rePassword: "",
  });

  const [errorMessage, setErrorMessage] = useState();

  const handlePasswordChange = async () => {
    console.log("handle password change triggered");
    try {
      setErrorMessage("");
      const { oldPassword, newPassword, rePassword } = formData;

      if (!oldPassword || !newPassword || !rePassword) {
        setErrorMessage(
          "new password , old password and rePassword all are required",
        );
        console.error(
          "new password  , old password and rePassword are required",
        );
        return;
      }

      if (oldPassword === newPassword) {
        setErrorMessage("old and new password should be different");
        return;
      }

      if (newPassword !== rePassword) {
        setErrorMessage("new password and the re-password should be same");
        console.error("new password and the re-password should be same");
        return;
      }

      const body = {
        oldPassword,
        newPassword,
      };

      const result = await fetch(
        "http://localhost:4500/api/user/change-password",

        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(body),
        },
      );

      if (!result.ok) {
        setErrorMessage("Failed to change password");
        return;
      }

      const data = await result.json();

      if (!data.success) {
        console.error("error when change password");
      }

      setErrorMessage("");

      //show a toast message too in here

      onSuccess("password changes successfully");

      setIsOpen(false);
    } catch (error) {
      console.error("Error when changing the password", error);
      setErrorMessage("Something went wrong please try again");
    }
  };

  return (
    <div>
      <Modal
        show={isOpen}
        size="md"
        popup
        dismissible
        onClose={() => setIsOpen(false)}
        className="dark:bg-gray-900"
      >
        <ModalHeader className="[&_h3]:text-center">
          Change Password
        </ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <div>
              <div
                className={
                  errorMessage
                    ? "border p-2 m-2 rounded-xl border-red-700 bg-red-100"
                    : "hidden"
                }
              >
                {errorMessage ? (
                  <p className="text-red-700 font-semibold">{errorMessage}</p>
                ) : null}
              </div>
              <div className="mb-2 block">
                <Label htmlFor="old_password">Your Old password</Label>
              </div>
              <div className="relative">
                <TextInput
                  id="old_password"
                  type={showPassword.viewOld ? "text" : "password"}
                  required
                  value={formData.oldPassword}
                  onChange={(e) => {
                    setFormData((prev) => {
                      return {
                        ...prev,
                        oldPassword: e.target.value,
                      };
                    });
                  }}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 hover:cursor-pointer"
                  onClick={() => {
                    setShowPassword((prev) => {
                      return {
                        ...prev,
                        viewOld: !showPassword.viewOld,
                      };
                    });
                  }}
                >
                  {showPassword.viewOld ? <HiEye /> : <HiEyeOff />}
                </button>
              </div>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="new_password">Your New Password</Label>
              </div>
              <div className="relative">
                <TextInput
                  id="new_password"
                  type={showPassword.viewNew ? "text" : "password"}
                  required
                  value={formData.newPassword}
                  onChange={(e) => {
                    setFormData((prev) => {
                      return {
                        ...prev,
                        newPassword: e.target.value,
                      };
                    });
                  }}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 hover:cursor-pointer"
                  onClick={() => {
                    setShowPassword((prev) => {
                      return {
                        ...prev,
                        viewNew: !showPassword.viewNew,
                      };
                    });
                  }}
                >
                  {showPassword.viewNew ? <HiEye /> : <HiEyeOff />}
                </button>
              </div>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="re_password">Re-enter Your New Password</Label>
              </div>
              <div className="relative">
                <TextInput
                  id="re_password"
                  type={showPassword.viewRe ? "text" : "password"}
                  required
                  value={formData.rePassword}
                  onChange={(e) => {
                    setFormData((prev) => {
                      return {
                        ...prev,
                        rePassword: e.target.value,
                      };
                    });
                  }}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 hover:cursor-pointer"
                  onClick={() => {
                    setShowPassword((prev) => {
                      return {
                        ...prev,
                        viewRe: !showPassword.viewRe,
                      };
                    });
                  }}
                >
                  {showPassword.viewRe ? <HiEye /> : <HiEyeOff />}
                </button>
              </div>
            </div>
            <div className="w-full flex justify-center ">
              <Button
                onClick={handlePasswordChange}
                className="hover:cursor-pointer"
              >
                Change Password
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ChangePasswordModal;
