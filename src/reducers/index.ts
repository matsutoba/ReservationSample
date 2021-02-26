import { combineReducers } from "@reduxjs/toolkit";
import { loginReducer } from "./login_reducer";

export const RootReducer = combineReducers({
    loginReducer: loginReducer,
});
