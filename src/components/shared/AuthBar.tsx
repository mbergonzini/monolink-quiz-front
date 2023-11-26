import { useContext } from 'react'
import { UserContext } from '../../lib/utils/provider/userProvider'
import { Link } from 'react-router-dom'
import '/src/styles/Auth.css'

const AuthBar = () => {
  const userState = useContext(UserContext)

  return (
    <div className="auth-bar-container">
      <Link className="auth-bar-button" to="/">
        Accueil
      </Link>
      <p className="auth-bar-username">{userState.userProfile.userName}</p>
      {userState.authenticated &&
      <Link className="auth-bar-button" to="/signOut">
        Deconnexion
      </Link>
      }
    </div>
  )
}

export default AuthBar
