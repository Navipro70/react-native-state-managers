import { flow, makeAutoObservable } from 'mobx'

import { albumsRepository, IAlbumResponse } from '~/services/repositories'

import { RootStore } from '../RootStore'

export class AlbumsStore {
  private rootStore: RootStore
  private albumsIds: number[] = []

  isLoading = false
  isError = false

  get albums() {
    return this.rootStore.actualStore.getAlbumsByIds(this.albumsIds)
  }

  get albumsData() {
    return this.albums.map((entity) => entity.data)
  }

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this, {}, { autoBind: true })
  }

  loadAlbums = flow(function* (this: AlbumsStore) {
    this.isLoading = true
    try {
      const albums: IAlbumResponse[] = yield albumsRepository.getAll()
      this.rootStore.actualStore.mergeAlbums(albums)
      this.albumsIds = albums.map((album) => album.id)
    } catch (error) {
      this.isError = true
    } finally {
      this.isLoading = false
    }
  })
}
