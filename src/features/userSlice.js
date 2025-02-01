import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  name: "",
  img_url: "",
  alert: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email || state.email;
      state.name = action.payload.name || state.name;
      state.img_url = action.payload.img_url || state.img_url;
    },
    setAlert(state, action) {
      state.alert = action.payload;
    },
    resetUser(state) {
      state.email = "";
      state.name = "";
      state.img_url = "";
      state.alert = false;
    },
  },
});

export const { setUser, resetUser, setAlert } = userSlice.actions;

export default userSlice.reducer;
