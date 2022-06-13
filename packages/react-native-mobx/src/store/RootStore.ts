import { ActualDataStore } from './ActualData'
import { AlbumsStore } from './Albums/Albums'
import { PostsStore } from './Posts'
import { UsersStore } from './Users/Users'

export class RootStore {
  actualStore: ActualDataStore
  postsStore: PostsStore
  usersStore: UsersStore
  albumsStore: AlbumsStore

  constructor() {
    this.actualStore = new ActualDataStore(this)
    this.postsStore = new PostsStore(this)
    this.usersStore = new UsersStore(this)
    this.albumsStore = new AlbumsStore(this)
  }
}

export const rootStore = new RootStore() // SINGLETON
