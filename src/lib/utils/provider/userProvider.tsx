import React, { createContext, useState, useEffect, useMemo } from 'react'
import Response from '../../model/response'
import { useAuth } from '../../hooks/useAuth'
import { useUser } from '../../hooks/useUser'
import AuthResponse from '../../model/authResponse'

export interface UserContextType {
  authenticated: boolean
  changeAuthenticated: (response: boolean) => void
  userProfile: AuthResponse
  changeUserProfile: (response: AuthResponse) => void
  userResponses: Response[]
  changeUserResponses: (response: Response[]) => void
}
export const UserContext = createContext<UserContextType>({
  authenticated: false,
  changeAuthenticated: () => {},
  userProfile: { userName: '', id: '', email: '', roles: [] },
  changeUserProfile: () => {},
  userResponses: [],
  changeUserResponses: () => {},
})

interface UserProviderProps {
  children: React.ReactNode
}
export const UserProvider = ({ children }: UserProviderProps) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [userProfile, setUserProfile] = useState<AuthResponse>({
    userName: '',
    id: '',
    email: '',
    roles: [],
  })
  const [userResponses, setUserResponses] = useState<Response[]>([])

  const changeAuthenticated = (response: boolean) => {
    setAuthenticated(response)
  }
  const changeUserProfile = (response: AuthResponse) => {
    setUserProfile(response)
  }
  const changeUserResponses = (response: Response[]) => {
    setUserResponses([...response])
  }

  const { getUser } = useAuth()
  const { getResponses } = useUser()

  // if current user -> init
  useEffect(() => {
    const checkUser = async () => {
      getUser().then((user) => {
        if (user && user.id && user.id !== '') {
          changeUserProfile(user)
          changeAuthenticated(true)
        }
      })
    }
    const checkResponses = async () => {
      getResponses().then((responses) => {
        if (responses && responses.length > 0) {
          changeUserResponses(responses)
        } else {
          changeUserResponses([])
        }
      })
    }
    checkUser()
    checkResponses()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const context = useMemo(
    () => ({
      authenticated,
      userProfile,
      userResponses,
      changeAuthenticated,
      changeUserProfile,
      changeUserResponses,
    }),
    [authenticated, userProfile, userResponses]
  )

  return (
    <>
      <UserContext.Provider value={context}>{children}</UserContext.Provider>
    </>
  )
}
