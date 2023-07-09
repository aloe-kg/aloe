import React, { FC } from 'react'
import { GoBackBtn } from '@components'
import { useResponsive } from '@hooks'
import { Link, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { LogotypeIcon } from 'assets/icons'
import NextLink from 'next/link'

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(7, 2, 0),
  },
}))

const LogoStyle = styled('div')(({ theme }) => ({
  maxWidth: 464,
  width: 'auto',
  [theme.breakpoints.up('md')]: {
    width: '100%',
    alignItems: 'flex-start',
    padding: theme.spacing(0, 3, 0),
  },
}))

interface AuthHeaderProps {
  questionText: 'Есть аккаунт?' | 'Нет аккаунта?'
  href: '/login' | '/register'
  linkText: 'Войти' | 'Зарегистрироваться'
}

export const AuthHeader: FC<AuthHeaderProps> = ({ questionText, href, linkText }) => {
  const smUp = useResponsive('up', 'sm')

  return (
    <HeaderStyle>
      <LogoStyle>
        <LogotypeIcon />
      </LogoStyle>
      {smUp && (
        <Stack direction='row' justifyContent='space-between' width='100%' p={2}>
          <GoBackBtn />
          <Typography variant='body2'>
            {questionText}{' '}
            <NextLink href={href} passHref>
              <Link variant='subtitle2'>{linkText}</Link>
            </NextLink>
          </Typography>
        </Stack>
      )}
    </HeaderStyle>
  )
}
