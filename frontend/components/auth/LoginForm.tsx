/* eslint-disable no-console */
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Iconify, RHFCheckbox, RHFProvider, RHFTextField } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { ILoginForm } from '@interfaces'
import { LoadingButton } from '@mui/lab'
import { IconButton, InputAdornment, Link, Stack } from '@mui/material'
import { BASE_URL } from 'api'
import axios from 'axios'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { setToken } from 'utils/token'
import * as Yup from 'yup'

export const LoginForm = () => {
  const navigate = useRouter()

  const [showPassword, setShowPassword] = useState(false)

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Адрес эл. почты должен быть действительным')
      .required('Данное поле является обязательным к заполнению')
      .min(6, 'Адрес эл. почты должен быть длиннее или равен 6 символам'),
    password: Yup.string()
      .required('Данное поле является обязательным к заполнению')
      .min(6, 'Пароль должен быть длиннее или равен 6 символам'),
  })

  const defaultValues = {
    email: '',
    password: '',
    remember: true,
  }

  const methods = useForm<ILoginForm>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  })

  const {
    formState: { isSubmitting },
  } = methods

  const onSubmit = async (formData: ILoginForm) => {
    const params = new URLSearchParams()
    params.append('username', formData.email)
    params.append('password', formData.password)

    try {
      const response = await axios.post(`${BASE_URL}/auth/`, params)
      const token = await response.data.token

      if (token) {
        setToken(token)
        navigate.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <RHFProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3}>
        <RHFTextField name='email' label='Почтовый адрес' />

        <RHFTextField
          name='password'
          label='Пароль'
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ my: 2 }}>
        <RHFCheckbox name='remember' label='Запомнить меня' />
        <NextLink href='/' passHref>
          <Link variant='subtitle2' underline='hover'>
            Забыли пароль?
          </Link>
        </NextLink>
      </Stack>

      <LoadingButton
        fullWidth
        size='large'
        type='submit'
        variant='contained'
        loading={isSubmitting}
      >
        Войти
      </LoadingButton>
    </RHFProvider>
  )
}
