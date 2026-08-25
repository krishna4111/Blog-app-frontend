import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Select,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

const ModalForm = ({
  isOpen,
  title,
  type,
  closeModal,
  userData,
  handleFormSubmit,
}) => {
  console.log("user data is ==>", userData);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "Test@123",
    role: "",
  });

  useEffect(() => {
    if (type === "edit" && userData) {
      setFormData((prev) => {
        return {
          ...prev,
          username: userData.username,
          email: userData.email,
          role: userData.role,
        };
      });
    } else if (type === "add") {
      setFormData((prev) => {
        return {
          ...prev,
          username: "",
          email: "",
          password: "Test@123",
          role: "",
        };
      });
    }
  }, [type, userData]);

  const handleFormSubmission = (e) => {
    console.log("form submission is triggered");
    e.preventDefault();

    if (type === "add") {
      handleFormSubmit({ userData: formData });
      closeModal();
    } else if (type === "edit") {
      handleFormSubmit({ userId: userData._id, updateUserData: formData });
    }
  };

  return (
    <div>
      <Modal show={isOpen} size="md" onClose={closeModal} dismissible popup>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username">User Name</Label>
              </div>
              <TextInput
                id="username"
                placeholder="ex: John Doe"
                value={formData.username}
                onChange={(event) => {
                  setFormData((prev) => {
                    return {
                      ...prev,
                      username: event.target.value,
                    };
                  });
                }}
                required
              />
            </div>
            {type === "add" && (
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email">Email</Label>
                </div>
                <TextInput
                  id="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(event) => {
                    setFormData((prev) => {
                      return {
                        ...prev,
                        email: event.target.value,
                      };
                    });
                  }}
                  required
                />
              </div>
            )}

            {type === "add" && (
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password">Password</Label>
                </div>

                <div className="relative">
                  <TextInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(event) => {
                      setFormData((prev) => {
                        return {
                          ...prev,
                          password: event.target.value,
                        };
                      });
                    }}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 hover:cursor-pointer"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? <HiEye /> : <HiEyeOff />}
                  </button>
                </div>
              </div>
            )}
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="role">Role</Label>
              </div>
              <Select
                id="role"
                value={formData.role.toLowerCase()}
                onChange={(event) => {
                  setFormData((prev) => {
                    return {
                      ...prev,
                      role: event.target.value,
                    };
                  });
                }}
                required
              >
                <option value="">Select role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Select>
            </div>
            <div className="flex items-center justify-center w-full">
              <Button
                className="hover:cursor-pointer"
                onClick={handleFormSubmission}
              >
                {type === "add" ? "Create user" : "Update User"}
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ModalForm;
