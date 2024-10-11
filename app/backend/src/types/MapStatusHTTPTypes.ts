import { StatusErrorType, StatusOkType } from './ServiceResponseTypes';

export type ResponseStatusType = StatusOkType | StatusErrorType;

export type ResponseStatusNumberType = (
  200 | 201 | 400 | 404 | 401 | 422 | 500
);
