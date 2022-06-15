import { isEmpty } from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { LayoutAnimation, ListRenderItem, TouchableOpacity, View } from 'react-native'

import { AlbumsPreview, DissmisableView, LoadingView, Post, PostForm } from '~/components'
import { useStore } from '~/hooks'
import { AppRoutes, AppScreenProps } from '~/navigation'
import { IAlbum, IPost } from '~/store/ActualData/entities'

import {
  List,
  Avatar,
  SubTitle,
  HeaderWrapper,
  Title,
  InfoTitle,
  InfoSubTitle,
  CenteredRow,
  InfoContainer,
} from './UserScreen.style'

type Props = AppScreenProps<AppRoutes.User>

export const UserScreen = observer(({ navigation, route }: Props) => {
  const { usersStore } = useStore()
  const [isShowPosts, setIsShowPosts] = useState(true)
  const [expandFullInfo, setExpandFullInfo] = useState(false)

  const { id } = route.params
  const user = usersStore.userById(id)
  const userFields = user.data

  const onExpandFullInfo = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setExpandFullInfo(true)
  }

  const onSwitchContent = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setIsShowPosts((val) => !val)
  }

  const onCreatePost = async ({ title, text }: { title: string; text: string }) => {
    await user.createPost({ title, body: text })
  }

  const renderPost: ListRenderItem<IPost> = ({ item }) => {
    const onOpenPost = () => navigation.navigate(AppRoutes.Post, { id: item.id })
    const onDeletePost = () => user.deletePost(item.id)

    return <Post onDelete={onDeletePost} onPress={onOpenPost} {...item} />
  }

  const renderAlbum: ListRenderItem<IAlbum> = ({ item }) => {
    const onOpenPhotos = () => navigation.navigate(AppRoutes.AlbumPhotos, { id: item.id })
    const onDeleteAlbum = () => user.deleteAlbum(item.id)

    return <AlbumsPreview {...item} onDelete={onDeleteAlbum} onPress={onOpenPhotos} />
  }

  useLayoutEffect(() => {
    navigation.setOptions({ title: userFields.username })
  }, [])

  useEffect(() => {
    if (isEmpty(user.posts)) void user.loadPosts()
    if (isEmpty(user.albums)) void user.loadAlbums()
  }, [])

  if (isShowPosts ? user.isPostsLoading : user.isAlbumsLoading) {
    return <LoadingView safeBottom />
  }

  return (
    <DissmisableView>
      <List<IAlbum | IPost>
        ListHeaderComponent={
          <HeaderWrapper>
            <CenteredRow>
              <Avatar source={{ uri: 'https://picsum.photos/200/300' }} />
              <View>
                <Title>{userFields.name}</Title>
                <SubTitle>{userFields.email}</SubTitle>
              </View>
            </CenteredRow>
            <InfoContainer>
              {expandFullInfo ? (
                <>
                  <InfoTitle>Common information:</InfoTitle>
                  <InfoSubTitle>{userFields.phone}</InfoSubTitle>
                  <InfoSubTitle>{userFields.website}</InfoSubTitle>
                  <InfoTitle>Company:</InfoTitle>
                  <InfoSubTitle>{userFields.company.name}</InfoSubTitle>
                  <InfoSubTitle>{userFields.company.catchPhrase}</InfoSubTitle>
                  <InfoSubTitle>{userFields.company.bs}</InfoSubTitle>
                  <InfoTitle>Address:</InfoTitle>
                  <InfoSubTitle>
                    {(userFields.address.city, userFields.address.street)}
                  </InfoSubTitle>
                  <InfoSubTitle>
                    {(userFields.address.suite, userFields.address.zipcode)}
                  </InfoSubTitle>
                </>
              ) : (
                <TouchableOpacity onPress={onExpandFullInfo}>
                  <SubTitle>Show more</SubTitle>
                </TouchableOpacity>
              )}
            </InfoContainer>
            <TouchableOpacity onPress={onSwitchContent}>
              <SubTitle>Show {!isShowPosts ? 'posts' : 'albums'}</SubTitle>
            </TouchableOpacity>
            {isShowPosts && (
              <PostForm isSubmitting={user.isPostsSubmitting} onSubmit={onCreatePost} />
            )}
          </HeaderWrapper>
        }
        data={isShowPosts ? user.postsData : user.albumsData}
        extraData={isShowPosts}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        renderItem={isShowPosts ? renderPost : renderAlbum}
      />
    </DissmisableView>
  )
})
