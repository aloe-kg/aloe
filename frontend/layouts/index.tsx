import { PropsWithChildren, useState } from 'react'
import { Cart } from '@components'
import { styled } from '@mui/material/styles'
import Head from 'next/head'

import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'

const RootStyle = styled('div')({
  display: 'flex',
})

const MainStyle = styled('main')(({ theme }) => ({
  width: `calc(100% - ${theme.sizes.side_bar_width}px)`,
  flexGrow: 1,
  paddingTop: theme.sizes.app_bar_mobile + 24,
  paddingBottom: theme.spacing(5),
  [theme.breakpoints.up('lg')]: {
    paddingTop: theme.sizes.app_bar_desktop + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}))

interface RootLayoutProps {
  title?: string
  meta_description?: string
  meta_keyword?: string
  height?: string
  overflow?: string
}

export const RootLayout = ({ children, ...other }: PropsWithChildren<RootLayoutProps>) => {
  const [open, setOpen] = useState(false)

  const { height, title = 'Aloe', meta_description, meta_keyword } = other

  return (
    <RootStyle>
      <Head>
        <title>{title}</title>
        {meta_description && <meta name='description' content={meta_description} />}
        {meta_keyword && <meta name='keywords' content={meta_keyword} />}
      </Head>
      <Navbar onOpenSidebar={() => setOpen(true)} />
      <Sidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle sx={{ height }}>{children}</MainStyle>
      <Cart />
    </RootStyle>
  )
}
