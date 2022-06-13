import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

import { TabRoutes } from '~/navigation'

export interface TabStackParams extends Record<string, object | undefined> {
  [TabRoutes.Home]: undefined
  [TabRoutes.Settings]: undefined
}

export type TabScreenProps<T extends TabRoutes> = BottomTabScreenProps<TabStackParams, T>
