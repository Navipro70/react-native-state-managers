export interface IPostResponse {
  userId: number
  id: number
  title: string
  body: string
}

export interface IPostBody {
  userId: number
  title: string
  body: string
}

export interface IPostPatch {
  title?: string
  body?: string
}
