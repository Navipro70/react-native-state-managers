import { NetworkClient } from '~/services/networkClient'

import { ICommentResponse, ICommentPostBody } from './comment.types'

export const commentRepository = {
  async getAllByPostId(id: number) {
    const { data } = await NetworkClient.instance.get<ICommentResponse[]>(`comments?postId=${id}`)
    return data
  },

  async create(item: ICommentPostBody) {
    const { data } = await NetworkClient.instance.post<ICommentResponse>('comments', item)
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
