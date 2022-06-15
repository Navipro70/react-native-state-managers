import { flow, makeAutoObservable } from 'mobx'

import { IUserResponse, userRepository } from '~/services/repositories'

import { RootStore } from '../RootStore'

import { UserEntity } from './entities/UserEntity'

export class UsersStore {
  rootStore: RootStore

  isLoading = false
  isError = false

  users: UserEntity[] = []

  get usersData() {
    return this.users.map(({ data }) => data)
  }

  userById = (id: number) => this.users.find(({ data }) => data.id === id) as UserEntity

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this, { rootStore: false }, { autoBind: true })
  }

  loadUsers = flow(function* (this: UsersStore) {
    try {
      this.isLoading = true
      const users: IUserResponse[] = yield userRepository.getAll()
      this.users = users.map((user) => new UserEntity(this.rootStore, user))
    } catch (error) {
      this.isError = true
    } finally {
      this.isLoading = false
    }
  })

  deleteUser = flow(function* (this: UsersStore, id: number) {
    void this.userById(id)?.delete()
    this.users = this.users.filter((user) => user.data.id !== id)
  })
}
