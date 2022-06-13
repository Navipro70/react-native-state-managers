import { NetworkClient } from '~/services/networkClient'

import { IPostResponse } from './post.types'

export const postRepository = {
  async getAll() {
    const { data } = await NetworkClient.instance.get<IPostResponse[]>('posts')
    return data
  },

  async getByUserId(id: number) {
    const { data } = await NetworkClient.instance.get<IPostResponse[]>(`posts?userId=${id}`)
    return data
  },

  async getById(id: number) {
    const { data } = await NetworkClient.instance.get<IPostResponse>(`posts/${id}`)
    return data
  },

  async create() {
    const { data } = await NetworkClient.instance.post<IPostResponse>('posts')
    return data
  },

  async update(id: number) {
    const { data } = await NetworkClient.instance.patch<IPostResponse>(`posts/${id}`)
    return data
  },

  async delete(id: number) {
    const { data } = await NetworkClient.instance.delete(`posts/${id}`)
    return data
  },
}
