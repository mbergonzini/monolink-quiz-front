import { Link } from 'react-router-dom'

 const AuthScreen = () => {
  return (
    <div className="home_start_container">
      <div className="home_start_button_item">
        <Link className="home_start_button" to="/signIn">
          Se connecter
        </Link>
        <Link className="home_start_button" to="/signUp">
          S'enregistrer
        </Link>
      </div>
    </div>
  )
}

export default AuthScreen