import { RingTheme } from '@ring/ui'

export const LayoutDefault: RingTheme['layouts']['LayoutDefault'] = {
  Container: {
    minHeight: 'calc(100vh - 88px)',
  },
  AsideBody:{

  display: flex;
  min-height: calc(100vh - 245px);
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing(6)}px;
  }
}
