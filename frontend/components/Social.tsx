import React from 'react'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded'
import TelegramIcon from '@mui/icons-material/Telegram'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { styled } from '@mui/material/styles'

const UnorderedList = styled('ul')(({ theme }) => ({
  position: 'sticky',
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3, 2.5),
  listStyle: 'none',
}))

const ListItem = styled('li')(({ theme }) => ({
  borderRadius: '5px',
  margin: theme.spacing(0, 1),
}))

const ItemLink = styled('a')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0.75),
  ':hover': {
    opacity: '0.8',
  },
}))

export const Social = () => {
  return (
    <UnorderedList>
      <ListItem sx={{ bgcolor: '#1890FF' }}>
        <ItemLink href='#' target='_blank'>
          <TelegramIcon htmlColor='#fff' />
        </ItemLink>
      </ListItem>
      <ListItem sx={{ bgcolor: '#54D62C' }}>
        <ItemLink href='#' target='_blank'>
          <WhatsAppIcon htmlColor='#fff' />
        </ItemLink>
      </ListItem>
      <ListItem sx={{ bgcolor: '#ff884d' }}>
        <ItemLink href='#' target='_blank'>
          <MailOutlineIcon htmlColor='#fff' />
        </ItemLink>
      </ListItem>
      <ListItem sx={{ bgcolor: '#2a9540' }}>
        <ItemLink href='tel:+996 706 489928'>
          <PhoneForwardedIcon htmlColor='#fff' />
        </ItemLink>
      </ListItem>
    </UnorderedList>
  )
}
