import React from "react";


function Login() {

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
                        </header>
                        <form action="post" className="flex flex-col gap-4">
                            <input
                                type="email"
                                placeholder="Email"
                                className="pt-4 pb-4 w-full py-2 px-3 bg-gray-200 border border-gray-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 " />
                            <input
                                type="password"
                                placeholder="password"
                                className="pt-4 pb-4 w-full py-2 px-3 bg-gray-200 border border-gray-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 " />

                            <button className="bg-[#4F46E5] text-white py-2 px-4 rounded-md hover:bg-[#4338CA]">Sign In</button>
                            <p className="text-center">OR</p>

                            <button className="text-white py-2 px-4 rounded-md bg-[#4F46E5]">Continue with Google</button>
                            <a href="" >Forgot password?</a>
                            <p >New to Netflix?
                                <a href="" className="pl-1">Sign up now</a>
                            </p>
                        </form>



                    </div>
                </div>
            </div>
        </>
    )
}

export default Login