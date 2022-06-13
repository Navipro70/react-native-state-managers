export interface IPostComment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export interface IPost {
  userId: number
  id: number
  title: string
  body: string
}
