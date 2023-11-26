import ApiMessage from '../../model/apiMessage';
import { ApiError } from '../../model/error';
import Question from '../../model/question';
import ResultsByPhoto from '../../model/resultsByPhoto';
import ResultsByUser from '../../model/resultsByUser';
import { getRequest, postRequest, postRequestFile } from '../fetcher/requests';

export function countParticipation(apiUrl: string): Promise<number> {
  return getRequest<number>(`${apiUrl}api/admin/users/count`)
}

export function countFinishedQuiz(apiUrl: string): Promise<number> {
  return getRequest<number>(`${apiUrl}api/admin/quiz/count`)
}

export function getResultsByUser(apiUrl: string): Promise<ResultsByUser[]> {
  return getRequest<ResultsByUser[]>(`${apiUrl}api/admin/resultsByUser`)
}

export function getResultsByPhoto(apiUrl: string): Promise<ResultsByPhoto[]> {
  return getRequest<ResultsByPhoto[]>(`${apiUrl}api/admin/resultsByQuestion`)
}

export function addQuestions(apiUrl: string, questions: Question[]): Promise<ApiMessage | ApiError> {
  return postRequest<ApiMessage | ApiError>(`${apiUrl}api/questions`, questions)
}

export function addImages(apiUrl: string, images: FormData): Promise<ApiMessage | ApiError> {
  return postRequestFile<ApiMessage | ApiError>(`${apiUrl}api/images`, images)
}


export const adminApi = {
  countParticipation,
  countFinishedQuiz,
  getResultsByUser,
  getResultsByPhoto,
  addQuestions,
  addImages
};

