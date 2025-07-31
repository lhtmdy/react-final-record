import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar";
import AppFooter from "../../components/AppFooter";
import Message from "../../components/Message";
import {
  MessageContext,
  messageReducer,
  initState,
} from "../../store/message.store";
import { useReducer } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
function FrontLayout() {
  const [cartData, setCartData] = useState({});

    const getCartData = async () => {
    const res = await axios.get(
      `v2/api/${process.env.REACT_APP_API_PATH}/cart`
    );
    console.log(res);
    setCartData(res.data?.data);
  };
  useEffect(() => {
    getCartData();
  }, []);

  const reducer = useReducer(messageReducer, initState);
  return (
    <>
      <MessageContext.Provider value={reducer}>
        <Message />

        <NavBar cartData={cartData}/>
        <Outlet context={{getCartData}}/>
        <AppFooter />
      </MessageContext.Provider>
    </>
  );
}

export default FrontLayout;
