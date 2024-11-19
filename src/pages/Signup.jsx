import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'


function Signup() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log("Form Data:", data);
        // Perform login logic here
        // dispatch(authLogin(data)) if using Redux
      };

    return (
        <div>
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
                            </header>
                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                                <input
                                    type="text"
                                    placeholder='Full Name'
                                    className='pt-4 pb-4 w-full py-2 px-3 bg-gray-200 border border-gray-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
                                    {...register("firstName", { required: true, maxLength: 20 })}
                                />
                                <div>
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
                                {errors.email && <p className='text-red-800'>{errors.email.message}</p>}
                                </div>

                                <div>
                                <input
                                    type="password"
                                    placeholder="password"
                                    className="pt-4 pb-4 w-full py-2 px-3 bg-gray-200 border border-gray-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "
                                    {...register ("password", 
                                        { required: "Password is required" }
                                    )}
                                    />
                                     {errors.password && <p className='text-red-800'>{errors.password.message}</p>}
                                    </div>

                                <button type='submit' className="bg-[#4F46E5] text-white py-2 px-4 rounded-md hover:bg-[#4338CA]">Sign up</button>
                                <p className="text-center">OR</p>

                                <button className="text-white py-2 px-4 rounded-md bg-[#4F46E5]">Continue with Google</button>


                                <p > Already have an account?
                                    <Link
                                        to="/login"
                                        className=" trasition all duration-200 hover:underline pl-1"
                                    > Sign in
                                    </Link>
                                </p>
                            </form>


                        </div>
                    </div>
                </div>
            </>

        </div>
    )
}

export default Signup
