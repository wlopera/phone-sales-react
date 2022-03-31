import { createSlice } from "@reduxjs/toolkit";

const initialPhoneState = {
  phones: [],
  totals: {
    apple: 0,
    huawei: 0,
    motorola: 0,
    sansung: 0,
  },
};

const phoneSlice = createSlice({
  name: "phone",
  initialState: initialPhoneState,
  reducers: {
    loadPhones(state, action) {
      console.log("Cargar data: ", action.payload);
      state.phones = action.payload;

      const result = action.payload.reduce(
        (prevValue, currentValue) => {
          switch (currentValue.brand) {
            case "APPLE":
              prevValue.apple += 1;
              return prevValue;

            case "HUAWEI":
              prevValue.huawei += 1;
              return prevValue;

            case "MOTOROLA":
              prevValue.motorola += 1;
              return prevValue;

            case "SAMSUNG":
              prevValue.sansung += 1;
              return prevValue;

            default:
              return prevValue;
          }
        },
        {
          apple: 0,
          huawei: 0,
          motorola: 0,
          sansung: 0,
        }
      );

      state.totals = result;
    },

    addPhone(state, action) {
      console.log("Agregar data: ", action.payload);
      state.phones.push(action.payload);

      switch (action.payload.brand) {
        case "APPLE":
          state.totals.apple += 1;
          return;

        case "HUAWEI":
          state.totals.huawei += 1;
          return;

        case "MOTOROLA":
          state.totals.motorola += 1;
          return;

        case "SAMSUNG":
          state.totals.sansung += 1;
          return;

        default:
          return;
      }
    },

    deletePhone(state, action) {
      state.phones = action.payload;
    },
  },
});

export const phoneActions = phoneSlice.actions;

export default phoneSlice.reducer;
