import { useForm } from "react-hook-form";
import { Input } from "../../components/FormElement";
import axios from "axios";
import { useContext } from "react";
import {
  MessageContext,
  handleSuccessMessage,
  handleErrorMessage,
} from "../../store/message.store";
import { useNavigate } from "react-router-dom";
function Checkout() {
      const navigate = useNavigate();
  const [, dispatch] = useContext(MessageContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    try {
      const { email, name, tel, address } = data;
      const model = {
        data: {
          user: {
            name,
            email,
            tel,
            address,
          },
          message: "",
        },
      };

      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/order`,
        model
      );
      handleSuccessMessage(dispatch, res);
       navigate("/success/" + res.data.orderId);
      console.log(data);
    } catch (error) {
      console.log(errors);
      handleErrorMessage(dispatch, error.response);
    }
  };

  return (
    <>
      <div className="bg-light pt-5 pb-7">
        <div className="container">
          <div className="row justify-content-center flex-md-row flex-column-reverse">
            <div className="col-md-6">
              <div className="bg-white p-4">
                <h4 className="fw-bold">1. Contact Form</h4>
                <p className="mt-4">Contact information</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    id="email"
                    labelText="Email"
                    type="email"
                    errors={errors}
                    register={register}
                    rules={{
                      required: "Email 為必填",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Email 格式不正確",
                      },
                    }}
                  ></Input>
                  <Input
                    id="name"
                    type="text"
                    errors={errors}
                    labelText="使用者名稱"
                    register={register}
                    rules={{
                      required: "使用者名稱為必填",
                      maxLength: {
                        value: 10,
                        message: "使用者名稱長度不超過 10",
                      },
                    }}
                  ></Input>
                  <Input
                    id="tel"
                    labelText="電話"
                    type="tel"
                    errors={errors}
                    register={register}
                    rules={{
                      required: "電話為必填",
                      minLength: {
                        value: 6,
                        message: "電話不少於 6 碼",
                      },
                      maxLength: {
                        value: 12,
                        message: "電話不超過 12 碼",
                      },
                    }}
                  ></Input>
                  <Input
                    id="address"
                    labelText="地址"
                    type="address"
                    errors={errors}
                    register={register}
                    rules={{
                      required: "地址為必填",
                    }}
                  ></Input>
                  <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end ">
                    <a href="./product.html" className="text-dark mt-md-0 mt-3">
                      <i className="fas fa-chevron-left me-2"></i> 返回購物車
                    </a>
                    <button
                      type="submit"
                      className="btn btn-dark py-3 px-7 rounded-0"
                    >
                      送出
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-4">
              <div className="border p-4 mb-4">
                <h4 className="mb-4">Order Detail</h4>
                <div className="d-flex">
                  <img
                    src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80"
                    alt=""
                    className="me-2"
                    style={{
                      width: "48px",
                      height: "48px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="w-100">
                    <div className="d-flex justify-content-between fw-bold">
                      <p className="mb-0">Lorem ipsum</p>
                      <p className="mb-0">x10</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="text-muted mb-0">
                        <small>NT$12,000</small>
                      </p>
                      <p className="mb-0">NT$12,000</p>
                    </div>
                  </div>
                </div>
                <div className="d-flex mt-2">
                  <img
                    src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80"
                    alt=""
                    className="me-2"
                    style={{
                      width: "48px",
                      height: "48px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="w-100">
                    <div className="d-flex justify-content-between fw-bold">
                      <p className="mb-0">Lorem ipsum</p>
                      <p className="mb-0">x10</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="text-muted mb-0">
                        <small>NT$12,000</small>
                      </p>
                      <p className="mb-0">NT$12,000</p>
                    </div>
                  </div>
                </div>
                <table className="table mt-4 border-top border-bottom text-muted">
                  <tbody>
                    <tr>
                      <th
                        scope="row"
                        className="border-0 px-0 pt-4 font-weight-normal"
                      >
                        Subtotal
                      </th>
                      <td className="text-end border-0 px-0 pt-4">NT$24,000</td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        className="border-0 px-0 pt-0 pb-4 font-weight-normal"
                      >
                        Payment
                      </th>
                      <td className="text-end border-0 px-0 pt-0 pb-4">
                        ApplePay
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="d-flex justify-content-between mt-4">
                  <p className="mb-0 h4 fw-bold">Total</p>
                  <p className="mb-0 h4 fw-bold">NT$24,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
