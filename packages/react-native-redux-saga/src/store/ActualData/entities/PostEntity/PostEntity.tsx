import { flow, makeAutoObservable } from 'mobx'

import {
  commentRepository,
  ICommentPatch,
  ICommentPostBody,
  ICommentResponse,
  IPostPatch,
  IPostResponse,
  postRepository,
} from '~/services/repositories'
import { RootStore } from '~/store/RootStore'

import { IPost, IPostComment } from './types'

export class PostEntity {
  rootStore: RootStore

  isAddingComment = false
  isEditingComment = false

  isEditing = false
  isLoading = false
  isError = false

  data: IPost
  comments: IPostComment[] = []

  commentById = (id: number) => {
    return this.comments.find((comment) => comment.id === id)
  }

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

  updatePost = flow(function* (this: PostEntity, post: IPostPatch) {
    try {
      this.isEditing = true
      this.data = (yield postRepository.update(this.data.id, post)) as IPostResponse
    } finally {
      this.isEditing = false
    }
  })

  updateComment = flow(function* (this: PostEntity, comment: ICommentPatch) {
    try {
      this.isAddingComment = true
      const updatedComment: ICommentResponse = yield commentRepository.update(comment)
      const fullyComment = { ...this.commentById(comment.id), ...updatedComment }
      this.comments = this.comments.map((item) => (item.id === comment.id ? fullyComment : item))
    } finally {
      this.isAddingComment = false
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
