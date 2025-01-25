export interface IBaseApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
