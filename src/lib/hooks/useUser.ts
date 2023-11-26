import { useContext } from "react";
import  Response from "../model/response";
import UserResult from "../model/userResult";
import { UserContext } from "../utils/provider/userProvider";
import { useApi } from "./useApi";
import AuthResponse from "../model/authResponse";

export const useUser = () => {
  const { addResponse, getUserResult, getUserResponses} = useApi();
  const userState = useContext(UserContext);

    const addResponseToUser = async (response: Response) => {
        const responses: Response[] = await addResponse(response);
        userState.changeUserResponses(responses);
    }

    const getResult = async () => {
        const userResult: UserResult = await getUserResult();
        return userResult;
    }

    const hasFinished = (countQuestions: number) => {
        if (userState && userState.userResponses && userState.userResponses.length > 0) {
            return userState.userResponses.length >= countQuestions;
        }
        return false;
    }

    const getResponses = async () => {
        const responses: Response[] = await getUserResponses();
        return responses;
    }

    const updateUserState = (userData: AuthResponse | null) => {
        if (userData && userData.id) {
            userState.changeUserProfile(userData);
            userState.changeAuthenticated(true);
            const checkResponses = async () => {
                getResponses().then((responses) => {
                  if (responses && responses.length > 0) {
                    userState.changeUserResponses(responses)
                  } else {
                    userState.changeUserResponses([])
                  }
                })
              }
            checkResponses();
        } else {
            userState.changeUserProfile({id: "", userName: "", email: "", roles: []});
            userState.changeAuthenticated(false);
            userState.changeUserResponses([]);
        }
    }

    const checkAuthenticated = () => {
        return userState.authenticated;
    }



    return { addResponseToUser, getResult, hasFinished, getResponses, updateUserState, checkAuthenticated};
};

