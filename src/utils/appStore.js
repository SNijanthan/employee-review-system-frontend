import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import employeesReducer from "./employeeSlice";
import assignedReviewsReducer from "./assignedReview";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    employees: employeesReducer,
    assignedReview: assignedReviewsReducer,
  },
});

export default appStore;
