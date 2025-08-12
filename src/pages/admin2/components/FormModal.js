import { useEffect, useState,useContext } from "react";
import Modal from "@mui/material/Modal";
import AppInput from "../../../components/AppInput";
import AppInputNumber from "../../../components/AppInputNumber";
import AppCheckbox from "../../../components/AppCheckbox";
import Button from "@mui/material/Button";
import axios from "axios";
import { MessageContext,handleSuccessMessage,handleErrorMessage } from "../../../store/message.store";

export default function FormModal({ open, setOpen, info, action,getProducts }) {

  const handleClose = () => setOpen(false);
  console.log("Modal info:", info);
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
    imageUrl: "",
    imagesUrl: [],
  });

  const handleChange = (e) => {
    console.log("Input changed:", e);
    const { name, value } = e.target;
    if (['origin_price','price'].includes(name)) {
      setModel({ ...model, [name]: Number(value) });
    } else if (name === "is_enabled") {
      // setModel({ ...model, [name]: e.target.checked ? 1 : 0 });
      setModel({ ...model, [name]: +e.target.checked });
    } else {
      setModel({ ...model, [name]: value });
    }
    console.log("Input changed:", e.target.value);
    // Handle input changes here, e.g., update state or form data
  };

 const handleSave = async () => {
    try {
      if (action === "edit") {
        const res = await axios.put(
          `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${model.id}`,
          { data: model }
        );
        handleClose();
        handleSuccessMessage(dispatch, res);
        console.log(res);
        getProducts();
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
        handleClose();
        handleSuccessMessage(dispatch, res);
        getProducts();
      }
      
    } catch (error) {
      console.log('error,', error);
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
    <div>
      <Modal open={open} onClose={handleClose}>
        <div className="bg-white absolute top-1/2 left-1/2 w-[640px] transform -translate-x-1/2 -translate-y-1/2 p-4 rounded shadow-lg overflow-y-scroll max-h-[90vh]">
          <div className="flex items-center flex-col gap-y-4 !w-full ">
            <AppInput
              id="outlined-basic"
              label="名稱"
              variant="outlined"
              value={model.title}
              name="title"
              onChange={handleChange}
              className="w-full"
            />
            <AppInput
              id="outlined-basic"
              label="圖片網址"
              variant="outlined"
              value={model.imageUrl}
              name="imageUrl"
              onChange={handleChange}
              className="w-full"
            />
            <AppInput
              id="outlined-basic"
              label="分類"
              variant="outlined"
              value={model.category}
              name="category"
              onChange={handleChange}
            />
            <AppInput
              id="outlined-basic"
              label="單位"
              variant="outlined"
              value={model.unit}
              name="unit"
              onChange={handleChange}
            />
            <AppInputNumber
              id="outlined-basic"
              label="原價"
              variant="outlined"
              value={model.origin_price}
              name="origin_price"
              onChange={handleChange}
            />
            <AppInputNumber
              id="outlined-basic"
              label="售價"
              variant="outlined"
              value={model.price}
              name="price"
              onChange={handleChange}
            />
            <AppInput
              id="outlined-basic"
              label="產品描述"
              variant="outlined"
              value={model.description}
              name="description"
              onChange={handleChange}
              className="w-full"
              multiline={true}
              maxRows={4}
            />
            <AppInput
              id="outlined-basic"
              label="說明內容"
              variant="outlined"
              value={model.content}
              name="content"
              onChange={handleChange}
              className="w-full"
              multiline={true}
              maxRows={4}
            />
            <AppCheckbox
              id="outlined-basic"
              label="是否啟用"
              variant="outlined"
              value={model.is_enabled}
              name="is_enabled"
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div className="ml-auto mt-5 w-fit flex gap-x-2">
            <Button variant="outlined" onClick={handleClose}>
              取消
            </Button>
            <Button variant="contained" onClick={handleSave}>儲存</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
