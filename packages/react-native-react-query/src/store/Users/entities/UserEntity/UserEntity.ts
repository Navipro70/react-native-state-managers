import { flow, makeAutoObservable } from 'mobx'

import {
  albumsRepository,
  IAlbumResponse,
  IPostResponse,
  postRepository,
  userRepository,
} from '~/services/repositories'
import { IPost } from '~/store/ActualData/entities'
import { RootStore } from '~/store/RootStore'
import { extractIds } from '~/utils'

import { IUser } from '../../types'

export class UserEntity {
  rootStore: RootStore

  isPostsLoading = false
  isPostsSubmitting = false
  isPostsError = false

  isAlbumsLoading = false
  isAlbumsError = false

  data: IUser

  postIds: number[] = []
  albumsIds: number[] = []

  get posts() {
    return this.rootStore.actualStore.getPostsByIds(this.postIds)
  }

  get postsData() {
    return this.posts.map((post) => post.data)
  }

  get albums() {
    return this.rootStore.actualStore.getAlbumsByIds(this.albumsIds)
  }

  get albumsData() {
    return this.albums.map((album) => album.data)
  }

  constructor(rootStore: RootStore, data: IUser) {
    this.rootStore = rootStore
    this.data = data
    makeAutoObservable(this, { rootStore: false }, { autoBind: true })
  }

  loadPosts = flow(function* (this: UserEntity) {
    try {
      this.isPostsLoading = true
      const posts: IPostResponse[] = yield postRepository.getAllByUserId(this.data.id)
      this.rootStore.actualStore.mergePosts(posts)
      this.postIds = extractIds(posts)
    } catch {
      this.isPostsError = true
    } finally {
      this.isPostsLoading = false
    }
  })

  loadAlbums = flow(function* (this: UserEntity) {
    try {
      this.isAlbumsLoading = true
      const albums: IAlbumResponse[] = yield albumsRepository.getUserAlbums(this.data.id)
      this.rootStore.actualStore.mergeAlbums(albums)
      this.albumsIds = extractIds(albums)
    } catch {
      this.isAlbumsError = true
    } finally {
      this.isAlbumsLoading = false
    }
  })

  createPost = flow(function* (this: UserEntity, post: Pick<IPost, 'title' | 'body'>) {
    try {
      this.isPostsSubmitting = true
      const newPost = yield postRepository.create({ ...post, userId: this.data.id })
      this.rootStore.actualStore.mergePost(newPost)
      this.postIds.unshift(newPost.id)
      this.rootStore.postsStore.unshiftPostId(newPost.id)
    } finally {
      this.isPostsSubmitting = false
    }
  })

  delete = flow(function* (this: UserEntity) {
    void userRepository.delete(this.data.id)
    this.deletePosts()
    this.deleteAlbums()
  })

  private deletePosts = () => {
    const postIds = this.rootStore.actualStore.getPostsByUserId(this.data.id)
    this.rootStore.actualStore.deletePosts(postIds)
  }

  private deleteAlbums = () => {
    const albumsIds = this.rootStore.actualStore.getAlbumsByUserId(this.data.id)
    this.rootStore.actualStore.deleteAlbums(albumsIds)
  }

  deletePost = (id: number) => {
    this.rootStore.actualStore.deletePost(id)
    void postRepository.delete(id)
  }

  deleteAlbum = (id: number) => {
    this.rootStore.actualStore.deleteAlbum(id)
    void albumsRepository.deleteAlbum(id)
  }
}
