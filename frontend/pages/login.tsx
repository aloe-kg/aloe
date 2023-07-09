import { ReactElement } from 'react'
import { useResponsive } from '@hooks'
import { LockOutlined } from '@mui/icons-material'
import { Avatar, Card, Container, Link, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Page } from 'layouts/Page'
import NextLink from 'next/link'
import { NextPageWithLayout } from 'pages/_app'
import { isAnimated } from 'settings'

import { AuthHeader, LoginFemale, LoginFemaleAnim, LoginForm } from 'components'

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}))

const SectionStyle = styled(Card)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}))

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  minHeight: '100vh',
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}))

const Login: NextPageWithLayout = () => {
  const smUp = useResponsive('up', 'sm')
  const mdUp = useResponsive('up', 'md')

  return (
    <RootStyle>
      <AuthHeader questionText='Нет аккаунта?' linkText='Зарегистрироваться' href='/register' />

      {mdUp && <SectionStyle>{isAnimated ? <LoginFemaleAnim /> : <LoginFemale />}</SectionStyle>}

      <Container maxWidth='sm'>
        <ContentStyle>
          <Avatar sx={{ bgcolor: 'primary.main', mb: 1, mx: 'auto' }}>
            <LockOutlined />
          </Avatar>
          <Typography variant='h1' textAlign='center' mb={3}>
            Личный кабинет
          </Typography>

          <LoginForm />

          {!smUp && (
            <Typography variant='body2' sx={{ mt: 3, textAlign: 'center' }}>
              Нет аккаунта?{' '}
              <NextLink href='/register' passHref>
                <Link variant='subtitle2'>Зарегистрироваться</Link>
              </NextLink>
            </Typography>
          )}
        </ContentStyle>
      </Container>
    </RootStyle>
  )
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <Page title='Вход'>{page}</Page>
}

export default Login
