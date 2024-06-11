import { Navigate, Outlet } from 'react-router-dom';

type TProps = {
  unlockSecurePath: boolean;
};

export const ProtectedRoute = (props: TProps) => {
  return (
    props.unlockSecurePath ? 
    <Outlet /> : <Navigate to="/" />
  )
};

export default ProtectedRoute;
