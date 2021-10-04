import 'jest-styled-components'
import '@testing-library/jest-dom/extend-expect'

import { setGlobalConfig } from '@storybook/testing-react'

// eslint-disable-next-line import/namespace
import * as globalStorybookConfig from './.storybook/preview'

setGlobalConfig(globalStorybookConfig)
