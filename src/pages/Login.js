import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppInput from "@/components/AppInput";
import AppButton from "@/components/AppButton";
function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [loginState, setLoginState] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = async () => {
    try {
      const res = await axios.post("/v2/admin/signin", data);
      const { token, expired } = res.data;
      axios.defaults.headers.common["Authorization"] = token;
      document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
      if (res.data.success) {
        navigate("/admin/products");
      }
    } catch (error) {
      console.log(error);
      setLoginState(error.response.data);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-02">
      <div className=" px-4 py-8 h-[400px] w-[300px] bg-white rounded-[20px] shadow flex flex-col justify-between">
        <h2 className="text-h2 text-center text-green-06">Sign In</h2>
        <div>
          <AppInput
            label="Email"
            value={data.username}
            name="username"
            onChange={handleChange}
            className="!mb-3"
          />
          <AppInput
            label="密碼"
            value={data.password}
            name="password"
            onChange={handleChange}
            type="password"
          />
        </div>
        <AppButton className="!w-full" onClick={submit}>
          登入
        </AppButton>
      </div>
    </div>
  );
}

export default Login;
