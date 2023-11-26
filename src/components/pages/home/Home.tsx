import TopTitle from '../../shared/TopTitle'
import TopImage from '../../shared/TopImage'
import StartScreen from './StartScreen'
import AuthScreen from './AuthScreen'
import '/src/styles/home.css'
import { useContext } from 'react'
import { UserContext } from '../../../lib/utils/provider/userProvider'

const Home = () => {
  const userState = useContext(UserContext)

  return (
    <div className="home_container">
      <TopTitle />
      <TopImage />
      {userState.authenticated ? <StartScreen /> : <AuthScreen />}
    </div>
  )
}

export default Home
