import { Navigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../../utils';

const PrivateRoute = ({ children }) => {
  const currentUser = getCurrentUser();
  const { pathname } = useLocation();

  return (currentUser) ? (
    children
  ) : (
    <Navigate to='/login' state={{ from: pathname }} replace />
  )

}

export default PrivateRoute