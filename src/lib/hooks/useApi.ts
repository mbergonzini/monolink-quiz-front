import { useContext } from "react";
import { ConfigContext } from "../utils/provider/configProvider";
import { questionApi } from "../api/remote/question";
import { userApi } from "../api/remote/user";
import { authApi } from "../api/remote/auth";
import { adminApi } from "../api/remote/admin";
import Response from "../model/response";
import SignInRequest from "../model/signInRequest";
import SignUpRequest from "../model/signUpRequest";
import Question from "../model/question";

export const useApi = () => {
    const { apiUrl } = useContext(ConfigContext);

    const getQuestions = () => questionApi.getQuestions(apiUrl);
    const getImage = (id: number) => questionApi.getImage(apiUrl, id);

    const addResponse = (response: Response) => userApi.addResponse(apiUrl, response);

    const getUserResult = () => userApi.getUserResult(apiUrl);
    const getUserResponses = () => userApi.getUserResponses(apiUrl);

    const signIn = (request: SignInRequest) => authApi.signIn(apiUrl, request);
    const signUp = (request: SignUpRequest) => authApi.signUp(apiUrl, request);
    const signOut = () => authApi.signOut(apiUrl);
    const getCurrentUser = () => authApi.getCurrentUser(apiUrl);

    const countParticipation = () => adminApi.countParticipation(apiUrl);
    const countFinishedQuiz = () => adminApi.countFinishedQuiz(apiUrl);
    const getResultsByUser = () => adminApi.getResultsByUser(apiUrl);
    const getResultsByPhoto = () => adminApi.getResultsByPhoto(apiUrl);
    const addQuestions = (questions: Question[]) => adminApi.addQuestions(apiUrl, questions);
    const addImages = (images: FormData) => adminApi.addImages(apiUrl, images);

    return {
        getQuestions,
        getImage,
        addResponse,
        getUserResult,
        getUserResponses,
        signIn,
        signUp,
        signOut,
        getCurrentUser,
        countParticipation,
        countFinishedQuiz,
        getResultsByUser,
        getResultsByPhoto,
        addQuestions,
        addImages
    }
};