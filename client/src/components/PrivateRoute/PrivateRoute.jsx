import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../../atoms';

const PrivateRoute = ({ children }) => {
  const user = useRecoilValue(userState);

  return (user) ? (
    children
  ) : (
    <Navigate to='/login' />
  )

}

export default PrivateRoute