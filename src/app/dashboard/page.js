'use client';
import { logout } from '@/redux/slices/auth/loginSlices'; // Ensure this path is correct
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie'

import {useRouter} from 'next/navigation';
function Dashboard() {
    const { user } = useSelector((state) => state.login); // Ensure the state structure is correct
    const dispatch = useDispatch();
    const router = useRouter()
   const handlelogout=()=>{
    Cookies.remove('token',{path:'/'});
    router.push('/')
    dispatch(logout())
      
   }
  
    return (
        <div className='h-screen w-full bg-zinc-700 flex flex-col gap-4 justify-center items-center'>
            <h1 className='text-white text-xl capitalize'>
                <span className='text-green-300'>{user?.name} </span>
                Welcome to Dashboard, where sponsor ID is <span className='text-green-300'>{user?.unique_id}</span>
            </h1>
            <button 
                onClick={handlelogout} // Call the logout action
                className='bg-blue-500 text-white py-2 px-3'>
                Logout
            </button>
        </div>
    );
}

export default Dashboard;
