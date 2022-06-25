import { flow, makeAutoObservable } from 'mobx'

import { albumsRepository, IPhotoAlbumResponse } from '~/services/repositories'
import { RootStore } from '~/store/RootStore'

import { IAlbum, IAlbumPhoto } from './types'

export class AlbumEntity {
  rootStore: RootStore

  isLoading = false
  isError = false

  data: IAlbum
  photos: IAlbumPhoto[] = []

  constructor(rootStore: RootStore, data: IAlbum) {
    this.rootStore = rootStore
    this.data = data

    makeAutoObservable(this, { rootStore: false }, { autoBind: true })
  }

  loadPhotos = flow(function* (this: AlbumEntity) {
    try {
      this.isLoading = true
      const photos: IPhotoAlbumResponse[] = yield albumsRepository.getAlbumPhotos(this.data.id)
      this.photos = photos
    } catch {
      this.isError = true
    } finally {
      this.isLoading = false
    }
  })

  deletePhoto = (id: number) => {
    void albumsRepository.deleteAlbumPhoto(id)
    this.photos = this.photos.filter((photo) => photo.id !== id)
  }
}
