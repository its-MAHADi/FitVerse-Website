import React from 'react'
import UseAuth from '../Hooks/UseAuth'
import { Spinner } from '@material-tailwind/react';
import { Navigate, useLocation } from 'react-router';

const PrivetRoutes = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex justify-center mt-10"><Spinner className="h-10 w-10" /></div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivetRoutes;
