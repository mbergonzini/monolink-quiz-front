import { useState, useEffect } from 'react'
import { useAuth } from '../../lib/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import '/src/styles/Auth.css'
import { useUser } from '../../lib/hooks/useUser'

const SignOut = () => {
  const { logout } = useAuth()
  const { updateUserState } = useUser()
  const navigate = useNavigate()
  const [rendered, setRendered] = useState(false)
  const [message, setMessage] = useState('')

  const logOut = async () => {
    logout().then((response) => {
      if (response) {
        setMessage(response.message)
      }
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/')
  }

  useEffect(() => {
    logOut()
    updateUserState(null)
  }, [])

  useEffect(() => {
    if (message) {
      setRendered(true)
    }
  }, [message])


  if (!rendered) {
    return null
  }
  return (
    <div className="Auth-form-container">
      <form onSubmit={handleSubmit} className='Auth-form'>
        <div className='Auth-form-content'>
          <h3 className='Auth-form-title'>Déconnexion</h3>
          <p className="text-center mt-2">
              {message}
            </p>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">Acceuil</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignOut
