import { ResponseStatusNumberType, ResponseStatusType } from '../types/MapStatusHTTPTypes';

export default function mapStatusHTTP(status: ResponseStatusType): ResponseStatusNumberType {
  switch (status) {
    case 'SUCCESSFUL': return 200;
    case 'INVALID_DATA': return 400;
    case 'NOT_FOUND': return 404;
    default: return 500;
  }
}
