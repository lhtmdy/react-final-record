import { Outlet, NavLink,useLocation  } from "react-router-dom";
import Message from "../../components/Message";
import {
  MessageContext,
  messageReducer,
  initState,
} from "../../store/message.store";
import { useReducer, useState } from "react";
import AppIcon from "@/components/AppIcon";
import AppButton from "@/components/AppButton";
import clsx from "clsx"; 
function FunctionLayout() {
  const reducer = useReducer(messageReducer, initState);
  const [open, setOpen] = useState(false);
  const toggleSidebar = () => {
    setOpen(!open);
  };

  const menuLinks = [
    { to: "/admin/products", label: "產品管理" },
    { to: "/admin/coupons", label: "優惠券管理" },
  ];
    const location = useLocation();
  const currentPath = location.pathname;
  return (
    <>
      <MessageContext.Provider value={reducer}>
        <Message />
        <div className="relative w-screen h-screen">
          <header className="bg-gray-800 text-green-08 font-bold p-4 fixed top-0 left-0 right-0 bg-gray-02">
            <NavLink to="/">
              <p>後台管理系統</p>
            </NavLink>
          </header>
          <div className="flex mt-[55px] absolute top-0 left-0 right-0 bottom-0 overflow-hidden bg-white">
            <div
              className={`px-2 py-4 relative ${
                open ? "w-[200px]" : "w-0"
              } transition-all`}
            >
              <ul className={`${open ? "block" : "hidden"} `}>
                {menuLinks.map((item, index) => (
                  <li key={item.label} className={ clsx('hover:bg-green-01 hover:text-green-07 rounded mb-1', {
                      "bg-green-01 font-bold text-green-07": currentPath === item.to,
                    })}>
                    <NavLink to={item.to} className=' block py-2 px-3'>{item.label}</NavLink>
                  </li>
                ))}
              </ul>
              <AppButton
                icon
                className={`!rounded-full right-0 top-1/2 !absolute translate-x-1/2 translate-y-1/2 ${
                  open ? "rotate-0" : "rotate-180"
                }`}
                onClick={() => {
                  toggleSidebar();
                }}
              >
                <AppIcon name="angle-left" />
              </AppButton>
            </div>
            <div className="w-1 grow p-4 bg-gray-50 overflow-auto bg-gray-02">
              <Outlet />
            </div>
          </div>
        </div>
      </MessageContext.Provider>
    </>
  );
}

export default FunctionLayout;
