import Question from '../../model/question';
import { getRequest } from '../fetcher/requests';

export function getQuestions(apiUrl: string): Promise<Question[]> {
  return getRequest<Question[]>(`${apiUrl}api/questions`)
}

export function getImage(apiUrl: string, id: number): Promise<Blob> {
  return getRequest<Blob>(`${apiUrl}api/images/${id}`)
}

export const questionApi = {
  getQuestions, getImage
};

