'use client'
import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify';
import jsCookie from "js-cookie";
const initialState = {
    user: [], // Changed from user to users for clarity
    loading: false,
    error: null
};
<ToastContainer/>
export const loginUser = createAsyncThunk('loginuser',
    async ( {password, sponser,router}) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}user/login`, {
                password: password,
                unique_id:sponser
            })
            if (response.status === 200 && response.data.status_code === "0") {
                toast.error(response.data.message || "Something went wrong!");
            } if(response.status === 200 && response.data.status_code === "1"){
                toast.success(response.data.message);
                router.push('/dashboard')
            }
           return response?.data?.data

        }catch (error) {
            toast.error("An error occurred during login.");
            return error.response?.data?.data || null;

        } 
       
    });

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logout: (state) => {
            // Reset user state and remove cookie
            state.user = null; // Reset the user state
             // Remove the token cookie
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user
            Cookies.set('token', action.payload.token);
        }).addCase(loginUser.rejected, (state, action) => {
            state.loading = false,
            state.error=action.payload
        })
    }
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;

