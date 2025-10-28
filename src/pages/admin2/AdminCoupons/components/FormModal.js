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
import AppDatePicker from "@/components/AppDatePicker";
import dayjs from "dayjs";
import { useForm, Controller } from "react-hook-form";
import FormInputText from "@/components/FormInputText";
export default function FormModal({ open, setOpen, info, action, getCoupon }) {
  const handleClose = () => setOpen(false);
  console.log("Modal info:", info);
  const [, dispatch] = useContext(MessageContext);
  const [model, setModel] = useState({
    title: "超級特惠價格2",
    is_enabled: 1,
    percent: 70,
    due_date: 1555459200,
    code: "testCode",
  });

  const handleChange = (e) => {
    try {
      const { name, value } = e.target;
      console.log("handleChange event:", name, value);
      if (name === "percent") {
        setModel({ ...model, [name]: Number(value) });
      } else if (name === "is_enabled") {
        setModel({ ...model, [name]: +e.target.checked });
      } else if (name === "due_date") {
        // Convert date string to Unix timestamp
        // dayjs(value).unix()
        // const timestamp = value
        //   ? Math.floor(new Date(value).getTime() / 1000)
        //   : 0;
        console.log("due_date value:", value);
        setModel({ ...model, [name]: dayjs(value).unix() });
      } else {
        setModel({ ...model, [name]: value });
      }
    } catch (err) {}
  };

  // const handleSave = async (data) => {
  //   // console.log("handleSave isValid:", isValid);
  //   // if (!model.title) {
  //   // if(isValid){

  //   try {
  //     if (action === "edit") {
  //       const res = await axios.put(
  //         `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${model.id}`,
  //         { data: model }
  //       );
  //       console.log(res);
  //       handleSuccessMessage(dispatch, res);
  //       getCoupon();
  //       handleClose();
  //     } else {
  //       const res = await axios.post(
  //         `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon`,
  //         { data: model }
  //       );
  //       console.log(res);
  //       handleSuccessMessage(dispatch, res);
  //       getCoupon();
  //       handleClose();
  //     }
  //   } catch (error) {
  //     console.log(errors);
  //     handleErrorMessage(dispatch, error.response);
  //   }
  //   // }
  // };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const handleSave = handleSubmit (
    (data) => {
      console.log(data);
       if (action === "edit") {
        const res =  axios.put(
          `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${model.id}`,
          { data: model }
        );
        console.log(res);
        handleSuccessMessage(dispatch, res);
        getCoupon();
        handleClose();
      } else {
        const res =  axios.post(
          `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon`,
          { data: model }
        );
        console.log(res);
        handleSuccessMessage(dispatch, res);
        getCoupon();
        handleClose();
      }
    },
    (error) => {
      console.log(error);
    }
  );

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
    <div>
      <Modal open={open} onClose={handleClose}>
        <div className="w-[640px] bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded max-h-[90vh]">
          {/* <form onSubmit={handleSubmit(handleSave)}> */}
          <form>
            <AppModalHeader
              className="bg-green-06"
              title={action === "edit" ? "編輯優惠券" : "新增優惠券"}
              onClose={handleClose}
            ></AppModalHeader>
            <AppModalBody>
              <div className="flex items-center flex-col gap-y-4 !w-full ">
                <FormInputText
                  name="title"
                  control={control}
                  label="名稱"
                  onChange={handleChange}
                  rules={{ required: "title 為必填" }}
                  defaultValue={model.title}
                  value={model.title}
                />
                {/* <Controller
                  name="title"
                  control={control}
                  className="w-full"
                  value={model.title}
                  rules={{ required: "title 為必填" }}
                  render={({ field }) => (
                    <>
                      <AppInput
                        {...field}
                        label="名稱"
                        id="title"
                        value={model.title}
                        errors={errors}
                        onChange={handleChange}
                      />
                    </>
                  )}
                /> */}
                {/* <AppInputNumber
                  label="折扣(%)"
                  value={model.percent}
                  name="percent"
                  onChange={handleChange}
                  className="w-full"
                /> */}
                <AppInput
                  label="折扣(%)"
                  type="number"
                  value={model.percent}
                  name="percent"
                  onChange={handleChange}
                  className="w-full"
                />
                <AppInput
                  label="優惠碼"
                  value={model.code}
                  name="code"
                  onChange={handleChange}
                />
                {/* <AppDatePicker
                  label="到期日"
                  value={model.due_date}
                  name="due_date"
                  onChange={handleChange}
                /> */}
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
              <AppButton type="submit" onClick={handleSave}>
                儲存
              </AppButton>
              {/* <AppButton onClick={handleSave}>儲存</AppButton> */}
            </AppModalFooter>
          </form>
        </div>
      </Modal>
    </div>
  );
}
