import Modal from "@mui/material/Modal";
// import Button from "@mui/material/Button";
import AppButton from "./AppButton";
import AppModalBody from "./AppModalBody";
import AppModalFooter from "./AppModalFooter";
import AppModalHeader from "./AppModalHeader";


function AppDeleteModal({ open, name, setOpen, handleDelete }) {
  const handleClose = () => setOpen(false);
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div className="w-[640px] bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded max-h-[90vh]">
          <AppModalHeader className="bg-pink-06" title="刪除產品" onClose={handleClose}>
          </AppModalHeader>
          <AppModalBody>
            <p>確定要刪除{name}嗎？</p>
            <p className="text-danger">刪除後將無法恢復！</p>
          </AppModalBody>
          <AppModalFooter>
            <AppButton secondary onClick={handleClose}>
              取消
            </AppButton>
            <AppButton danger onClick={handleDelete}>
              確認
            </AppButton>
          </AppModalFooter>
        </div>
      </Modal>
    </>
  );
}

export default AppDeleteModal;
