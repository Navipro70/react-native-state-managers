import upperFirst from 'lodash/upperFirst'
import React from 'react'

import { IPostComment } from '~/store/ActualData/entities'

import { Title, Body, Container, EndContent } from './Comment.style'

type Props = IPostComment

export const Comment = ({ body, name, email }: Props) => (
  <Container>
    <Title>{upperFirst(name)}</Title>
    <Body>{upperFirst(body)}</Body>
    <EndContent>
      <Body>{email}</Body>
    </EndContent>
  </Container>
)
