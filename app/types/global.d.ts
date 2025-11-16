interface IBaseResponse {
  ok: boolean;
  status: number;
  message: string;
}
export interface IResponse extends IBaseResponse {}
export interface IIdenxResponse<T> extends IBaseResponse {
    totalRecords: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    data: T[];
}
export interface IShowResponse<T> extends IBaseResponse {
    data: T;
}