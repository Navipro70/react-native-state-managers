import { flow, makeAutoObservable } from 'mobx'

import { commentRepository, ICommentPostBody, ICommentResponse } from '~/services/repositories'
import { RootStore } from '~/store/RootStore'

import { IPost, IPostComment } from './types'

export class PostEntity {
  rootStore: RootStore

  isAddingComment = false

  isLoading = false
  isError = false

  data: IPost
  comments: IPostComment[] = []

  constructor(rootStore: RootStore, data: IPost) {
    this.rootStore = rootStore
    this.data = data

    makeAutoObservable(this, { rootStore: false }, { autoBind: true })
  }

  loadComments = flow(function* (this: PostEntity) {
    try {
      this.isLoading = true
      const comments: ICommentResponse[] = yield commentRepository.getAllByPostId(this.data.id)
      this.comments = comments
    } catch {
      this.isError = true
    } finally {
      this.isLoading = false
    }
  })

  addComment = flow(function* (this: PostEntity, comment: Omit<ICommentPostBody, 'postId'>) {
    try {
      this.isAddingComment = true
      const commentBody = { postId: this.data.id, ...comment }
      const newComment: ICommentResponse = yield commentRepository.create(commentBody)
      this.comments.unshift(newComment)
    } finally {
      this.isAddingComment = false
    }
  })

  deleteComment = (id: number) => {
    void commentRepository.delete(id)
    this.comments = this.comments.filter((comment) => comment.id !== id)
  }
}
