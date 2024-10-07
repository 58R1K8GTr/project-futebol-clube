import { StatusErrorType, StatusOkType } from './ServiceResponseTypes';

export type ResponseStatusType = StatusOkType | StatusErrorType;

export type ResponseStatusNumberType = (
  200 | 400 | 404 | 500
);
