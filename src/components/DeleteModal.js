
function DeleteModal({ handleCloseDeleteModal,name,handleDelete }) {
  return (
    <>
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-danger text-white">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                刪除產品
              </h1>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseDeleteModal}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>確定要刪除{name}嗎？</p>
              <p className="text-danger">刪除後將無法恢復！</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseDeleteModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleDelete}
              >
                確定刪除
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteModal;
