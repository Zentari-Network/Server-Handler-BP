export interface APIResponse<T> {
  route: string;
  status: number;
  data: T;
}

export interface GeneralErrorResponse {
  error: string;
}
export interface GeneralSuccessResponse {
  message: string;
}
export type GeneralResponse = GeneralErrorResponse | GeneralSuccessResponse;
