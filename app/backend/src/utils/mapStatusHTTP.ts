import { ResponseStatusNumberType, ResponseStatusType } from '../types/MapStatusHTTPTypes';

export default function mapStatusHTTP(status: ResponseStatusType): ResponseStatusNumberType {
  switch (status) {
    case 'SUCCESSFUL': return 200;
    case 'BAD_REQUEST': return 400;
    case 'NOT_FOUND': return 404;
    case 'UNAUTHORIZED': return 401;
    default: return 500;
  }
}
