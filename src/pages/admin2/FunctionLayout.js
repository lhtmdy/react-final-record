import * as React from "react";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AppIcon from "@/components/AppIcon";
import { Outlet, NavLink } from "react-router-dom";
import Message from "../../components/Message";
import {
  MessageContext,
  messageReducer,
  initState,
} from "../../store/message.store";
import { useReducer } from "react";
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  })
);

export default function PersistentDrawerLeft() {
  const [open, setOpen] = React.useState(false);

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  const menuLinks = [
    { to: "/admin/products", label: "產品管理" },
    { to: "/admin/coupons", label: "優惠券管理" },
  ];

  const reducer = useReducer(messageReducer, initState);
  return (
    <>
      <MessageContext.Provider value={reducer}>
        <Message />
        <div className="flex">
          <div>
            <ul>
              {menuLinks.map((item, index) => (
                <li key={item.label} className="border">
                  <NavLink to={item.to}>
                    <ListItemText primary={item.label} />
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-1 grow realative ">
            <header className="bg-green-06 text-white p-4  border-[3px] w-full">
              <button onClick={handleToggleDrawer} className="!text-[30px]">
                <AppIcon name="bars" className="text-[30px]" />
              </button>
            </header>
            <Main open={open}>
              <Outlet />
            </Main>
          </div>
        </div>
      </MessageContext.Provider>
    </>
  );
}
