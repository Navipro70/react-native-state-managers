import { NavigatorScreenParams } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'

import { AppRoutes } from '../Routes'

import { TabStackParams } from './TabNavigator/TabNavigator.types'

export interface AppStackParams extends Record<string, object | undefined> {
  [AppRoutes.Initial]: undefined
  [AppRoutes.TabNavigator]: NavigatorScreenParams<TabStackParams>
  [AppRoutes.User]: { id: number }
  [AppRoutes.AlbumPhotos]: { id: number }
  [AppRoutes.Post]: { id: number; email?: string }

  [AppRoutes.Modal]: undefined
  [AppRoutes.EditPost]: { id: number }
  [AppRoutes.EditComment]: { postId: number; commentId: number }
}

export type AppScreenProps<T extends AppRoutes> = StackScreenProps<AppStackParams, T>
