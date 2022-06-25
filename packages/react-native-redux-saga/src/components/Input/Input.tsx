import React, { useState } from 'react'
import { NativeSyntheticEvent, TextInputFocusEventData, TextInputProps } from 'react-native'

import { StyledTextInput } from './Input.style'

export const Input = ({ onFocus, onBlur, ...props }: TextInputProps) => {
  const [isSelected, setIsSelected] = useState(false)

  const onInputFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsSelected(true)
    onFocus?.(e)
  }

  const onInputBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsSelected(false)
    onBlur?.(e)
  }

  return (
    <StyledTextInput
      isSelected={isSelected}
      onBlur={onInputBlur}
      onFocus={onInputFocus}
      {...props}
    />
  )
}
