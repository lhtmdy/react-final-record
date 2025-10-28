import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
// import Dashboard from "./pages/admin1/DashBoard";
import FunctionLayout from "./pages/admin2/FunctionLayout1";
import AdminProducts from "./pages/admin2/AdminProducts";
import AdminCoupons from "./pages/admin2/AdminCoupons/index";
import FrontLayout from "./pages/front/FrontLayout";
import Home from "./pages/front/Home";
import Demo from "./pages/front/Demo";
import Demo1 from "./pages/front/Demo1";
import Products from "./pages/front/Products";
import ProductDetail from "./pages/front/ProductDetail";
import Cart from "./pages/front/Cart";
import Checkout from "./pages/front/Checkout";
import Success from "./pages/front/Success";
function App() {
  const columns = [
    {
      title: "序號",
      key: "$$RowNumber",
      className: "!text-center",
    },
    {
      title: "類別",
      key: "referenceType",
    },
    {
      title: "填報年度",
      key: "fillYear",
    },
    {
      title: "機關名稱",
      key: "agencyName",
    },
    {
      title: "填報起訖",
      key: "filldateStart",
      className: "!text-center text-nowrap",
    },
    {
      title: "狀態",
      key: "status",
      sorter: "default",
    },
    {
      title: "操作",
      key: "action",
      fixed: "right",
    },
  ];
  return (
    <div>
      <Routes>
        <Route path="/" element={<FrontLayout />}>
          <Route path="" element={<Home />}></Route>
          <Route path="products" element={<Products />}></Route>
          <Route path="product/:id" element={<ProductDetail />}></Route>
          <Route path="cart" element={<Cart />}></Route>
          <Route path="checkout" element={<Checkout />}></Route>
          <Route path="success/:orderId" element={<Success />}></Route>
        </Route>
        <Route path="demo" element={<Demo />}></Route>
        <Route path="demo1" element={<Demo1 />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* <Route path="/admin" element={<Dashboard />}> */}
        <Route path="/admin" element={<FunctionLayout />}>
          <Route path="products" element={<AdminProducts />}></Route>
          <Route path="coupons" element={<AdminCoupons />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
