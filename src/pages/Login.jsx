import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { set, useForm } from "react-hook-form";
import authService from "../Api/Auth.js";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../Store/authSlice.js"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState("");

    


    const login = async (data) => {

        console.log(data);
        try {
            // api call 
            const response = await authService.login(data);
            console.log("response", response);

            if (response?.status === 200) {

                document.cookie = `accessToken=${response?.data?.data?.acessToken}`
                document.cookie = `user=${JSON.stringify(response?.data?.data?.user)}`
                // sessionStorage.setItem("token", response?.data?.data?.refreshToken);
                // localStorage.setItem("user", JSON.stringify(response?.data?.data?.user));

                const userData = response?.data?.data?.user;
                dispatch(authLogin(userData));
                navigate("/");
                toast.success('Hey 👋!')
                
            }
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    }



    return (


        <>
            <h1 className="pl-3 pt-1 text-5xl text-red-600 bold font-mono">StreamNow</h1>
            <div className="flex flex-col justify-center items-center  ">
                <div className=" w-[450px] h-[90vh] px-12 py-[60px] bg-gray-200 rounded-lg
                bg-gradient-to-b from-cyan-500 to-blue-500 
              ">
                    {/* bg-gradient-to-b from-cyan-500 to-blue-500  */}
                    <div >
                        <header>
                            <h1 className="text-4xl text-left mb-7">Sign In</h1>
                            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                        </header>
                        <form onSubmit={handleSubmit(login)} className="flex flex-col gap-4">
                            <input
                                type="email"
                                placeholder="Email"
                                className="pt-4 pb-4 w-full py-2 px-3 bg-gray-200 border border-gray-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "

                                {...register("email", {
                                    required: "Email is required",
                                    validate: {
                                        matchPatern: (value) =>
                                            /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
                                            "Email address must be a valid address"
                                    }
                                })}
                            />
                            {errors.email && <p className="text-red-800">{errors.email.message}</p>}
                            <input
                                type="password"
                                placeholder="password"
                                className="pt-4 pb-4 w-full py-2 px-3 bg-gray-200 border border-gray-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters long"
                                    }
                                })}
                            />

                            <button type="submit" className="bg-[#4F46E5] text-white py-2 px-4 rounded-md hover:bg-[#4338CA]">Sign In</button>
                            <p className="text-center">OR</p>

                            <button className="text-white py-2 px-4 rounded-md bg-[#4F46E5]">Continue with Google</button>
                            <Link
                                to="/forgotpassword"
                                className="trasition all duration-200 hover:underline">
                                Forgot password?
                            </Link>

                            <p >New to StreamNow?
                                <Link
                                    to="/signup"
                                    className=" trasition all duration-200 hover:underline pl-1"
                                > Sign Up
                                </Link>
                            </p>
                        </form>


                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

            />
        </>
    )
}

export default Login