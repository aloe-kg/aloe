import { ReactElement } from 'react'
import { AuthHeader, RegisterFemale, RegisterFemaleAnim, RegisterForm } from '@components'
import { useResponsive } from '@hooks'
import { LockOutlined } from '@mui/icons-material'
import { Avatar, Card, Container, Link, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Page } from 'layouts/Page'
import NextLink from 'next/link'
import { NextPageWithLayout } from 'pages/_app'
import { isAnimated } from 'settings'

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}))

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}))

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}))

const Register: NextPageWithLayout = () => {
  const smUp = useResponsive('up', 'sm')
  const mdUp = useResponsive('up', 'md')

  return (
    <RootStyle>
      <AuthHeader questionText='Есть аккаунт?' linkText='Войти' href='/login' />

      {mdUp && (
        <SectionStyle>{isAnimated ? <RegisterFemaleAnim /> : <RegisterFemale />}</SectionStyle>
      )}

      <Container>
        <ContentStyle>
          <Avatar sx={{ bgcolor: 'primary.main', mb: 1, mx: 'auto' }}>
            <LockOutlined />
          </Avatar>
          <Typography variant='h1' textAlign='center' mb={3}>
            Регистрация
          </Typography>

          <RegisterForm />

          {!smUp && (
            <Typography variant='body2' sx={{ mt: 3, textAlign: 'center' }}>
              Есть аккаунт?{' '}
              <NextLink href='/login' passHref>
                <Link variant='subtitle2'>Войти</Link>
              </NextLink>
            </Typography>
          )}
        </ContentStyle>
      </Container>
    </RootStyle>
  )
}

Register.getLayout = function getLayout(page: ReactElement) {
  return <Page title='Регистрация'>{page}</Page>
}

export default Register
