import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthGoogleContext } from '../context/AuthGoogle';
import Login from '../pages/Login/Login';

export default function PrivateRoutes() {
  const { signed } = React.useContext(AuthGoogleContext);

  return signed ? <Outlet /> : <Navigate to='/' />;
}
