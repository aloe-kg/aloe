/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { IProduct } from '@interfaces'
import { Box, Drawer, IconButton, List, Paper, Typography } from '@mui/material'
import { cartFetched, cartToggled } from '@redux/cartSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { formatCurrency } from '@utils'
import axios from 'axios.config'
import { getTokenFromCookie } from 'utils/token'

import { CartItem } from './CartItem'

import s from './Cart.module.scss'

export const Cart = () => {
  const token = getTokenFromCookie()

  const dispatch = useAppDispatch()
  const { cartList, isOpened } = useAppSelector((s) => s.cart)

  const [products, setProducts] = useState<IProduct[]>([])

  const cartListArr = Object.entries(cartList).map((el) => ({ id: el[0], amount: el[1] }))

  const total = cartListArr.reduce((acc, rec) => {
    const item = products.find((el) => +el.id === +rec.id)!
    return acc + (+item?.price || 0) * rec.amount
  }, 0)

  const onCLose = () => {
    dispatch(cartToggled(false))
  }

  useEffect(() => {
    if (!isOpened) return

    if (token) {
      axios('/cart').then(({ data }) => {
        const cartList = data.results.reduce((acc: any, rec: any) => {
          return { ...acc, [rec.product]: rec.quantity }
        }, {})
        dispatch(cartFetched(cartList))
      })
    }

    const idProduct = Object.keys(cartList)

    const arrForSubmit = idProduct.map((el) => ({
      id: +el,
    }))

    if (arrForSubmit.length) {
      axios.post('/products/ids/', arrForSubmit).then(({ data }) => setProducts(data))
    }
  }, [isOpened, token])

  return (
    <Drawer anchor='right' open={isOpened} onClose={onCLose}>
      <div className={s.cart} onClick={(e) => e.stopPropagation()}>
        <Paper sx={{ p: 2, position: 'relative' }}>
          <Typography variant='h2' align='center'>
            Моя корзина
          </Typography>
          <IconButton className={s.closeBtn} onClick={onCLose}>
            <IoClose fontSize={24} />
          </IconButton>
        </Paper>
        <Box py={2}>
          {total > 0 && (
            <Typography variant='h3' align='right' py={1} px={2}>
              Итог: {formatCurrency(total)} сом
            </Typography>
          )}
          <List
            disablePadding
            sx={{
              px: 1,
              display: 'flex',
              flexDirection: 'column',
              rowGap: 1,
            }}
          >
            {products.map((product) => (
              <CartItem {...product} key={product.id} />
            ))}
          </List>
        </Box>
        <div className={s.footer}></div>
      </div>
    </Drawer>
  )
}
