import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";

const ChangePasswordModal = ({ isOpen, setIsOpen, onSuccess }) => {
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
                <Label htmlFor="old-password">Your Old password</Label>
              </div>
              <TextInput
                id="old-password"
                type="password"
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
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="new-password">Your New Password</Label>
              </div>
              <TextInput
                id="new-password"
                type="password"
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
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="re-password">Re-enter Your New Password</Label>
              </div>
              <TextInput
                id="re-password"
                type="password"
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
