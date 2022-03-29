import { createSlice } from "@reduxjs/toolkit";

const initialPhoneState = { phones: [] };

const phoneSlice = createSlice({
  name: "phone",
  initialState: initialPhoneState,
  reducers: {
    loadPhones(state, action) {
      console.log("Cargar data: ", action.payload);
      state.phones = action.payload;
    },
    addPhone(state, action) {
      state.phones = action.payload;
    },
    deletePhone(state, action) {
      state.phones = action.payload;
    },
  },
});

export const phoneActions = phoneSlice.actions;

export default phoneSlice.reducer;
