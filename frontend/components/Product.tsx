import { MouseEventHandler, useEffect, useState } from 'react'
import { useCart } from '@hooks'
import { IProduct } from '@interfaces'
import { Add, Delete, Favorite, FavoriteBorder, Remove } from '@mui/icons-material'
import { Box, Button, Grid, IconButton, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
// import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { favoriteAdded, favoriteRemoved } from '@redux/favoriteSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import MuiMarkdown from 'mui-markdown'
import Image from 'next/image'

const FavoriteButton = styled(IconButton)(() => ({
  flexDirection: 'column',
  '&:hover': {
    backgroundColor: 'transparent',
  },
}))

const ChooseAmount = styled('div')(({ theme }) => ({
  minWidth: 185,
  width: '100%',
  height: '100%',
  minHeight: 56,
  padding: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: '100px',
  backgroundColor: '#fff',
  boxShadow: ' 0 2px 8px 0 rgb(0 0 0 / 15%)',
}))

export const Product = (props: IProduct) => {
  const { title, description, id } = props
  const price = Number(props.price)
  const newPrice = Number('')
  const salePrice = Math.trunc((newPrice * 100) / price - 100)

  const dispatch = useAppDispatch()
  const { cartList } = useAppSelector((s) => s.cart)
  const { favoriteList } = useAppSelector((s) => s.favorite)
  const [isFavorite, setIsFavorite] = useState(false)
  const amount = cartList[id]

  const { addToCartHandler, decrementHandler, incrementHandler } = useCart({
    id,
    amount,
  })

  const addToFavoriteHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    if (isFavorite) dispatch(favoriteRemoved(id))
    else dispatch(favoriteAdded(id))
    setIsFavorite((prev) => !prev)
  }

  useEffect(() => {
    const isFavorite = favoriteList.find((fav) => fav.id === id)
    setIsFavorite(!!isFavorite)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Grid container mb={10} spacing={3} p={2}>
        <Grid xs={12} md={5}>
          <Box
            sx={{
              aspectRatio: '1 / 1',
              position: 'relative',
              borderRadius: 0.5,
              overflow: 'hidden',
            }}
          >
            <Image
              src='https://images.hdqwalls.com/download/rick-va-7680x4320.jpg'
              alt='qwe'
              width='100%'
              height='100%'
              layout='responsive'
              objectFit='cover'
            />
          </Box>
        </Grid>
        <Grid xs={12} md={7}>
          <Typography variant='h1' mb={2}>
            {title}
          </Typography>
          <Box mb={2}>
            <Stack direction='row' justifyContent='space-between' alignItems='center' mb={2}>
              <Box>
                {newPrice > 0 && (
                  <Stack direction='row' gap={1} alignItems='center'>
                    <Typography variant='overline' component='p' fontSize={18}>
                      {newPrice}
                    </Typography>
                    <Typography variant='subtitle1' component='p' sx={{ color: 'secondary.main' }}>
                      {salePrice}%
                    </Typography>
                  </Stack>
                )}
                <Typography variant='h2' component='p'>
                  {price} сом
                </Typography>
              </Box>
              <Box>
                {amount ? (
                  <ChooseAmount>
                    <IconButton onClick={decrementHandler}>
                      {amount > 1 ? <Remove /> : <Delete />}
                    </IconButton>
                    <Typography variant='h3' color='text.secondary'>
                      {amount}
                    </Typography>
                    <IconButton onClick={incrementHandler}>
                      <Add />
                    </IconButton>
                  </ChooseAmount>
                ) : (
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={addToCartHandler}
                    sx={{ p: 2, minWidth: 185, minHeight: 56 }}
                  >
                    <Typography variant='button'>Добавить в корзину</Typography>
                  </Button>
                )}
              </Box>
            </Stack>

            <FavoriteButton onClick={addToFavoriteHandler}>
              {isFavorite ? (
                <Favorite color='primary' fontSize='large' />
              ) : (
                <FavoriteBorder color='secondary' fontSize='large' />
              )}
              <Typography textAlign='center' variant='body2'>
                Любимый <br /> товар
              </Typography>
            </FavoriteButton>
          </Box>
          {!!description?.length && (
            <Box>
              <Typography variant='h2' mb={2}>
                Описание
              </Typography>
              <MuiMarkdown>{description}</MuiMarkdown>
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  )
}
