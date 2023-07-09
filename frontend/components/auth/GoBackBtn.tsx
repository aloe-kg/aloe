import React, { FC } from 'react'
import { ArrowRightAlt } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'

export const GoBackBtn: FC = () => {
  const router = useRouter()

  const goBackHandler = () => {
    router.back()
  }
  return (
    <Typography
      variant='body2'
      sx={{
        display: 'flex',
        color: '#000',
        transition: 'color .3s ease-in-out',
        '&:hover': { color: 'secondary.main' },
        cursor: 'pointer',
        alignItems: 'center',
      }}
      onClick={goBackHandler}
    >
      <ArrowRightAlt
        sx={{
          transform: 'rotate(180deg)',
          marginRight: '10px',
          color: 'inherit',
        }}
      />
      Назад
    </Typography>
  )
}
