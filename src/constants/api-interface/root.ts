export interface RootResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  isSuccess: boolean;
}
