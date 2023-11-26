import { useApi } from "./useApi";
import SignInRequest from "../model/signInRequest";
import SignUpRequest from "../model/signUpRequest";

export const useAuth = () => {
  const { signIn, signOut, signUp, getCurrentUser} = useApi();

    const authenticate = async (userName: string, password: string) => {
      const request: SignInRequest = {
        "userName": userName,
        "password": password
      }
      const response = await signIn(request);
      return response;
    }

    const register = async (userName: string, email: string, password: string) => {
      const request: SignUpRequest = {
        "userName": userName,
        "email": email,
        "password": password
      }
      const response = await signUp(request);
      return response;
    }

    const logout = async () => {
      const response = await signOut();
      return response;
    }

    const getUser = async () => {
      const response = await getCurrentUser();
      return response;
    }


    return { authenticate, register, logout, getUser};
};