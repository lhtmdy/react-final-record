import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "message",
  initialState: [],
  reducers: {
    createMessage(state, action) {

    if(action.payload.success){
      state.push({
        id: action.payload.id,
        type: "success",
        title: "成功",
        text: action.payload.message || "操作成功",
      });
    }else{
      state.push({
        id: action.payload.id,
        type: "danger",
        title: "失敗",
        text: Array.isArray(action.payload.data.message) ? action.payload.data.message.join(", ") : action.payload.data.message || "操作失敗",
      });
    }
    },
    removeMessage(state, action) {
      const index = state.findIndex((msg) => msg.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const { createMessage } = messageSlice.actions;

export const createAsyncMessage = createAsyncThunk(
  'message/createAsyncMessage',
  async function (payload,{dispatch, requestId}){
    dispatch(
      messageSlice.actions.createMessage({
        ...payload,
        id:requestId,
      })
    )

    setTimeout(()=>{
      dispatch(messageSlice.actions.removeMessage(requestId));
    },2000)
  }
)

export default messageSlice.reducer;
