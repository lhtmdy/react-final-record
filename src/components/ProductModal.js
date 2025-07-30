import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MessageContext,handleSuccessMessage,handleErrorMessage } from "../store/message.store";
function ProductModal({ handleCloseProductModal, info, action, getProducts }) {
  const [,dispatch] = useContext(MessageContext);
  const [model, setModel] = useState({
    title: "",
    category: "",
    origin_price: 100,
    price: 300,
    unit: "個",
    description: "",
    content: "",
    is_enabled: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1709884735626-63e92727d8b6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
    imagesUrl: [],
  });
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "number") {
      setModel({ ...model, [name]: Number(value) });
    } else if (name === "is_enabled") {
      // setModel({ ...model, [name]: e.target.checked ? 1 : 0 });
      setModel({ ...model, [name]: +e.target.checked });
    } else {
      setModel({ ...model, [name]: value });
    }
  };

  const handleSave = async () => {
    try {
      if (action === "edit") {
        const res = await axios.put(
          `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${model.id}`,
          { data: model }
        );
        handleSuccessMessage(dispatch, res);
        console.log(res);
        getProducts();
        handleCloseProductModal();
      } else {
        const res = await axios.post(
          `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product`,
          { data: model }
        );
        console.log(res);
          dispatch({
          type: "POST_MESSAGE",
          payload: {
            content: res.data.message || "操作成功",
          },
        });
        handleSuccessMessage(dispatch, res);
        getProducts();
        handleCloseProductModal();
      }
      
    } catch (error) {
      handleErrorMessage(dispatch, error.response);
    }
  };

  useEffect(() => {
    console.log("info", info);
    if (action === "edit" && info) {
      setModel(info);
    } else if (action === "create") {
      setModel({
        title: "",
        category: "",
        origin_price: 100,
        price: 300,
        unit: "個",
        description: "",
        content: "",
        is_enabled: 0,
        imageUrl:
          "https://images.unsplash.com/photo-1709884735626-63e92727d8b6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
        imagesUrl: [],
      });
    }
  }, [action, info]);

  return (
    <>
      <div
        className="modal fade"
        id="productModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {action === "edit" ? "編輯" : "新增"}產品
              </h1>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseProductModal}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-2">
                <label htmlFor="title" className="form-label w-100">
                  名稱
                  <input
                    id="title"
                    className="form-control"
                    name="title"
                    value={model.title}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <label htmlFor="category" className="form-label w-100">
                    分類
                    <input
                      id="category"
                      className="form-control"
                      name="category"
                      value={model.category}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="col-6">
                  <label htmlFor="unit" className="form-label w-100">
                    單位
                    <input
                      id="unit"
                      className="form-control"
                      name="unit"
                      value={model.unit}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <label htmlFor="origin_price" className="form-label w-100">
                    原價
                    <input
                      id="origin_price"
                      className="form-control"
                      name="origin_price"
                      type="number"
                      value={model.origin_price}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="col-6">
                  <label htmlFor="price" className="form-label w-100">
                    售價
                    <input
                      id="price"
                      className="form-control"
                      name="price"
                      type="number"
                      value={model.price}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>
              <div className="">
                <label htmlFor="description" className="form-label w-100">
                  產品描述
                  <textarea
                    id="description"
                    className="form-control"
                    name="description"
                    value={model.description}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="">
                <label htmlFor="content" className="form-label w-100">
                  說明內容
                  <textarea
                    id="content"
                    className="form-control"
                    name="content"
                    value={model.content}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={!!model.is_enabled}
                  id="is_enabled"
                  onChange={handleChange}
                  name="is_enabled"
                />
                <label className="form-check-label" htmlFor="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseProductModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductModal;
