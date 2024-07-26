import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getUserSelector } from '../../services/slices/userSlice';
import React from 'react';

type TProps = {
  onlyUnAuth?: boolean;
  children: React.ReactNode;
};

export const ProtectedRoute = ({ onlyUnAuth, children }: TProps) => {
  const location = useLocation();

  let data = useSelector(getUserSelector);
  let user = data.isAuth;

  if (onlyUnAuth && user) {
    console.log('redirect from login to page');
    const from = localStorage.state?.from || { pathname: '/' };
    const backgroundLocation = location.state?.from?.backgroundLocation || null;
    return <Navigate replace to={from} state={{ backgroundLocation }} />;
  }

  if (!onlyUnAuth && !user) {
    console.log('redirect from page to login');
    return (
      <Navigate
        replace
        to={'/login'}
        state={{
          from: {
            ...location,
            backgroundLocation: location.state?.backgroundLocation
          }
        }}
      />
    );
  }
  return children;
};
export default ProtectedRoute;
