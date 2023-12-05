import { useState } from 'react'
import { useAuth } from '../../lib/hooks/useAuth'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useUser } from '../../lib/hooks/useUser'
import { Link, useNavigate } from 'react-router-dom'
import ErrorMessages from './ErrorMessages'
import '/src/styles/auth.css'
import { ApiError } from '../../lib/model/error'

const SignIn = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordType, setPasswordType] = useState("password");
  const [hasError, setHasError] = useState<boolean>(false)
  const [errorMessages, setErrorMessages] = useState<string[]>([])
  const { authenticate } = useAuth()
  const { updateUserState } = useUser()
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = await authenticate(username, password)
    if (response instanceof ApiError) {
      setHasError(true)
      setErrorMessages([response.message])
    } else {
      updateUserState(response);
      navigate('/')
    }
  }

  const togglePassword =()=>{
    if(passwordType==="password")
    {
     setPasswordType("text")
     return;
    }
    setPasswordType("password")
  }

  return (
    <div className="Auth-form-container">
      <form onSubmit={handleSubmit} className='Auth-form'>
        <div className='Auth-form-content'>
          <h3 className='Auth-form-title'>Connexion</h3>
          {hasError && <ErrorMessages errorMessages={errorMessages} />}
          <div className="form-group mt-3">
            <label>Pseudo</label>
              <input
                type="text"
                className='form-control mt-1'
                value={username}
                placeholder='Entrez votre pseudo'
                onChange={(event) => setUsername(event.target.value)}
              />
          </div>
          <div className="form-group mt-3">
            <label>Mot de passe</label>
            <div className="input-group-btn">
              <input
                type={passwordType}
                value={password}
                placeholder="Entrez un mot de passe"
                className="form-control mt-1"
                onChange={(event) => setPassword(event.target.value)}
              />
              <button className="btn" onClick={togglePassword} type='button'>
                { passwordType==="password"? <FaRegEye/> : <FaRegEyeSlash/> }
              </button>
            </div>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">Se connecter</button>
          </div>
          <p className="text-right mt-2">
            Pas encore <Link to='/signUp'> inscrit ?</Link>
          </p>
        </div>
      </form>
      
    </div>
  )
}

export default SignIn
