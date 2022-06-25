import styled from 'styled-components/native'

export const Container = styled.View<{ topInsert: number; bottomInsert: number }>`
  flex: 1;
  justify-content: center;
  align-items: center;

  padding: 0px 24px;
  padding-top: ${({ topInsert }) => topInsert}px;
  padding-bottom: ${({ bottomInsert }) => bottomInsert}px;
`
