import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: { name: "kim", age: 23 },
  reducers: {
    changeName(state) {
      state.name = "park";
    },
    increase(state, action) {
      state.age += action.payload;
    },
  },
});

export let { changeName, increase } = user.actions;

export default user;
