import { useApi } from "./useApi";
import ResultsByUser from "../model/resultsByUser";
import ResultsByPhoto from "../model/resultsByPhoto";
import ApiMessage from "../model/apiMessage";
import { ApiError } from "../model/error";
import Question from "../model/question";

export const useAdmin = () => {
  const { countParticipation, countFinishedQuiz, getResultsByUser, getResultsByPhoto, addQuestions, addImages } = useApi();

    const countParticipations = async () => {
        const count: number = await countParticipation();
        return count;
    }

    const countFinishedQuizzes = async () => {
        const count: number = await countFinishedQuiz();
        return count;
    }

    const getResultsForAllUsers = async () => {
        const results: ResultsByUser[] = await getResultsByUser();
        return results;
    }

    const getResultsForAllPhotos = async () => {
        const results: ResultsByPhoto[] = await getResultsByPhoto();
        return results;
    }

    const addAllQuestions = async (questions: Question[]) => {
        const message: ApiMessage | ApiError = await addQuestions(questions);
        return message;
    }

    const addImagesZip = async (images: FormData) => {
        const message: ApiMessage | ApiError = await addImages(images);
        return message;
    }

    



    return { countParticipations, countFinishedQuizzes, getResultsForAllUsers, getResultsForAllPhotos, addAllQuestions, addImagesZip};
};

