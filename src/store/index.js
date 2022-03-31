import { configureStore } from "@reduxjs/toolkit";

import phoneReducer from "./phone";

const store = configureStore({
  reducer: {
    phone: phoneReducer,
  },
});

export default store;
