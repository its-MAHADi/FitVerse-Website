import { Button } from '@material-tailwind/react'
import React from 'react'
import UseAuth from '../../../Hooks/UseAuth'
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const SocialLogin = () => {
    const {signInWithGoogle} = UseAuth();
    const navigate = useNavigate();
    const handleGoogleSignIn = () => {
      signInWithGoogle()
        .then(result =>{
         const user = result.user;
           // toast.success('Login successful!');
            Swal.fire({
            title: "Login successful!",
            icon: "success",
            draggable: true
          });
            navigate("/")
      })
         
       .catch(error =>{
         const errorCode = error.code;
         const errorMessage = error.message;
            toast.error('Please try again.');
      })
    }
  return (
     <Button onClick={handleGoogleSignIn}
            variant="outlined"
            size="lg"
            className="flex h-12 cursor-pointer border-gray-300 items-center justify-center gap-2 mt-5"
            fullWidth
          >
            <img
              src={`https://www.material-tailwind.com/logos/logo-google.png`}
              alt="google"
              className="h-6 w-6"
            />{" "}
            sign in with google
          </Button>
  )
}

export default SocialLogin
