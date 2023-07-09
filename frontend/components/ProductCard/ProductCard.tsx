import { useGetProductLink } from '@hooks'
import { IProduct } from '@interfaces'
import { Box, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from 'next/link'

import { ProductImage } from './ProductImage'
import { ProductPrice } from './ProductPrice'

import s from './ProductCard.module.scss'

const ProductCardStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2, 2, 3),
  height: '100%',
}))

export const ProductCard = (props: IProduct) => {
  const { id, title, root_category, category } = props
  const price = Number(props.price)
  const newPrice = Number(null)

  const salePrice = newPrice && Math.trunc((newPrice * 100) / price - 100)

  const link = useGetProductLink({
    root_category,
    category,
    id,
  })

  return (
    <ProductCardStyle>
      <ProductImage link={link} {...props} />
      <Stack gap={2} justifyContent='space-between' flex={1}>
        <Typography variant='body2'>
          <Link href={link}>
            <a className={s.title}>{title}</a>
          </Link>
        </Typography>
        <Stack>
          {newPrice > 0 && (
            <Stack direction='row' gap={1} alignItems='center'>
              <Typography variant='overline' component='p'>
                {price}
              </Typography>
              <Typography variant='subtitle2' component='p' sx={{ color: 'secondary.main' }}>
                {salePrice}%
              </Typography>
            </Stack>
          )}
          <ProductPrice price={price} newPrice={newPrice} id={id} />
        </Stack>
      </Stack>
    </ProductCardStyle>
  )
}
