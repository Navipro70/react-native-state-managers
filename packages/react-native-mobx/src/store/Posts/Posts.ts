import { flow, makeAutoObservable } from 'mobx'

import { IPostResponse, postRepository } from '~/services/repositories'

import { RootStore } from '../RootStore'

export class PostsStore {
  private rootStore: RootStore
  private postIds: number[] = []

  isLoading = false
  isError = false

  get posts() {
    return this.rootStore.actualStore.getPostsByIds(this.postIds)
  }

  get postsData() {
    return this.posts.map((post) => post.data)
  }

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this, {}, { autoBind: true })
  }

  loadPosts = flow(function* (this: PostsStore) {
    this.isLoading = true
    try {
      const posts: IPostResponse[] = yield postRepository.getAll()
      this.rootStore.actualStore.mergePosts(posts)
      this.postIds = posts.map((post) => post.id)
    } catch (error) {
      this.isError = true
    } finally {
      this.isLoading = false
    }
  })

  deleteByUserId = () => null
}
