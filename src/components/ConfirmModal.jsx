import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useState } from "react";

const ConfirmModal = ({
  isOpenModal,
  title,
  message,
  buttonMessage,
  isDelete = false,
  onClose,
  onSuccess,
}) => {
  const [openModal, setOpenModal] = useState(isOpenModal);

  return (
    <div>
      <Modal
        show={openModal}
        size="md"
        onClose={() => {
          setOpenModal(false);
          onClose();
        }}
        popup
      >
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {message}
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color={isDelete ? "red" : "green"}
                onClick={() => {
                  setOpenModal(false);
                  onClose();
                  onSuccess();
                }}
              >
                {`Yes , ${buttonMessage}`}
              </Button>
              <Button
                color="alternative"
                onClick={() => {
                  setOpenModal(false);
                  onClose();
                }}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ConfirmModal;
