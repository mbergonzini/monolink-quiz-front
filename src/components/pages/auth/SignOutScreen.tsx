import React from 'react'
import TopTitle from '../../shared/TopTitle'
import SignOut from '../../shared/SignOut'
import '/src/styles/home.css'

const SignOutScreen: React.FC = () => {
  return (
    <div className="home_container">
      <TopTitle />
      <SignOut />
    </div>
  )
}

export default SignOutScreen