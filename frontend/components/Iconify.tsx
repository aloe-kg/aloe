import { FC } from 'react'
import { Icon } from '@iconify/react'
import { Box } from '@mui/material'

interface IconifyProps {
  icon: any
  sx?: any
  width?: number
  height?: number
}

export const Iconify: FC<IconifyProps> = ({ icon, sx, ...other }) => {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />
}
