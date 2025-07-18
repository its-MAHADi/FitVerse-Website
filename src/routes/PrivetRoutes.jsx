import React from 'react'
import UseAuth from '../Hooks/UseAuth'
import { Spinner } from '@material-tailwind/react';
import { Navigate } from 'react-router';

const PrivetRoutes = ({children}) => {
    const {user,loading} = UseAuth();
    if (loading){
        return  <Spinner className="h-10 w-10" />
    }
    if(!user){
        <Navigate to="/login"> </Navigate>
    }
  return children;
}

export default PrivetRoutes
