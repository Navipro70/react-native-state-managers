import React, { useState } from 'react'

import { Button } from '../Button'
import { Input } from '../Input'

import { FieldsWrapper, MultilineInput, Label } from './PostForm.style'

interface Props {
  isSubmitting: boolean
  initialValues?: { title: string; text: string }
  onSubmit: (value: { title: string; text: string }) => Promise<void>
}

export const PostForm = ({ isSubmitting, initialValues, onSubmit }: Props) => {
  const [title, setTitle] = useState(initialValues?.title ?? '')
  const [text, setText] = useState(initialValues?.text ?? '')

  const onPressSubmit = async () => {
    await onSubmit({ title, text })
    setTitle('')
    setText('')
  }

  return (
    <FieldsWrapper>
      <Label>Title</Label>
      <Input value={title} onChangeText={setTitle} />
      <Label>Text</Label>
      <MultilineInput value={text} onChangeText={setText} />
      <Button isLoading={isSubmitting} onPress={onPressSubmit}>
        Submit
      </Button>
    </FieldsWrapper>
  )
}
