import { useEffect, useState, useContext } from "react";
import Modal from "@mui/material/Modal";
import AppInput from "@/components/AppInput";
import AppInputNumber from "@/components/AppInputNumber";
import AppCheckbox from "@/components/AppCheckbox";
import axios from "axios";
import {
  MessageContext,
  handleSuccessMessage,
  handleErrorMessage,
} from "@/store/message.store";
import AppButton from "@/components/AppButton";
import AppModalBody from "@/components/AppModalBody";
import AppModalHeader from "@/components/AppModalHeader";
import AppModalFooter from "@/components/AppModalFooter";

export default function FormModal({
  open,
  setOpen,
  info,
  action,
  getProducts,
}) {
  const handleClose = () => setOpen(false);
  console.log("Modal info:", info);
  const [, dispatch] = useContext(MessageContext);
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
    if (["origin_price", "price"].includes(name)) {
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
      console.log("error,", error);
      handleErrorMessage(dispatch, error.response);
    }
  };

  useEffect(() => {
    console.log("info", info);
    if (action === "edit" && info) {
      setModel(info);
    } else  {
      setModel({
        title: "",
        category: "",
        origin_price: 0,
        price: 0,
        unit: "",
        description: "",
        content: "",
        is_enabled: 0,
        imageUrl:
          "",
        imagesUrl: [],
      });
    }
  }, [action, info]);

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <div className="w-[640px] bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded max-h-[90vh]">
          <AppModalHeader
            className="bg-green-06"
            title={action === "edit" ? "編輯產品" : "新增產品"}
            onClose={handleClose}
          ></AppModalHeader>
           <AppModalBody>

          <div className="flex items-center flex-col gap-y-4 !w-full ">
            <AppInput
              label="名稱"
              value={model.title}
              name="title"
              onChange={handleChange}
              className="w-full"
            />
            <AppInput
              label="圖片網址"
             
              value={model.imageUrl}
              name="imageUrl"
              onChange={handleChange}
              className="w-full"
            />
            <AppInput
              label="分類"
             
              value={model.category}
              name="category"
              onChange={handleChange}
            />
            <AppInput
              label="單位"
             
              value={model.unit}
              name="unit"
              onChange={handleChange}
            />
            <AppInputNumber
              label="原價"
             
              value={model.origin_price}
              name="origin_price"
              onChange={handleChange}
            />
            <AppInputNumber
              label="售價"
             
              value={model.price}
              name="price"
              onChange={handleChange}
            />
            <AppInput
              label="產品描述"
             
              value={model.description}
              name="description"
              onChange={handleChange}
              className="w-full"
              multiline={true}
              maxRows={4}
            />
            <AppInput
              label="說明內容"
             
              value={model.content}
              name="content"
              onChange={handleChange}
              className="w-full"
              multiline={true}
              maxRows={4}
            />
            <AppCheckbox
              label="是否啟用"
             
              value={model.is_enabled}
              name="is_enabled"
              onChange={handleChange}
              className="w-full"
            />
          </div>
           </AppModalBody>
            <AppModalFooter>
            <AppButton secondary onClick={handleClose}>
              取消
            </AppButton>
            <AppButton  onClick={handleSave}>
              儲存
            </AppButton>
          </AppModalFooter>
          {/* <div className="ml-auto mt-5 w-fit flex gap-x-2">
            <Button onClick={handleClose}>
              取消
            </Button>
            <Button variant="contained" onClick={handleSave}>
              儲存
            </Button>
          </div> */}
        </div>
      </Modal>
    </div>
  );
}
