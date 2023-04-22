export interface ListResponse<T> {
  code: string
  status: string
  copyright: string
  attributionText: string
  attributionHTML: string
  data: Data<T>
  etag: string
}

export interface Data<T> {
  offset: string
  limit: string
  total: string
  count: string
  results: T[]
}
