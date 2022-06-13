import { NetworkClient } from '~/services/networkClient'

import { IAlbumResponse, IPhotoAlbumResponse } from './albums.types'

export const albumsRepository = {
  async getAll() {
    const { data } = await NetworkClient.instance.get<IAlbumResponse[]>('/albums')
    return data
  },

  async getUserAlbums(id: number) {
    const { data } = await NetworkClient.instance.get<IAlbumResponse[]>(`/users/${id}/albums`)
    return data
  },

  async getAlbumPhotos(id: number) {
    const { data } = await NetworkClient.instance.get<IPhotoAlbumResponse[]>(`/albums/${id}/photos`)
    return data
  },
}
