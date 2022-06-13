import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { useTheme } from 'styled-components/native'

import { AlbumPhotosScreen, InitialScreen, ModalScreen, UserScreen } from '~/screens'
import { PostScreen } from '~/screens/PostScreen/PostScreen'

import { AppRoutes } from '../Routes'

import { cardGroupOptions, modalGroupOptions } from './AppNavigator.options'
import { AppStackParams } from './AppNavigator.types'
import { TabNavigator } from './TabNavigator'

const Stack = createStackNavigator<AppStackParams>()

export const AppNavigator = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={cardGroupOptions(theme)}>
        <Stack.Screen
          component={InitialScreen}
          name={AppRoutes.Initial}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={TabNavigator}
          name={AppRoutes.TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen component={UserScreen} name={AppRoutes.User} />
        <Stack.Screen component={AlbumPhotosScreen} name={AppRoutes.AlbumPhotos} />
        <Stack.Screen component={PostScreen} name={AppRoutes.Post} />
      </Stack.Group>

      <Stack.Group screenOptions={modalGroupOptions}>
        <Stack.Screen component={ModalScreen} name={AppRoutes.Modal} />
      </Stack.Group>
    </Stack.Navigator>
  )
}
