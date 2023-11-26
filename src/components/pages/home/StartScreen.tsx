import { Link } from 'react-router-dom'
import { UserContext } from '../../../lib/utils/provider/userProvider'
import { useContext } from 'react'

const StartScreen = () => {
  const userState = useContext(UserContext)
  const isAdmin = userState.userProfile.roles.includes('ROLE_ADMIN')

  return (
    <div className="home_start_container">
      <div className="home_start_button_item">
        <Link className="home_start_button" to="/quiz">
          Commencer
        </Link>
        <Link className="home_start_button" to="/signout">
          Déconnexion
        </Link>
        {isAdmin && (
          <Link className="home_start_button" to="/admin/dashboard">
            Administration
          </Link>
        )}
      </div>
    </div>
  )
}

export default StartScreen
