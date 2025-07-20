import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router';
import UseAuth from '../../../Hooks/UseAuth';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const SignUp = () => {
    const {register,handleSubmit,formState: {errors}} = useForm();
    const { createUser} = UseAuth();


     const [showPassword,setShowPassword] = useState(false)

    const onSubmit = data =>{
        createUser(data.email, data.password, data.name, data.photoURL)
        // console.log(data)
        .then(result => {
          const user = result.user;
           Swal.fire({
              position: "top-bottom",
              icon: "success",
              title: "Sign Up successful!",
              showConfirmButton: false,
              timer: 1500
               });
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
           toast.error(`Registration failed: ${errorMessage}`);
    // ..
  });
    }   

  return (
    <div className="flex items-center justify-center bg-gray-100 px-4 py-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Create an Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              {...register('name')}
              id="name"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register('email')}
              id="email"
              placeholder="example@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Photo URL */}
          <div>
            <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700 mb-1">
              Photo URL
            </label>
            <input
              type="text"
              {...register('photoURL')}
              id="photoURL"
              placeholder="https://image.com/profile.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className='relative'>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              name='password' 
              type={showPassword ? 'text' : 'password'}
              {...register('password',{minLength:6})}
              placeholder="******"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
             <button onClick={()=>{setShowPassword(!showPassword)}} className='absolute cursor-pointer bg-gray-200 px-2 py-1 rounded-md mt-2 items-center right-6'> 
             {
                showPassword ? <FaEyeSlash /> : <FaEye /> 
             }    
              </button>
               {
                errors.password?.type==='minLength' && <p className="text-red-500">Password must be at least 6 characters long.</p>
              }
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Login Redirect */}
        <p className="text-sm text-center text-gray-600 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
