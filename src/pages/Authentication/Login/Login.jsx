import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../social-Login/SocialLogin";
import UseAuth from "../../../Hooks/UseAuth";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Login = () => {
    const {register,handleSubmit,formState: {errors}} = useForm();
    const {signIn} = UseAuth();

    const [showPassword,setShowPassword] = useState(false)

     const locaion = useLocation();
      const navigate = useNavigate();

     const onSubmit = data =>{
        signIn(data.email,data.password)
        .then(result => {
          const user = result.user;
           Swal.fire({
              position: "top-bottom",
              icon: "success",
              title: "Login successful!",
              showConfirmButton: false,
              timer: 1500
               });
                navigate(`${locaion.state?locaion.state : "/" }`)
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
           toast.error(`Registration failed: ${errorMessage}`);
    // ..
  });
    }   
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center bg-gray-100 px-6 py-8">
      <div className="w-full lg:w-1/3 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Welcome Back</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              {...register('email')}
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password', { minLength: 6 })}
              placeholder="******"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute cursor-pointer bg-gray-200 px-2 py-1 rounded-md mt-2 items-center right-6"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password?.type === 'minLength' && (
              <p className="text-red-500">Password must be at least 6 characters long.</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer py-2 rounded-md font-semibold"
          >
            Log In
          </button>

        </form>
      {/* google */}
        <SocialLogin></SocialLogin>

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
