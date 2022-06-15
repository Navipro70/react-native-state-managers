import { makeAutoObservable } from 'mobx'

import { IAlbumResponse, IPostResponse } from '~/services/repositories'

import { RootStore } from '../RootStore'

import { AlbumEntity, PostEntity } from './entities'
import { getReferencesByIds } from './utils'

/**
 * This mobx store stores data that referenced by multiple (more than one) other mobx stores
 * Other stores can access to the data by saved ids, and if they get data from
 * Repositories, they have to store that data into this store by merge methods
 */
export class ActualDataStore {
  rootStore: RootStore

  postsEntities = new Map<number, PostEntity>()
  albumsEntities = new Map<number, AlbumEntity>()

  getPostsByIds = (ids: number[]) => getReferencesByIds(ids, this.postsEntities)
  getAlbumsByIds = (ids: number[]) => getReferencesByIds(ids, this.albumsEntities)

  getPostsByUserId = (userId: number) => {
    const ids: number[] = []
    this.postsEntities.forEach(({ data }) => {
      if (data.userId === userId) ids.push(data.id)
    })
    return ids
  }

  getAlbumsByUserId = (userId: number) => {
    const ids: number[] = []
    this.albumsEntities.forEach(({ data }) => {
      if (data.userId === userId) ids.push(data.id)
    })
    return ids
  }

  getPostById = (id: number) => this.postsEntities.get(id)
  getAlbumById = (id: number) => this.albumsEntities.get(id)

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this, { rootStore: false }, { autoBind: true })
  }

  mergePost = (post: IPostResponse) =>
    this.postsEntities.set(post.id, new PostEntity(this.rootStore, post))
  mergePosts = (posts: IPostResponse[]) => posts.forEach(this.mergePost)

  mergeAlbum = (album: IAlbumResponse) =>
    this.albumsEntities.set(album.id, new AlbumEntity(this.rootStore, album))
  mergeAlbums = (albums: IAlbumResponse[]) => albums.forEach(this.mergeAlbum)

  deletePost = (id: number) => this.postsEntities.delete(id)
  deletePosts = (ids: number[]) => ids.forEach(this.deletePost)

  deleteAlbum = (id: number) => this.albumsEntities.delete(id)
  deleteAlbums = (ids: number[]) => ids.forEach(this.deleteAlbum)
}
