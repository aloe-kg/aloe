import { FC } from 'react'
import { Typography } from '@mui/material'

interface PageTitleProps {
  title?: string
  mb?: number
}

export const PageTitle: FC<PageTitleProps> = ({ title = '', ...other }) => {
  return (
    <Typography variant='h1' pl={2} {...other}>
      {title}
    </Typography>
  )
}
