import AppDataTable from "../../components/AppDataTable";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import FormModal from "./components/FormModal";
import AppDeleteModal from "../../components/AppDeleteModal";
import AppButtonGroup from "../../components/AppButtonGroup";
import {
  MessageContext,
  handleSuccessMessage,
  handleErrorMessage,
} from "../../store/message.store";
import Button from "@mui/material/Button";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [action, setAction] = useState("");
  const [currentItem, setCurrentItem] = useState({});
  const [, dispatch] = useContext(MessageContext);
  const getProducts = async (page = 1) => {
    const productRes = await axios.get(
      `v2/api/${process.env.REACT_APP_API_PATH}/admin/products?page=${page}`
    );
    console.log(productRes);
    setProducts(productRes.data.products);
    setPagination(productRes.data.pagination);
  };

  const handleOpenDeleteModal = (item) => {
    setCurrentItem(item);
    setOpenDeleteModal(true);
  };

  const deleteProduct = async () => {
    try {
      const res = await axios.delete(
        `v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${currentItem.id}`
      );
      if (res.data.success) {
        getProducts();
        setOpenDeleteModal(false);
        handleSuccessMessage(dispatch, res);
      }
    } catch (error) {
      handleErrorMessage(dispatch, error.response);
    }
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
  };
  const columns = [
    { field: "category", headerName: "分類", },
    { field: "title", headerName: "名稱", },
    { field: "price", headerName: "售價", },
    { field: "is_enabled", headerName: "啟用狀態",  },
    {
      field: "actions",
      headerName: "編輯",
      flex: 1 ,
      renderCell: (rowData) => {
        return (
          <AppButtonGroup>
            <Button
            variant="contained" color="success"
              onClick={() => handleEdit(rowData.row)}
            >
              編輯
            </Button>
            <Button variant="outlined" color="error"   onClick={() => handleOpenDeleteModal(rowData.row)}>
              刪除
            </Button>
          </AppButtonGroup>
        );
      },
    },
  ];

  const handleOpenProductModal = () => {
    setAction("create");
    setCurrentItem({});
    setOpen(true);
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className=" relative pl-[12px] text-2xl font-bold before:content-[''] before:bg-green-400 before:inline-block before:w-1 before:h-[18px] before:translate-y-[-50%] before:top-[50%] before:absolute before:left-0">
          產品管理
        </h1>
        <Button variant="contained" onClick={handleOpenProductModal}>
          新增
        </Button>
      </div>
      <AppDataTable
        columns={columns}
        rows={products}
        paginationModel={pagination}
        setPagination={setPagination}
      />
      <FormModal
        open={open}
        setOpen={setOpen}
        info={currentItem}
        action={action}
        getProducts={getProducts}
      />
      <AppDeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        name={currentItem.title}
        handleDelete={() => {
          deleteProduct();
        }}
      />
    </div>
  );
}

export default AdminProducts;
