import { useCart, useGetProductLink } from '@hooks'
import { Add, Delete, Remove } from '@mui/icons-material'
import { Box, IconButton, ListItem, Paper, Typography } from '@mui/material'
import { cartToggled } from '@redux/cartSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import Image from 'next/image'
import Link from 'next/link'

interface ProductProps {
  id: number
  title: string
  price: string
  image: string
  root_category: number
  category: number
}

export const CartItem = ({ title, id, root_category, category, ...props }: ProductProps) => {
  const dispatch = useAppDispatch()

  const { cartList } = useAppSelector((s) => s.cart)
  const amount = cartList[id]

  const price = Number(props.price)
  const newPrice = Number(null)

  const link = useGetProductLink({
    category,
    root_category,
    id,
  })

  const cartProductOpened = () => {
    dispatch(cartToggled(false))
  }

  const { incrementHandler, decrementHandler, removeHandler } = useCart({
    id,
    amount,
  })

  if (!amount) return null

  return (
    <ListItem disablePadding>
      <Paper elevation={1} sx={{ width: '100%' }}>
        <Box display='flex' alignItems='center' py={1}>
          <Box width={60} mr={1} display='flex' alignItems='center' justifyContent='center'>
            <Link href={link}>
              <a onClick={cartProductOpened}>
                <Image
                  src={'https://images.hdqwalls.com/download/desert-sea-sand-4k-d5-320x480.jpg'}
                  alt={title}
                  width='100%'
                  height='100%'
                  objectFit='contain'
                />
              </a>
            </Link>
          </Box>
          <Box flex={1}>
            <Typography variant='body1'>
              <Link href={link}>
                <a onClick={cartProductOpened}>{title}</a>
              </Link>
            </Typography>
            <Typography variant='subtitle1'>
              {newPrice ? newPrice * +amount : +price * +amount} сом
            </Typography>
          </Box>
          <Box display='flex' alignItems='center' columnGap={1}>
            <IconButton onClick={decrementHandler} color='primary'>
              <Remove />
            </IconButton>
            <Typography variant='subtitle1'>{+amount}</Typography>
            <IconButton onClick={incrementHandler} color='primary'>
              <Add />
            </IconButton>
          </Box>
          <IconButton onClick={removeHandler} color='error'>
            <Delete />
          </IconButton>
        </Box>
      </Paper>
    </ListItem>
  )
}
