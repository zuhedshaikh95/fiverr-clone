import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const PrivateRoute = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || false;
  const { pathname } = useLocation();

  return (currentUser) ? (
    children
  ) : (
    <Navigate to='/login' state={{ from: pathname }} replace />
  )

}

export default PrivateRoute