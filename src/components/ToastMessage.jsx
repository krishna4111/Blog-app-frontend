import { Toast, ToastToggle } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import { MdCancel } from "react-icons/md";

//TODO: in here type is used for later the success and failure toast messages will be handled in the same component
const ToastMessage = ({
  showToast,
  setShowToast,
  messageContent,
  isSuccess = true,
}) => {
  console.log("Toast rendered", isSuccess);
  return (
    <Toast>
      <div
        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
          isSuccess
            ? "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200"
            : "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"
        }`}
      >
        {isSuccess ? (
          <HiCheck className="h-5 w-5" />
        ) : (
          <MdCancel className="h-5 w-5" />
        )}
      </div>
      <div className="ml-3 text-sm font-normal">{messageContent}</div>
      <ToastToggle
        onClick={() => {
          setShowToast(false);
        }}
      />
    </Toast>
  );
};

export default ToastMessage;
