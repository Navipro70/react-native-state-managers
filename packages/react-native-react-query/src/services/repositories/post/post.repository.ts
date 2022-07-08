import { NetworkClient } from '~/services/networkClient'

import { IPostBody, IPostPatch, IPostResponse } from './post.types'

export const postRepository = {
  async getAll() {
    const { data } = await NetworkClient.instance.get<IPostResponse[]>('posts')
    return data
  },

  async getAllByUserId(id: number) {
    const { data } = await NetworkClient.instance.get<IPostResponse[]>(`posts?userId=${id}`)
    return data
  },

  async create(post: IPostBody) {
    const { data } = await NetworkClient.instance.post<IPostResponse>('posts', post)
    return data
  },

  async update(id: number, post: IPostPatch) {
    const { data } = await NetworkClient.instance.patch<IPostResponse>(`posts/${id}`, post)
    return data
  },

  async delete(id: number) {
    const { data } = await NetworkClient.instance.delete(`posts/${id}`)
    return data
  },
}
