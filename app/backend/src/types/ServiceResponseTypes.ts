export type StatusOkType = 'SUCCESSFUL' | 'CREATED';
export type StatusErrorType = (
  'UNPROCESSABLE_ENTITY' | 'BAD_REQUEST' | 'NOT_FOUND' | 'UNAUTHORIZED'
);

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
