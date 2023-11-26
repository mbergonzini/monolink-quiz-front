import { Outlet } from 'react-router-dom'
import {useContext} from 'react'
import { UserContext } from '../utils/provider/userProvider'

const ProtectedRoute = () => {
  const userState = useContext(UserContext);
  
  if (userState.authenticated && userState.userProfile.roles.includes('ROLE_ADMIN')) {
    return <Outlet />
  } else {
    return <div> You are not authorized to access this page </div>
  }
}

export default ProtectedRoute
