import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { useTheme } from 'styled-components/native'

import { Icons } from '~/assets'
import { AlbumsScreen, HomeScreen, SettingsScreen, UsersScreen } from '~/screens'

import { TabRoutes } from '../../Routes'

import { tabScreensOption } from './TabNavigator.options'
import { TabStackParams } from './TabNavigator.types'

const Stack = createBottomTabNavigator<TabStackParams>()

export const TabNavigator = () => {
  const { colors } = useTheme()

  return (
    <Stack.Navigator screenOptions={tabScreensOption(colors)}>
      <Stack.Screen
        component={HomeScreen}
        name={TabRoutes.Home}
        options={{
          tabBarLabel: 'News',
          tabBarIcon: Icons.Home,
        }}
      />
      <Stack.Screen
        component={UsersScreen}
        name={TabRoutes.Users}
        options={{
          tabBarLabel: 'Users',
          tabBarIcon: Icons.Home,
        }}
      />
      <Stack.Screen
        component={AlbumsScreen}
        name={TabRoutes.Albums}
        options={{
          tabBarLabel: 'Albums',
          tabBarIcon: Icons.Albums,
        }}
      />
      <Stack.Screen
        component={SettingsScreen}
        name={TabRoutes.Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: Icons.Settings,
        }}
      />
    </Stack.Navigator>
  )
}
