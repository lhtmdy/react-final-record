import { createContext } from "react";

export const MessageContext = createContext({});

export const initState = {
  type: "",
  title: "",
  content: "",
};

//reducer

export const messageReducer = (state, action) => {
  switch (action.type) {
    case "POST_MESSAGE":
      return {
       ...action.payload,
      };
    case "CLEAR_MESSAGE":
      return {
        ...initState,
      };
    default:
      return state;
  }
};


export function handleSuccessMessage(dispatch, res) {
  dispatch({
    type: "POST_MESSAGE",
    payload: {
      type: 'success',
      title: "成功",
      content: res.data.message || "操作成功",
    },
  });
  
  setTimeout(() => {
    dispatch({ type: "CLEAR_MESSAGE" });
  }
, 3000);
}

export function handleErrorMessage(dispatch, res) {
  dispatch({
    type: "POST_MESSAGE",
    payload: {
      type: 'danger',
      title: "失敗",
      content: Array.isArray(res.data.message) ? res.data.message.join(", ") : res.data.message || "操作失敗",
    },
  });
  
  setTimeout(() => {
    dispatch({ type: "CLEAR_MESSAGE" });
  }
, 3000);
}

