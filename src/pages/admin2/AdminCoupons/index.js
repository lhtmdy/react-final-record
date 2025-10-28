import AppDataTable from "@/components/AppDataTable";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import FormModal from "./components/FormModal";
import AppDeleteModal from "@/components/AppDeleteModal";
import AppButtonGroup from "@/components/AppButtonGroup";
import AppButton from "@/components/AppButton";
import {
  MessageContext,
  handleSuccessMessage,
  handleErrorMessage,
} from "@/store/message.store";

function AdminProducts() {
  const [coupons, setCoupons] = useState([]);
  const [pagination, setPagination] = useState({});
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [action, setAction] = useState("");
  const [currentItem, setCurrentItem] = useState({});
  const [, dispatch] = useContext(MessageContext);
  const getCoupon = async (page = 1) => {
    const productRes = await axios.get(
      `v2/api/${process.env.REACT_APP_API_PATH}/admin/coupons?page=${page}`
    );
    console.log(productRes);
    setCoupons(productRes.data.coupons);
    setPagination(productRes.data.pagination);
  };

  const handleOpenDeleteModal = (item) => {
    setCurrentItem(item);
    setOpenDeleteModal(true);
  };

  const deleteItem = async () => {
    try {
      const res = await axios.delete(
        `v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${currentItem.id}`
      );
      if (res.data.success) {
        getCoupon();
        setOpenDeleteModal(false);
        handleSuccessMessage(dispatch, res);
      }
    } catch (error) {
      handleErrorMessage(dispatch, error.response);
    }
  };

  useEffect(() => {
    getCoupon(pagination.current_page);
  }, [pagination.current_page]);

  const handleEdit = (item) => {
    console.log("Edit item:", item);
    setCurrentItem(item);
    setAction("edit");
    setOpen(true);
    console.log("Open modal:", open);
  };
  const columns = [
    {
      field: "",
      headerName: "序號",
      renderCell: (params) => {
        const index = coupons.findIndex(
          (product) => product.id === params.row.id
        );
        return index + 1;
      },
    },

    { field: "title", headerName: "標題" },
    { field: "percent", headerName: "回饋%" },
    {
      field: "due_date",
      headerName: "到期日",
      renderCell: (params) => {
        return new Date(params.row.due_date * 1000).toLocaleDateString();
      },
    },
    { field: "code", headerName: "優惠碼" },
    {
      field: "is_enabled",
      headerName: "啟用狀態",
      renderCell: (params) => {
        return params.row.is_enabled ? "啟用" : "未啟用";
      },
    },
    {
      field: "actions",
      headerName: "編輯",
      flex: 1,
      renderCell: (rowData) => {
        return (
          <AppButtonGroup>
            <AppButton onClick={() => handleEdit(rowData.row)}>編輯</AppButton>
            <AppButton
              danger
              onClick={() => handleOpenDeleteModal(rowData.row)}
            >
              刪除
            </AppButton>
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
        <h1 className=" text-h3 relative pl-[12px]  font-bold before:content-[''] before:bg-green-04 before:inline-block before:w-1 before:h-[18px] before:translate-y-[-50%] before:top-[50%] before:absolute before:left-0">
          優惠券管理
        </h1>
        <AppButton onClick={handleOpenProductModal}>+ 新增</AppButton>
      </div>
      <AppDataTable
        columns={columns}
        rows={coupons}
        paginationModel={pagination}
        setPagination={setPagination}
      />
      <FormModal
        open={open}
        setOpen={setOpen}
        info={currentItem}
        action={action}
        getCoupon={getCoupon}
      />
      <AppDeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        name={currentItem.title}
        handleDelete={() => {
          deleteItem();
        }}
      />
    </div>
  );
}

export default AdminProducts;
