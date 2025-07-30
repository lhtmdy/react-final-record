import { useState, useEffect,useContext } from "react";
import axios from "axios";
import { MessageContext,handleSuccessMessage,handleErrorMessage } from "../store/message.store";

function CouponModal({ handleCloseCouponModal, info, action, getCoupon }) {
   const [,dispatch] = useContext(MessageContext);
  const [model, setModel] = useState({
    title: "超級特惠價格2",
    is_enabled: 1,
    percent: 70,
    due_date: 1555459200,
    code: "testCode",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "percent") {
      setModel({ ...model, [name]: Number(value) });
    } else if (name === "is_enabled") {
      setModel({ ...model, [name]: +e.target.checked });
    } else if (name === "due_date") {
      // Convert date string to Unix timestamp
      const timestamp = value
        ? Math.floor(new Date(value).getTime() / 1000)
        : 0;
      setModel({ ...model, [name]: timestamp });
    } else {
      setModel({ ...model, [name]: value });
    }
  };

  const handleSave = async () => {
    try {
      if (action === "edit") {
        const res = await axios.put(
          `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${model.id}`,
          { data: model }
        );
        console.log(res);
        handleSuccessMessage(dispatch, res);
        getCoupon();
        handleCloseCouponModal();
      } else {
        const res = await axios.post(
          `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon`,
          { data: model }
        );
        console.log(res);
        handleSuccessMessage(dispatch, res);
        getCoupon();
        handleCloseCouponModal();
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
        is_enabled: 1,
        percent: 0,
        due_date: null,
        code: "",
      });
    }
  }, [action, info]);

  return (
    <>
      <div
        className="modal fade"
        id="couponModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {action === "edit" ? "編輯" : "新增"}優惠券
              </h1>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseCouponModal}
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
              <div className="mb-2">
                <label htmlFor="title" className="form-label w-100">
                  折扣(%)
                  <input
                    id="percent"
                    className="form-control"
                    name="percent"
                    type="number"
                    value={model.percent}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="">
                <label htmlFor="code" className="form-label w-100">
                  優惠碼
                  <input
                    id="code"
                    className="form-control"
                    name="code"
                    value={model.code}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="">
                {/* TODO 7/14繼續 */}
                <label htmlFor="content" className="form-label w-100">
                  到期日
                  <input
                    id="due_date"
                    className="form-control"
                    name="due_date"
                    type="date"
                    value={
                      model.due_date
                        ? new Date(model.due_date * 1000)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
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
                onClick={handleCloseCouponModal}
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

export default CouponModal;
