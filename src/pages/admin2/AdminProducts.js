import AppDataTable from "../../components/AppDataTable";
import axios from "axios";
import { useEffect, useState } from "react";
import FormModal from "./components/FormModal";
function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});

  const [open, setOpen] = useState(false);
  const [action, setAction] = useState('');
  const [currentItem, setCurrentItem] = useState({});
  const getProducts = async (page = 1) => {
    const productRes = await axios.get(
      `v2/api/${process.env.REACT_APP_API_PATH}/admin/products?page=${page}`
    );
    console.log(productRes);
    setProducts(productRes.data.products);
    setPagination(productRes.data.pagination);
  };

  useEffect(() => {
    // productModal.current = new Modal("#productModal", {
    //   backdrop: "static", // 禁止點擊背景關閉
    // });
    // deleteModal.current = new Modal("#deleteModal", {
    //   backdrop: "static", // 禁止點擊背景關閉    
    // });
    getProducts(pagination.current_page);
  }, [pagination.current_page]);

  const handleEdit = (item) => {
    console.log("Edit item:", item);
    setCurrentItem(item);
    setAction("edit");
    setOpen(true);
    console.log("Open modal:", open);
  }
  const columns = [
    { field: "category", headerName: "分類", width: 130 },
    { field: "title", headerName: "名稱", width: 130 },
    { field: "price", headerName: "售價", width: 130 },
    { field: "is_enabled", headerName: "啟用狀態", width: 130 },
    {
      field: "actions",
      headerName: "編輯",
      width: 130,
      renderCell: (rowData) => {
        return (
          <div>
            <button
              type="button"
              className="btn btn-primary btn-sm"
                onClick={() => handleEdit(rowData.row)}
            >
              編輯
            </button>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm ms-2"
              //   onClick={() => handleOpenDeleteModal(item)}
            >
              刪除
            </button>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">產品管理</h1>
      {pagination.current_page }
      <AppDataTable
        columns={columns}
        rows={products}
        paginationModel={pagination}
        setPagination={setPagination}
      />
      <FormModal open={open} setOpen={setOpen} info={currentItem} action={action} getProducts={getProducts}/>
    </div>
  );
}

export default AdminProducts;
