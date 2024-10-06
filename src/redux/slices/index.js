import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from './auth/loginSlices'


export const rootReducer=combineReducers({
    login:loginReducer
})