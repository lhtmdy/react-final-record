import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import AppModalBody from "./AppModalBody";
import AppModalFooter from "./AppModalFooter";
import AppModalHeader from "./AppModalHeader";
function AppDeleteModal({ open, name, setOpen, handleDelete }) {
  const handleClose = () => setOpen(false);
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div className="w-[640px] bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto max-h-[90vh]">
          <AppModalHeader className="bg-red-400">
            <h4 className="text-white text-[20px] font-semibold">刪除產品</h4>
            <button className="text-white font-semibold">x</button>
          </AppModalHeader>
          <AppModalBody>
            <p>確定要刪除{name}嗎？</p>
            <p className="text-danger">刪除後將無法恢復！</p>
          </AppModalBody>
          <AppModalFooter>
            <Button variant="outlined" onClick={handleClose}>
              取消
            </Button>
            <Button variant="contained" onClick={handleDelete}>
              儲存
            </Button>
          </AppModalFooter>
        </div>
      </Modal>
    </>
  );
}

export default AppDeleteModal;
