import { useEffect } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Fab } from '@mui/material'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import { useRouter } from 'next/router'

export const ScrollToTop = () => {
  const { pathname } = useRouter()

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  })

  const handleClick = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return (
    <Fade in={trigger}>
      <Box onClick={handleClick} sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <Fab size='small' aria-label='scroll back to top'>
          <KeyboardArrowUpIcon color='primary' />
        </Fab>
      </Box>
    </Fade>
  )
}
