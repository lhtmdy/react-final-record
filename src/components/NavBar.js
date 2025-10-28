import { NavLink } from "react-router-dom";
function NavBar({ cartData }) {
  return (
    <div className="bg-white fixed top-0 left-0 w-full z-50 shadow  p-3">
      <nav className=" bg-white flex justify-between">
        <NavLink className="" to="products">
          產品列表
        </NavLink>
        <NavLink className="" to=""></NavLink>
        <div className="flex">
          <NavLink to="#">
            <i className="fas fa-heart me-5"></i>
          </NavLink>
          <NavLink to="/cart" className=" position-relative">
            <i className="bi bi-bag-fill"></i>
            <span className="">{cartData?.carts?.length || 0}</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
