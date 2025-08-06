import { Outlet, NavLink } from "react-router-dom";
import Message from "../../components/Message";
import {
  MessageContext,
  messageReducer,
  initState,
} from "../../store/message.store";
import { useReducer } from "react";
function FunctionLayout() {
  const reducer = useReducer(messageReducer, initState);
  return (
    <>
      <MessageContext.Provider value={reducer}>
        <Message />
        <div className="relative w-screen h-screen">
          <header className="bg-gray-800 text-white p-4 fixed top-0 left-0 right-0">
            <NavLink to="/">
              <p>後台管理系統</p>
            </NavLink>
          </header>
          <div className="flex mt-[72px] absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
            <div className="w-64 bg-gray-200 p-4">
              <ul>
                <li className="py-3">產品管理</li>
                <li>優惠券管理</li>
              </ul>
            </div>
            <div className="w-1 grow p-4 bg-gray-50 overflow-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </MessageContext.Provider>
    </>
  );
}

export default FunctionLayout;
