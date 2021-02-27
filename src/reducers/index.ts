import { combineReducers } from "@reduxjs/toolkit";
import { loginReducer } from "./LoginReducer";

export const RootReducer = combineReducers({
    loginReducer: loginReducer,
});
