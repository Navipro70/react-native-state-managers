import React from 'react'

import { Icons } from '~/assets'
import { IUser } from '~/store/Users/types'

import {
  Container,
  ColumnsSpace,
  UserPhoto,
  Subtitle,
  Title,
  DeleteTouch,
} from './UserPreview.style'

interface Props extends IUser {
  onPress: () => void
  onDelete: () => void
}

export const UserPreview = ({ name, company, address, onPress, onDelete }: Props) => (
  <Container onPress={onPress}>
    <UserPhoto source={{ uri: 'https://picsum.photos/200/300' }} />
    <ColumnsSpace>
      <Title>{name}</Title>
      <Subtitle>
        {company.name}, {address.street}
      </Subtitle>
    </ColumnsSpace>
    <DeleteTouch onPress={onDelete}>
      <Icons.Close />
    </DeleteTouch>
  </Container>
)
