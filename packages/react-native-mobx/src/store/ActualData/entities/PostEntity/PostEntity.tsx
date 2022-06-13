import { flow, makeAutoObservable } from 'mobx'

import { commentRepository, ICommentResponse } from '~/services/repositories'
import { RootStore } from '~/store/RootStore'

import { IPost, IPostComment } from './types'

export class PostEntity {
  rootStore: RootStore

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
      const comments: ICommentResponse[] = yield commentRepository.getByPostId(this.data.id)
      this.comments = comments
    } catch {
      this.isError = true
    } finally {
      this.isLoading = false
    }
  })
}
