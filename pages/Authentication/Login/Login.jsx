import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const Login = () => {
    const [showPassword,setShowPassword] = useState(false)
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center bg-gray-100 px-6 py-8">
      <div className="w-full lg:w-1/3 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Welcome Back</h2>

        <form className="space-y-5">
            {/* email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-blue-500"
              required
            />
          </div>
          {/* password */}
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              name='password' 
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-blue-500"
              required
            />
             <button onClick={()=>{setShowPassword(!showPassword)}} className='absolute cursor-pointer bg-gray-200 px-2 py-1 rounded-md mt-2 items-center right-6'> 
             {
                showPassword ? <FaEyeSlash /> : <FaEye /> 
             }    
              </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
          >
            Log In
          </button>
          
        </form>
      {/* google */}
         <Button
            variant="outlined"
            size="lg"
            className="flex h-12 border-gray-300 items-center justify-center gap-2 mt-5"
            fullWidth
          >
            <img
              src={`https://www.material-tailwind.com/logos/logo-google.png`}
              alt="google"
              className="h-6 w-6"
            />{" "}
            sign in with google
          </Button>

        <div className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
