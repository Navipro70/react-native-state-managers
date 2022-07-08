import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { LayoutAnimation, ListRenderItem } from 'react-native'

import { LoadingView } from '~/components'
import { useStore } from '~/hooks'
import { AppRoutes, TabRoutes, TabScreenProps } from '~/navigation'
import { IUser } from '~/store/Users/types'

import { List } from './UsersScreen.style'
import { UserPreview } from './components'

type Props = TabScreenProps<TabRoutes.Users>

export const UsersScreen = observer(({ navigation }: Props) => {
  const {
    usersStore: { usersData, isLoading, loadUsers, deleteUser },
  } = useStore()

  useEffect(() => {
    void loadUsers()
  }, [])

  const renderItem: ListRenderItem<IUser> = ({ item }) => {
    const onPress = () => navigation.navigate(AppRoutes.User, { id: item.id })
    const onDelete = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      void deleteUser(item.id)
    }

    return <UserPreview {...item} onDelete={onDelete} onPress={onPress} />
  }

  if (isLoading) {
    return <LoadingView safeTop />
  }

  return (
    <List
      data={usersData.slice()}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  )
})
