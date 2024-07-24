import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "../app/slice/jobSlice";

export default configureStore({
  reducer: { jobReducer },
});
