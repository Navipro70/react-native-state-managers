import { flow, makeAutoObservable } from 'mobx'

import { IPostResponse, postRepository } from '~/services/repositories'
import { extractIds } from '~/utils'

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
      this.postIds = extractIds(posts)
    } catch (error) {
      this.isError = true
    } finally {
      this.isLoading = false
    }
  })

  unshiftPostId = (id: number) => {
    this.postIds.unshift(id)
  }

  deletePost = (id: number) => {
    this.rootStore.actualStore.deletePost(id)
    void postRepository.delete(id)
  }
}
