import { useOutletContext } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";
import DeleteModal from "../../components/DeleteModal";
import { Modal } from "bootstrap";
import axios from "axios";
import {
  MessageContext,
  handleSuccessMessage,
  handleErrorMessage,
} from "../../store/message.store";
function Cart() {
  const [, dispatch] = useContext(MessageContext);
  const { cartData, getCartData } = useOutletContext();
  const [currentItem, setCurrentItem] = useState({});
  const deleteModal = useRef(null);

  useEffect(() => {
    deleteModal.current = new Modal("#deleteModal", {
      backdrop: "static", // 禁止點擊背景關閉
    });
  }, []);
  const handleOpenDeleteModal = (item) => {
    setCurrentItem(item);
    deleteModal.current.show();
  };

  const deleteItem = async () => {
    try {
      const res = await axios.delete(
        `v2/api/${process.env.REACT_APP_API_PATH}/cart/${currentItem.id}`
      );
      if (res.data.success) {
        getCartData();
        deleteModal.current.hide();
      }
      handleSuccessMessage(dispatch, res);
    } catch (error) {
      handleErrorMessage(dispatch, error.response);
    }
  };
  const handleCloseDeleteModal = () => {
    deleteModal.current.hide();
  };

  const updateCartData = async (item,qty) => {
    try {
        const res = await axios.put(
          `v2/api/${process.env.REACT_APP_API_PATH}/cart/${item.id}`,
            {
                data: {
                product_id: item.product.id,
                qty: Number(qty),
                },
            }
        );
        getCartData();
        handleSuccessMessage(dispatch, res);
        
    } catch (error) {
        handleErrorMessage(dispatch, error.response);
        
    }}
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div
            className="col-md-6 bg-white py-5"
            style={{ minHeight: "calc(100vh - 56px - 76px)" }}
          >
            <div className="d-flex justify-content-between">
              <h2 className="mt-2">你的購物車</h2>
            </div>
            {cartData.carts &&
              cartData.carts.map((item) => {
                return (
                  <>
                    <div className="d-flex mt-4 bg-light" key={item.id}>
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.title}
                        className="object-cover"
                        style={{
                          width: "120px",
                        }}
                      />
                      <div className="w-100 p-3 position-relative">
                        <button
                          type="button"
                          onClick={() => handleOpenDeleteModal(item)}
                          className="position-absolute btn btn-light btn-sm"
                          style={{ top: "16px", right: "16px" }}
                        >
                          <i className="bi bi-x-lg"></i>
                        </button>
                        <p className="mb-0 fw-bold">{item.product.title}</p>
                        <p
                          className="mb-1 text-muted"
                          style={{ fontSize: "14px" }}
                        >
                          {item.product.content}
                        </p>
                        <select
                          name=""
                          className="form-select"
                          value={item.qty}
                          onChange={(e) => {updateCartData(item, e.target.value)}}
                        >
                          {[...new Array(20)].map((_, index) => {
                            return (
                              <option key={index} value={index + 1}>
                                {index + 1}
                              </option>
                            );
                          })}
                        </select>
                        {/* <div className="d-flex justify-content-between align-items-center w-100">
                          <div className="input-group w-50 align-items-center">
                            <div className="input-group-prepend pe-1">
                              <a href="#">
                                <i className="bi bi-dash"></i>
                              </a>
                            </div>
                            <input
                              type="text"
                              className="form-control border-0 text-center my-auto shadow-none bg-light px-0"
                              placeholder=""
                              aria-label="Example text with button addon"
                              aria-describedby="button-addon1"
                              value={item.qty}
                            />
                            <div className="input-group-append ps-1">
                              <a href="#">
                                <i className="bi bi-plus"></i>
                              </a>
                            </div>
                          </div>
                          <p className="mb-0 ms-auto">
                            NT${item.product.price}
                          </p>
                        </div> */}
                      </div>
                    </div>
                  </>
                );
              })}

            <div className="d-flex justify-content-between mt-4">
              <p className="mb-0 h4 fw-bold">總金額</p>
              <p className="mb-0 h4 fw-bold">NT${cartData.final_total}</p>
            </div>
            <a
              href="./checkout.html"
              className="btn btn-dark btn-block mt-4 rounded-0 py-3 w-100"
            >
              確認結帳
            </a>
          </div>
        </div>
      </div>
      <DeleteModal
        handleCloseDeleteModal={handleCloseDeleteModal}
        name={currentItem.title}
        handleDelete={deleteItem}
      />
    </>
  );
}

export default Cart;
