import { useApi } from "./useApi";
import ResultsByUser from "../model/resultsByUser";
import ResultsByPhoto from "../model/resultsByPhoto";
import Question from "../model/question";
import { ImportMessage } from "../model/importMessage";

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
        const message: ImportMessage = await addQuestions(questions);
        return message;
    }

    const addImagesZip = async (images: FormData) => {
        const message: ImportMessage = await addImages(images);
        return message;
    }

    



    return { countParticipations, countFinishedQuizzes, getResultsForAllUsers, getResultsForAllPhotos, addAllQuestions, addImagesZip};
};

