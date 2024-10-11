import { ResponseStatusNumberType, ResponseStatusType } from '../types/MapStatusHTTPTypes';

export default function mapStatusHTTP(status: ResponseStatusType): ResponseStatusNumberType {
  switch (status) {
    case 'SUCCESSFUL': return 200;
    case 'CREATED': return 201;
    case 'BAD_REQUEST': return 400;
    case 'NOT_FOUND': return 404;
    case 'UNAUTHORIZED': return 401;
    case 'UNPROCESSABLE_ENTITY': return 422;
    default: return 500;
  }
}
