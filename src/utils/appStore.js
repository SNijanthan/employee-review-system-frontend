import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import employeesReducer from "./employeeSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    employees: employeesReducer,
  },
});

export default appStore;
