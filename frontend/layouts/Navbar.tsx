import { useEffect, useState } from 'react'
import { AccountPopover, Iconify, Searchbar } from '@components'
import { IProfile } from '@interfaces'
import { Favorite, LocalShipping, Login, ShoppingCart } from '@mui/icons-material'
import { AppBar, Badge, Box, IconButton, Stack, Toolbar, Tooltip } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'
import { cartToggled, fetchCartItems } from '@redux/cartSlice'
import { fetchFavoriteItems } from '@redux/favoriteSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import axios from 'axios.config'
import Link from 'next/link'
import { getTokenFromCookie, removeTokenFromCookie } from 'utils/token'

interface NavbarProps {
  onOpenSidebar: () => void
}

export const Navbar = ({ onOpenSidebar }: NavbarProps) => {
  const token = getTokenFromCookie()

  const [profile, setProfile] = useState<IProfile | null>(null)
  const dispatch = useAppDispatch()
  const { cartList, isOpened } = useAppSelector((s) => s.cart)
  const cartListCount = Object.keys(cartList).length

  const cartToggleHandler = () => {
    dispatch(cartToggled(!isOpened))
  }

  const logout = () => {
    setProfile(null)
    removeTokenFromCookie()
  }

  const getProfile = () => {
    axios('/profile/me')
      .then(({ data }) => {
        setProfile(data)
      })
      .catch((error) => {
        setProfile(null)

        if (error?.response?.data?.detail) {
          removeTokenFromCookie()
        }
      })
  }

  useEffect(() => {
    if (token) {
      dispatch(fetchCartItems())
      dispatch(fetchFavoriteItems())
      getProfile()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return (
    <RootStyle>
      <ToolbarStyle>
        <IconButton
          onClick={onOpenSidebar}
          sx={{ mr: 1, color: 'text.primary', display: { lg: 'none' } }}
        >
          <Iconify icon='eva:menu-2-fill' />
        </IconButton>

        <Box sx={{ flexGrow: 1 }}>
          <Searchbar />
        </Box>

        <Stack direction='row' alignItems='center' spacing={{ xs: 0.5, sm: 1.5 }}>
          <Tooltip title='Оплата и Доставка'>
            <IconButton>
              <Link href='/delivery' passHref>
                <LocalShipping color='primary' />
              </Link>
            </IconButton>
          </Tooltip>

          <Tooltip title='Избранные товары'>
            <IconButton>
              <Link href='/favorites' passHref>
                <Favorite color='primary' />
              </Link>
            </IconButton>
          </Tooltip>

          <Tooltip title='Корзина'>
            <IconButton onClick={cartToggleHandler}>
              <Badge badgeContent={cartListCount} color='primary'>
                <ShoppingCart color='primary' />
              </Badge>
            </IconButton>
          </Tooltip>

          {profile ? (
            <AccountPopover logout={logout} profile={profile} />
          ) : (
            <Tooltip title='Войти'>
              <IconButton>
                <Link href='/login' passHref>
                  <Login color='primary' />
                </Link>
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  )
}

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${theme.sizes.side_bar_width + 1}px)`,
  },
}))

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: theme.sizes.app_bar_mobile,
  [theme.breakpoints.up('xs')]: {
    minHeight: theme.sizes.app_bar_desktop,
    padding: theme.spacing(0, 2),
  },
}))
