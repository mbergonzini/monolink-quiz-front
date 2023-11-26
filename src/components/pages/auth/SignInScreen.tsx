import React from 'react'
import TopTitle from '../../shared/TopTitle'
import SignIn from '../../shared/SignIn'
import '/src/styles/home.css'

const SignInScreen: React.FC = () => {
  return (
    <div className="home_container">
      <TopTitle />
      <SignIn />
    </div>
  )
}

export default SignInScreen
