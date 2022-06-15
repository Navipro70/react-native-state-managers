export interface ICommentResponse {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export interface ICommentPostBody {
  postId: number
  name: string
  email: string
  body: string
}
