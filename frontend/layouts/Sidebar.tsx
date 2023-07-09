import { FC, useEffect } from 'react'
import { NavSection, Social } from '@components'
import { useResponsive } from '@hooks'
import { Box, Drawer } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { allAdded } from '@redux/categoriesSlice'
import { useAppDispatch } from '@redux/hooks'
import { BASE_URL } from 'api'
import { LogotypeIcon } from 'assets/icons'
import axios from 'axios'

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: theme.sizes.side_bar_width,
  },
}))

interface SidebarProps {
  isOpenSidebar: boolean
  onCloseSidebar: () => void
}

export const Sidebar: FC<SidebarProps> = ({ isOpenSidebar, onCloseSidebar }) => {
  const dispatch = useAppDispatch()
  const theme = useTheme()

  useEffect(() => {
    axios(`${BASE_URL}/categories`).then(({ data }) => dispatch(allAdded(data)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isDesktop = useResponsive('up', 'lg')

  const renderContent = (
    <>
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <LogotypeIcon enabledLink />
      </Box>
      <NavSection onClose={onCloseSidebar} />
      <Social />
    </>
  )

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: theme.sizes.side_bar_width },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant='persistent'
          PaperProps={{
            sx: {
              width: theme.sizes.side_bar_width,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  )
}
