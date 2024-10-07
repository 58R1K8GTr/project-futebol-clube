import { ResponseStatusNumberType, ResponseStatusType } from '../types/MapStatusHTTPTypes';

export default function mapStatusHTTP(status: ResponseStatusType): ResponseStatusNumberType {
  switch (status) {
    case 'SUCCESSFUL': return 200;
    case 'INVALID_DATA': return 400;
    default: return 500;
  }
}
