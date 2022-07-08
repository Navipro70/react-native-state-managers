import { NetworkClient } from '~/services/networkClient'

import { IUserResponse } from './user.types'

export const userRepository = {
  // async getAll() {
  //   const { data } = await NetworkClient.instance.get<IUserResponse[]>('users')
  //   return data
  // },

  // async delete(id: number) {
  //   const { data } = await NetworkClient.instance.delete(`users/${id}`)
  //   return data
  // },

  async getAll() {
    const { data } = await NetworkClient.instance.get<IUserResponse[]>(
      'http://localhost:3000/users',
    )
    return data
  },

  async delete(id: number) {
    const { data } = await NetworkClient.instance.delete(`http://localhost:3000/users/${id}`)
    return data
  },
}
