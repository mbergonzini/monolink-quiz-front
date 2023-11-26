
import AuthResponse from '../../model/authResponse';
import { postRequest, getRequest } from '../fetcher/requests';
import SignInRequest from '../../model/signInRequest';
import SignUpRequest from '../../model/signUpRequest';
import ApiMessage from '../../model/apiMessage';
import { ApiError } from '../../model/error';

export function signIn(apiUrl: string, signInRequest: SignInRequest): Promise<AuthResponse | ApiError> {
  return postRequest<AuthResponse | ApiError>(`${apiUrl}api/auth/signin`, signInRequest)
}

export function signUp(apiUrl: string, signUpRequest: SignUpRequest): Promise<ApiMessage | ApiError> {
  return postRequest<ApiMessage | ApiError>(`${apiUrl}api/auth/signup`, signUpRequest)
}

export function signOut(apiUrl: string): Promise<ApiMessage> {
  return postRequest<ApiMessage>(`${apiUrl}api/auth/signout`, null)
}

export function getCurrentUser(apiUrl: string): Promise<AuthResponse> {
  return getRequest<AuthResponse>(`${apiUrl}api/auth/current`)
}


export const authApi = {
  signIn,signOut,signUp, getCurrentUser
};