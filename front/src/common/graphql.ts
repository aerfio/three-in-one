export interface GQLResponse<T = any> {
  data: T;
  errors: {
    message: string
  }[];
}