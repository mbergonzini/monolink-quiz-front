import { useState} from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useAuth } from '../../lib/hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import { ApiErrorDetails, ErrorDetailsField } from '../../lib/model/error'
import ErrorMessages from './ErrorMessages'
import '/src/styles/auth.css'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordType, setPasswordType] = useState("password");
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const { register } = useAuth()
  const navigate = useNavigate()
  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setHasError(false);
    const response = await register(username, email, password);
    if (response instanceof ApiErrorDetails) {
      const details: ErrorDetailsField[] = response.details;
      if (details.length > 0) {
        setHasError(true);
      }
      setErrorMessages(details.map((error) => error.message));
    } else {
      setIsRegistered(true)
    }
  }

  const signIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate('/signIn')
  }

  const togglePassword =()=>{
    if(passwordType==="password")
    {
     setPasswordType("text")
     return;
    }
    setPasswordType("password")
  }

  if (isRegistered) {
    return (
      <div className="Auth-form-container">
        <form onSubmit={signIn} className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Profil</h3>
            <p className="text-center mt-2">
              Votre compte a bien été créé !
            </p>
            <div className="form-group mt-3">
              <label>Pseudo</label>
              <input
              type="text"
              value={username}
              className="form-control mt-1"
              readOnly={true}
              disabled={true}
            />
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
              type="text"
              value={email}
              readOnly={true}
              disabled={true}
              className="form-control mt-1"
            />
            </div>
            <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Se connecter
            </button>
          </div>
          </div>
          </form>
      </div>
    )
  }

  return (
    <div className="Auth-form-container">
      <form onSubmit={handleSubmit} className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Enregistrement</h3>
          {hasError && <ErrorMessages errorMessages={errorMessages} />}
          <div className="form-group mt-3">
            <label>Pseudo</label>
            <input
            type="text"
            value={username}
            className="form-control mt-1"
            placeholder="Entrez votre pseudo"
            onChange={(event) => setUsername(event.target.value)}
          />
          </div>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
            type="text"
            value={email}
            placeholder="Entrez votre email"
            className="form-control mt-1"
            onChange={(event) => setEmail(event.target.value)}
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
            <button type="submit" className="btn btn-primary">
              S'enregistrer
            </button>
          </div>
          <p className="text-center mt-2">
            Déja enregistré ? <Link to="/signIn">Se connecter</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default SignUp
