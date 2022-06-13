import { difference } from 'lodash'
import { flow, makeAutoObservable, reaction } from 'mobx'

import {
  albumsRepository,
  IAlbumResponse,
  IPostResponse,
  postRepository,
} from '~/services/repositories'
import { RootStore } from '~/store/RootStore'

import { IUser } from '../../types'

export class UserEntity {
  rootStore: RootStore

  isPostsLoading = false
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
    reaction(
      () => this.rootStore.actualStore.postsEntities,
      (prev, next) => {
        const idsToDelete = difference(Array.from(prev.keys()), Array.from(next.keys()))
        this.postIds = difference(this.postIds, idsToDelete)
      },
    )
    reaction(
      () => this.rootStore.actualStore.albumsEntities,
      (prev, next) => {
        const idsToDelete = difference(Array.from(prev.keys()), Array.from(next.keys()))
        this.albumsIds = difference(this.albumsIds, idsToDelete)
      },
    )
  }

  loadPosts = flow(function* (this: UserEntity) {
    try {
      this.isPostsLoading = true
      const posts: IPostResponse[] = yield postRepository.getByUserId(this.data.id)
      this.rootStore.actualStore.mergePosts(posts)
      this.postIds = posts.map((post) => post.id)
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
      this.albumsIds = albums.map((post) => post.id)
    } catch {
      this.isAlbumsError = true
    } finally {
      this.isAlbumsLoading = false
    }
  })

  delete = flow(function* (this: UserEntity) {
    this.rootStore.actualStore.deletePosts(this.postIds)
    this.rootStore.actualStore.deleteAlbums(this.albumsIds)
  })
}
