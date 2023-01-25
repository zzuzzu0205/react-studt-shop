import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice.js";

let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "black and white", count: 2 },
    { id: 2, name: "runner", count: 1 },
  ],
  reducers: {
    addItem(state, action) {
      let findSameId = state.findIndex((a) => a.id == action.payload);
      state[findSameId].count++;
    },
    removeItem(state, action) {
      let findSameId = state.findIndex((a) => a.id == action.payload);
      state[findSameId].count--;
    },
    delItem(state, action) {
      let findSameId = state.findIndex((a) => a.id == action.payload);
      state.splice(findSameId, 1);
    },
    addCart(state, action) {
      state.push(action.payload);
    },
  },
});

export let { addItem, addCart, removeItem, delItem } = cart.actions;
export default configureStore({
  reducer: {
    user: user.reducer,
    cart: cart.reducer,
  },
});
