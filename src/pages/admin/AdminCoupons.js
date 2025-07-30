import { useEffect, useState, useRef,useContext } from "react";
import axios from "axios";
import CouponModal from "../../components/CouponModal";
import DeleteModal from "../../components/DeleteModal";
import { Modal } from "bootstrap";
import Pagination from "../../components/Pagination";
import { MessageContext,handleSuccessMessage,handleErrorMessage } from "../../store/message.store";

function AdminCoupon() {
  const [,dispatch] = useContext(MessageContext);
  const [coupons, setCoupons] = useState([]);
  const [currentItem, setCurrentItem] = useState({});
  const [action, setAction] = useState("");
  const [pagination, setPagination] = useState({});

  const couponModal = useRef(null);
  const deleteModal = useRef(null);

  useEffect(() => {
    couponModal.current = new Modal("#couponModal", {
      backdrop: "static", // 禁止點擊背景關閉
    });
    deleteModal.current = new Modal("#deleteModal", {
      backdrop: "static", // 禁止點擊背景關閉
    });
    getCoupon();
  }, []);

  const getCoupon = async (page = 1) => {
    const res = await axios.get(
      `v2/api/${process.env.REACT_APP_API_PATH}/admin/coupons?page=${page}`
    );
    console.log(res);
    setCoupons(res.data.coupons);
    setPagination(res.data.pagination);
  };

  const handleOpenDeleteModal = (item) => {
    setCurrentItem(item);
    deleteModal.current.show();
  };

  const deleteItem = async () => {
    try {
      const res = await axios.delete(
        `v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${currentItem.id}`
      );
      if (res.data.success) {
        getCoupon();
        deleteModal.current.hide();
      }
      handleSuccessMessage(dispatch, res);
      
    } catch (error) {
      handleErrorMessage(dispatch, error.response);
    } 
  };

  const handleOpenCouponModal = () => {
    setAction("create");
    setCurrentItem({});
    couponModal.current.show();
  };
  const handleCloseCouponModal = () => {
    couponModal.current.hide();
  };

  const handleCloseDeleteModal = () => {
    deleteModal.current.hide();
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setAction("edit");
    couponModal.current.show();
  };

  return (
    <div className="p-3">
      <CouponModal
        handleCloseCouponModal={handleCloseCouponModal}
        info={currentItem}
        action={action}
        getCoupon={getCoupon}
      />
      <DeleteModal
        handleCloseDeleteModal={handleCloseDeleteModal}
        name={currentItem.title}
        handleDelete={deleteItem}
      />
      <h3>優惠券列表</h3>
      <hr />
      <div className="text-end">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={handleOpenCouponModal}
        >
          建立新優惠券
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">標題</th>
            <th scope="col">回饋%</th>
            <th scope="col">到期日</th>
            <th scope="col">優惠碼</th>
            <th scope="col">啟用狀態</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.percent}</td>
                <td>{new Date(item.due_date * 1000).toLocaleDateString()}</td>
                <td>{item.code}</td>
                <td>{item.is_enabled ? "啟用" : "停用"}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => handleEdit(item)}
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm ms-2"
                    onClick={() => handleOpenDeleteModal(item)}
                  >
                    刪除
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Pagination changePage={getCoupon} pagination={pagination} />
    </div>
  );
}

export default AdminCoupon;
