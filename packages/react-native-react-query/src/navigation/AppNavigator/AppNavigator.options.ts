import { StackNavigationOptions } from '@react-navigation/stack'
import { DefaultTheme } from 'styled-components/native'

import { FontNames } from '~/constants'

export const cardGroupOptions = (theme: DefaultTheme): StackNavigationOptions => ({
  headerShown: true,
  headerTitleStyle: {
    fontFamily: FontNames.FredokaRegular,
    fontSize: 16,
  },
  headerStyle: {
    shadowRadius: 0,
    shadowColor: 'transparent',
    elevation: 0,
    borderBottomColor: theme.colors.separatorFirst,
    borderBottomWidth: 1,
  },
  headerBackTitleVisible: false,
})

export const modalGroupOptions: StackNavigationOptions = {
  presentation: 'modal',
  headerShown: false,
  headerTitleStyle: {
    fontFamily: FontNames.FredokaRegular,
    fontSize: 16,
  },
}
