interface IContent {
  en: string
  ru: string
  uz: string
}

interface IResult {
  code: string
  description: string
}

interface IPagination {
  total: number
  count: number
  per_page: number
  current_page: number
  total_pages: number
  links: {
    next?: any
    previous?: any
  }
}
interface IResponse<T> {
  data: T
  errors?: string[]
  message: string
}

type ResponseContainer<T = any> = IResponse<T>
type AsyncResponseContainer<T = any | PageableResponse> = Promise<IResponse<T>>
type PageableResponse<T = any> = {
  [key: string]: T
  meta: IPagination
}
interface PaginationParams {
  keyword: string
  page: number
  size: number
  total: number
}

