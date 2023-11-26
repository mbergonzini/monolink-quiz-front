import React from 'react'
import TopTitle from '../../shared/TopTitle'
import SignUp from '../../shared/SignUp'
import '/src/styles/home.css'

const SignUpScreen: React.FC = () => {
  return (
    <div className="home_container">
      <TopTitle />
      <SignUp />
    </div>
  )
}

export default SignUpScreen
