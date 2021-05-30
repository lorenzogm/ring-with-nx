import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import Typography from '@material-ui/core/Typography'
import useMediaQueryGetCurrent from '@ring/hooks/useMediaQueryGetCurrent'
import StatisticsIcon from '@ring/icons/StatisticsIcon'
import StopwatchIcon from '@ring/icons/StopwatchIcon'
import PublicLayout from 'components/Layouts/PublicLayout'
import { motion, useAnimation } from 'framer-motion'
import { useRouter } from 'next/dist/client/router'
import { ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components'

export default function Index(): ReactElement {
  const router = useRouter()
  const currentMediaQuery = useMediaQueryGetCurrent()
  const iconFontSize = useIconFontSize()

  const {
    status,
    controlsTeaserFirst,
    controlsTeaserSecond,
    controlsTitle,
    controlsStartButton,
  } = useAnimationSequence()

  const [, { setHoverStatus, unsetHoverStatus }] = useAnimationHover({
    controls: controlsStartButton,
    sequenceStatus: status,
  })

  return (
    <PublicLayout>
      <Box
        minHeight="100vh"
        textAlign="center"
        pt={5}
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
      >
        <Box mb={5}>
          <motion.div initial={{ opacity: 0 }} animate={controlsTitle}>
            <Typography
              variant="h1"
              component={currentMediaQuery === 'xs' ? 'h3' : 'h1'}
            >
              Mustachian Tracker
            </Typography>
          </motion.div>
        </Box>
        <TeasersBoxContainer mb={5}>
          <TeasersBox>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <motion.div
                  initial={{
                    x: '-100vw',
                    opacity: 0,
                  }}
                  animate={controlsTeaserFirst}
                >
                  <Grid
                    container
                    alignItems="center"
                    direction={currentMediaQuery === 'xs' ? 'row' : 'column'}
                  >
                    <Grid item xs={3} sm={12}>
                      <Box
                        mr={currentMediaQuery === 'xs' ? 1 : 0}
                        textAlign={
                          currentMediaQuery === 'xs' ? 'right' : 'center'
                        }
                      >
                        <StatisticsIcon style={{ fontSize: iconFontSize }} />
                      </Box>
                    </Grid>
                    <Grid item xs={9} sm={12}>
                      <Box
                        textAlign={
                          currentMediaQuery === 'xs' ? 'left' : 'center'
                        }
                      >
                        <Typography variant="h4" component="p">
                          Track your wealth
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </motion.div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <motion.div
                  initial={{
                    x: '100vw',
                    opacity: 0,
                  }}
                  animate={controlsTeaserSecond}
                >
                  <Grid
                    container
                    alignItems="center"
                    direction={currentMediaQuery === 'xs' ? 'row' : 'column'}
                  >
                    <Grid item xs={3} sm={12}>
                      <Box
                        mr={currentMediaQuery === 'xs' ? 1 : 0}
                        textAlign={
                          currentMediaQuery === 'xs' ? 'right' : 'center'
                        }
                      >
                        <StopwatchIcon style={{ fontSize: iconFontSize }} />
                      </Box>
                    </Grid>
                    <Grid item xs={9} sm={12}>
                      <Box
                        textAlign={
                          currentMediaQuery === 'xs' ? 'left' : 'center'
                        }
                      >
                        <Typography variant="h4" component="p">
                          In just 5 minutes per month
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </motion.div>
              </Grid>
            </Grid>
          </TeasersBox>
        </TeasersBoxContainer>
        <Box mb={5}>
          <ButtonStyled
            // @ts-expect-error MuiButton has a component prop...
            component={motion.button}
            initial={{ scale: 0 }}
            animate={controlsStartButton}
            onMouseEnter={setHoverStatus}
            onMouseLeave={unsetHoverStatus}
            onClick={() => {
              router.push('/overview').catch((e) => {
                throw e
              })
            }}
          >
            Start
          </ButtonStyled>
        </Box>
      </Box>
    </PublicLayout>
  )
}

function useAnimationSequence() {
  const controlsTitle = useAnimation()
  const controlsTeaserFirst = useAnimation()
  const controlsTeaserSecond = useAnimation()
  const controlsStartButton = useAnimation()

  const [status, setStatus] = useState('IDLE')

  useEffect(() => {
    setStatus('STARTED')
    sequence().catch((e) => {
      throw e
    })

    async function sequence() {
      await controlsTitle.start({
        opacity: 1,
        transition: { ease: 'easeInOut', duration: 1 },
      })

      await controlsTeaserFirst.start({
        x: 10,
        opacity: 1,
        transition: {
          ease: 'easeOut',
          duration: 1,
        },
      })
      await controlsTeaserFirst.start({
        x: 0,
        transition: {
          ease: 'easeInOut',
          duration: 0.5,
        },
      })

      await controlsTeaserSecond.start({
        x: -10,
        opacity: 1,
        transition: {
          ease: 'easeOut',
          duration: 1,
        },
      })
      await controlsTeaserSecond.start({
        x: 0,
        transition: {
          ease: 'easeInOut',
          duration: 0.5,
        },
      })

      await controlsStartButton.start({
        scale: 1,
        transition: {
          ease: 'easeInOut',
          duration: 1,
        },
      })

      setStatus('FINISHED')
    }
  }, [
    controlsTeaserFirst,
    controlsTeaserSecond,
    controlsTitle,
    controlsStartButton,
  ])

  return {
    status,
    controlsTeaserFirst,
    controlsTeaserSecond,
    controlsTitle,
    controlsStartButton,
  }
}

function useAnimationHover({ controls, sequenceStatus }) {
  const [isHovered, setState] = useState(false)

  useEffect(() => {
    if (sequenceStatus === 'FINISHED') {
      if (isHovered) {
        controls.start({
          scale: 1.1,
        })
      } else {
        controls.start({
          scale: 1,
        })
      }
    }
  }, [controls, isHovered, sequenceStatus])

  function setHoverStatus() {
    setState(true)
  }
  function unsetHoverStatus() {
    setState(false)
  }

  return [{}, { setHoverStatus, unsetHoverStatus }]
}

function useIconFontSize() {
  const currentMediaQuery = useMediaQueryGetCurrent()

  switch (currentMediaQuery) {
    case 'xs':
      return 50
    case 'sm':
      return 150
    default:
      return 200
  }
}

const TeasersBoxContainer = styled(Box)`
  position: relative;
  height: 33vh;
`
const TeasersBox = styled(Box)`
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
`

const ButtonStyled = styled(Button)`
  ${({ theme }: { theme: Theme }) => `
    border: 3px ${theme.palette.secondary.main} solid;
    padding: ${theme.spacing(3)}px;
    font-size: ${theme.typography.h4.fontSize};

    ${theme.breakpoints.up('sm')} {
      border: 4px ${theme.palette.secondary.main} solid;
      padding: 20px;
      font-size: 2rem;
    }

    ${theme.breakpoints.up('md')} {
      border: 5px ${theme.palette.secondary.main} solid;
      padding: 20px;
      font-size: 2rem;
    }
  `}
`
