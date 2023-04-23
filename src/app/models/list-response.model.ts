export interface ListResponse<T> {
  code: string;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  data: Data<T>
  etag: string
}

export interface Data<T> {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: T[]
}
