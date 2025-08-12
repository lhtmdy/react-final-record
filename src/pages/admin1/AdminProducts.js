import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ProductModal from "../../components/ProductModal";
import DeleteModal from "../../components/DeleteModal";
import { Button, Modal } from "bootstrap";
import Pagination from "../../components/Pagination";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [currentItem, setCurrentItem] = useState({});
  const [action, setAction] = useState("");
  const [pagination, setPagination] = useState({});
  const productModal = useRef(null);
  const deleteModal = useRef(null);

  useEffect(() => {
    productModal.current = new Modal("#productModal", {
      backdrop: "static", // 禁止點擊背景關閉
    });
    deleteModal.current = new Modal("#deleteModal", {
      backdrop: "static", // 禁止點擊背景關閉
    });
    getProducts();
  }, []);

  const getProducts = async (page=1) => {
    const productRes = await axios.get(
      `v2/api/${process.env.REACT_APP_API_PATH}/admin/products?page=${page}`,
    );
    console.log(productRes);
    setProducts(productRes.data.products);
    setPagination(productRes.data.pagination);
  };


  const handleOpenDeleteModal = (item) => {
    setCurrentItem(item);
    deleteModal.current.show();
  }

   const deleteProduct = async () => {
    const res = await axios.delete(
      `v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${currentItem.id}`
    );
    if(res.data.success) {
      getProducts();
      deleteModal.current.hide();
    }
  }

  const handleOpenProductModal = () => {
    setAction("create");
    setCurrentItem({});
    productModal.current.show();
  };
  
  const handleCloseProductModal = () => {
    productModal.current.hide();
  };

  const handleCloseDeleteModal = () => {
    deleteModal.current.hide();
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setAction("edit");
    productModal.current.show();
  };

  return (
    <div className="p-3">
      <ProductModal
        handleCloseProductModal={handleCloseProductModal}
        info={currentItem}
        action={action}
        getProducts={getProducts}
      />
      <DeleteModal
        handleCloseDeleteModal={handleCloseDeleteModal}
        handleDelete={deleteProduct}
        name={currentItem.title}
      />
      <h3>產品列表</h3>
      <hr />
      <div className="text-end">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={handleOpenProductModal}
        >
          建立新商品
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">分類</th>
            <th scope="col">名稱</th>
            <th scope="col">售價</th>
            <th scope="col">啟用狀態</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.category}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
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

      <Pagination changePage={getProducts} pagination={pagination}/>
    </div>
  );
}

export default AdminProducts;
