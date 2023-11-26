import Response from '../../model/response';
import UserResult from '../../model/userResult';
import { getRequest, postRequest } from '../fetcher/requests';

export function addResponse(apiUrl: string, response: Response): Promise<Response[]> {
  return postRequest<Response[]>(`${apiUrl}api/participation/addResponse`, response)
}

export function getUserResult(apiUrl: string): Promise<UserResult> {
  return getRequest<UserResult>(`${apiUrl}api/participation/result`)
}

export function getUserResponses(apiUrl: string): Promise<Response[]> {
  return getRequest<Response[]>(`${apiUrl}api/participation/responses`)
}


export const userApi = {
  addResponse,
  getUserResult,
  getUserResponses
};

