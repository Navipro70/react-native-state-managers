import { NetworkClient } from '~/services/networkClient'

import { ICommentResponse } from './comment.types'

export const commentRepository = {
  async getByPostId(id: number) {
    const { data } = await NetworkClient.instance.get<ICommentResponse[]>(`comments?postId=${id}`)
    return data
  },

  async getById(id: number) {
    const { data } = await NetworkClient.instance.get<ICommentResponse[]>(`comments/${id}`)
    return data
  },

  async create() {
    const { data } = await NetworkClient.instance.post('comments')
    return data
  },

  async update(id: number) {
    const { data } = await NetworkClient.instance.patch(`comments/${id}`)
    return data
  },

  async delete(id: number) {
    const { data } = await NetworkClient.instance.delete(`comments/${id}`)
    return data
  },
}
