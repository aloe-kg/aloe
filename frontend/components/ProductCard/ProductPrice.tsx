import { useRef, useState } from 'react'
import { useCart } from '@hooks'
import { Add, AddShoppingCart, Delete, Remove } from '@mui/icons-material'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useAppSelector } from '@redux/hooks'

import s from './ProductCard.module.scss'

interface ProductPriceProps {
  id: number
  price: number
  newPrice: number
}

export const ProductPrice = ({ id, newPrice, price }: ProductPriceProps) => {
  const { cartList } = useAppSelector((s) => s.cart)

  const [chooseAmount, setChooseAmount] = useState<boolean>(false)

  const amount = cartList[id]

  const ref = useRef<HTMLDivElement>(null)

  const { addToCartHandler, incrementHandler, decrementHandler } = useCart({
    id,
    amount,
  })

  const onAddToCart = () => {
    ref.current && ref.current.focus()
    setChooseAmount(true)
    addToCartHandler()
  }

  const onIncrement = () => {
    ref.current && ref.current.focus()
    incrementHandler()
  }

  const onDecrement = () => {
    ref.current && ref.current.focus()
    if (amount === 1) {
      setChooseAmount(false)
    }
    decrementHandler()
  }

  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      height={40}
      columnGap={1}
    >
      <Typography variant='h3' component='p'>
        {newPrice ? newPrice : price}
      </Typography>

      <Box
        tabIndex={0}
        onBlur={() => setChooseAmount(false)}
        sx={{
          display: 'flex',
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        ref={ref}
      >
        {chooseAmount ? (
          <>
            <span></span>
            <div className={s.chooseAmount}>
              <span className={s.btn} onClick={onDecrement}>
                {amount > 1 ? <Remove /> : <Delete />}
              </span>
              <span>{amount}</span>
              <span className={s.btn} onClick={onIncrement}>
                <Add />
              </span>
            </div>
          </>
        ) : (
          <>
            <Typography variant='h3' component='p'>
              сом
            </Typography>
            <Button
              variant={amount ? 'contained' : 'contained'}
              color={amount ? 'primary' : 'secondary'}
              onClick={onAddToCart}
              sx={{
                borderRadius: 4,
                py: 0.5,
                px: 1.5,
                fontSize: '1rem',
                height: 32,
              }}
            >
              {amount || <AddShoppingCart />}
            </Button>
          </>
        )}
      </Box>
    </Stack>
  )
}
