import { NetworkClient } from '~/services/networkClient'

import { ICommentResponse, ICommentPostBody, ICommentPatch } from './comment.types'

export const commentRepository = {
  async getAllByPostId(id: number) {
    const { data } = await NetworkClient.instance.get<ICommentResponse[]>(`comments?postId=${id}`)
    return data
  },

  async create(item: ICommentPostBody) {
    const { data } = await NetworkClient.instance.post<ICommentResponse>('comments', item)
    return data
  },

  async update({ id, ...comment }: ICommentPatch) {
    const { data } = await NetworkClient.instance.patch(`comments/${id}`, comment)
    return data
  },

  async delete(id: number) {
    const { data } = await NetworkClient.instance.delete(`comments/${id}`)
    return data
  },
}
