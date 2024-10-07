export type StatusOkType = 'SUCCESSFUL';
export type StatusErrorType = 'INVALID_DATA';

type ResponseOk<Type> = {
  status: StatusOkType;
  data: Type;
};

export type ResponseError = {
  status: StatusErrorType;
  data: { message: string };
};

export type ServiceResponseType<Type> = (
  Promise<ResponseOk<Type> | ResponseError>
);
