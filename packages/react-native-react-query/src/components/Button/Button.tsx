import React, { FC } from 'react'
import { TouchableOpacityProps } from 'react-native'

import { Spinner } from '../Spinner'

import { Container, Text } from './Button.style'

interface Props extends Omit<TouchableOpacityProps, 'activeOpacity'> {
  isLoading?: boolean
}

export const Button: FC<Props> = ({ children, isLoading = false, ...props }) => {
  return <Container {...props}>{isLoading ? <Spinner /> : <Text children={children} />}</Container>
}
