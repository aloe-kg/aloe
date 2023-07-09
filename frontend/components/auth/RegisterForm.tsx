import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Iconify, RHFProvider, RHFTextField } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { IRegisterForm } from '@interfaces'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { LoadingButton } from '@mui/lab'
import { IconButton, InputAdornment, Link, Modal, Stack, Typography } from '@mui/material'
import { BASE_URL } from 'api'
import axios from 'axios'
import NextLink from 'next/link'
import { setToken } from 'utils/token'
import * as Yup from 'yup'

const RegisterSchema = Yup.object().shape({
  firstname: Yup.string()
    .required('Данное поле является обязательным к заполнению')
    .min(2, 'Имя должно быть длиннее или равно 2 символам'),
  lastname: Yup.string()
    .required('Данное поле является обязательным к заполнению')
    .min(2, 'Фамилия должна быть длиннее или равна 2 символам'),
  email: Yup.string()
    .email('Адрес эл. почты должен быть действительным')
    .required('Данное поле является обязательным к заполнению')
    .min(6, 'Логин должен быть длиннее или равен 6 символам'),
  password: Yup.string()
    .required('Данное поле является обязательным к заполнению')
    .min(6, 'Пароль должен быть длиннее или равен 6 символам')
    .max(32),
  confirmPassword: Yup.string()
    .required('Данное поле является обязательным к заполнению')
    .min(6, 'Пароль должен быть длиннее или равен 6 символам')
    .max(32)
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
})

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  py: 3,
  px: 4,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
}

export const RegisterForm = () => {
  const [isRegistered, setIsRegistered] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [loading, setLoading] = useState(false)

  const defaultValues = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  const methods = useForm<IRegisterForm>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  })

  const onSubmit = async (formData: IRegisterForm) => {
    setLoading(true)
    const data = {
      user: {
        first_name: formData.firstname,
        last_name: formData.lastname,
        email: formData.email,
        password: formData.password,
      },
    }

    try {
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/register/`,
        headers: { 'content-type': 'application/json' },
        data,
      })
      const token = await response.data.token

      if (token) {
        setToken(token)
        setIsRegistered(true)
      }
    } catch (error: any) {
      if (error?.response?.data?.user?.email?.[0]) {
        methods.setError('email', {
          message: 'Этот почтовый адрес уже используется',
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Modal open={isRegistered} onClose={() => setIsRegistered(false)} disableAutoFocus>
        <Stack sx={style}>
          <CheckCircleOutlineIcon sx={{ fontSize: 100, color: 'primary.main', mb: 2 }} />
          <Typography variant='h3' component='h2' mb={1}>
            Регистрация прошла успешно!
          </Typography>

          <NextLink href='/' passHref>
            <Link variant='subtitle1'>Продолжить</Link>
          </NextLink>
        </Stack>
      </Modal>

      <RHFProvider methods={methods} onSubmit={onSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <RHFTextField name='firstname' label='Имя' />
            <RHFTextField name='lastname' label='Фамилия' />
          </Stack>

          <RHFTextField name='email' label='Почтовый адрес' />

          <RHFTextField
            name='password'
            label='Пароль'
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton edge='end' onClick={() => setShowPassword(!showPassword)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <RHFTextField
            name='confirmPassword'
            label='Подтвердите пароль'
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton edge='end' onClick={() => setShowPassword(!showPassword)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton fullWidth size='large' type='submit' variant='contained' loading={loading}>
            Зарегистрироваться
          </LoadingButton>
        </Stack>
      </RHFProvider>
    </>
  )
}
