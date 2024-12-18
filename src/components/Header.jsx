import React from 'react'
import logo from '../assets/logo.png'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Store/authSlice';

function Header() {


    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const userName = useSelector((state) => state.auth.userData?.fullname|| "Guest"); // Replace 'name' with the actual key in userData
    // console.log("userName", userName);

    const handleLogout = () => {
        dispatch(logout());
        // Perform any additional logout logic, e.g., redirect to login page
    };

    return (
        <div className='absolute inset-x-0 top-0 '>
            <div className='border border-solid h-16 w-208 px-4 ml-[279px] shadow-lg'>
                <div className='px-8 flex flex-row'>
                    <div className='flex flex-row py-4'>
                        <form action="get" className='flex flex-row '>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>

                            <input
                                className='ml-2 w-[515px] h-8 '
                                type="text"
                                name=""
                                id="search"
                                placeholder='Search..' />
                        </form>
                        <div className='ml-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                            </svg>
                        </div>
                    </div>
                    {/* <div className='h-16 w-1 bg-black'>

                    </div> */}

                    {/* <div className='w-90 h-16 flex flex-row mr-4 py-4 absolute top-0 right-0 '>
                        <img className='rounded-full ml-4 border-2 border-gray-500' src={logo} alt="" />
                        
                        <div className='ml-4 '>User Name</div>


                        <div className='ml-3 py-1 '>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>

                    </div> */}

                    <div className=" realative w-90 h-16 flex flex-row items-center py-4 absolute top-0 right-0 z-50 mr-1">
                        <img
                            className="rounded-full ml-4 border-2 border-gray-500 cursor-pointer"
                            src={logo}
                            alt="User"
                            onClick={() => setIsOpen(!isOpen)} // Toggle dropdown on click
                        />

                        <div className="ml-4 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                            {userName}
                        </div>

                        <div className="ml-3 py-1 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 8.25L12 15.75L4.5 8.25"
                                />
                            </svg>
                        </div>

                        {/* Dropdown Menu */}
                        {isOpen && (
                            <div className="absolute top-16 right-0 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                                <div className="p-4 text-gray-700 font-medium">{userName}</div>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Header