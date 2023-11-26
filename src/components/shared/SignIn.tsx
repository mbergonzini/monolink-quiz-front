import { useState } from 'react'
import { useAuth } from '../../lib/hooks/useAuth'
import { useUser } from '../../lib/hooks/useUser'
import { Link, useNavigate } from 'react-router-dom'
import ErrorMessages from './ErrorMessages'
import '/src/styles/Auth.css'
import { ApiError } from '../../lib/model/error'

const SignIn = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
              <input
                type="password"
                value={password}
                placeholder='Entrez votre mot de passe'
                className='form-control mt-1'
                onChange={(event) => setPassword(event.target.value)}
              />
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
