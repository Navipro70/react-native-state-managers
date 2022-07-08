import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Spinner } from '../Spinner'

import { Container } from './LoadingView.style'

interface Props {
  topInsert?: number
  bottomInsert?: number
  safeTop?: boolean
  safeBottom?: boolean
}

export const LoadingView = ({
  safeTop = false,
  topInsert = 0,
  safeBottom = false,
  bottomInsert = 0,
}: Props) => {
  const { top: safeTopInsert, bottom: safeBottomInsert } = useSafeAreaInsets()

  const top = safeTop ? safeTopInsert : topInsert
  const bottom = safeBottom ? safeBottomInsert : bottomInsert

  return (
    <Container bottomInsert={bottom} topInsert={top}>
      <Spinner size="large" />
    </Container>
  )
}
