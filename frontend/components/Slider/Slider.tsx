import { useEffect, useState } from 'react'
import Carousel from 'react-slick'
import { ProductCard } from '@components'
import { useResponsive, useWindowDimensions } from '@hooks'
import { IProduct } from '@interfaces'
import { NavigateBefore, NavigateNext } from '@mui/icons-material'
import { Box, Button, IconButton, Paper, Stack, styled, Typography } from '@mui/material'
import { mediaLg, mediaMd, mediaSm, mediaXl } from '@styles/variables'
import cn from 'clsx'
import Link from 'next/link'

import s from './Slider.module.scss'

type SliderProps = {
  title: string
  route: string
  productList: IProduct[]
}

export const Slider = ({ title, productList, route }: SliderProps) => {
  const [prevDisabled, setPrevDisabled] = useState(true)
  const [nextDisabled, setNextDisabled] = useState(false)
  const [slidesToShow, setSlidesToShow] = useState(2)
  const { width } = useWindowDimensions()

  useEffect(() => {
    switch (true) {
      case width > mediaXl:
        setSlidesToShow(5)
        break
      case width > mediaLg:
        setSlidesToShow(4)
        break
      case width > mediaMd:
        setSlidesToShow(3)
        break
      case width > mediaSm:
        setSlidesToShow(2)
        break
      default:
        setSlidesToShow(2)
    }
  }, [width])

  const settings = {
    slidesToShow: slidesToShow,
    infinite: false,
    beforeChange: function (_: number, currentSlide: number) {
      setPrevDisabled(currentSlide === 0)
      setNextDisabled(currentSlide + settings.slidesToShow === productList.length + 1)
    },
    prevArrow: <PrevArrow disabled={prevDisabled} />,
    nextArrow: <NextArrow disabled={nextDisabled} />,
    setNextDisabled: true,
  }

  const smUp = useResponsive('up', 'sm')

  return (
    <Paper sx={{ mb: 3 }}>
      <Box position='relative' overflow='hidden'>
        <Stack direction='row' alignItems='center' justifyContent='space-between' p={3}>
          <Typography variant='h2'>{title}</Typography>
          <Link href={route}>
            <a>
              <Typography variant='body1' sx={{ color: 'primary.main', whiteSpace: 'nowrap' }}>
                {'Посмотреть все >'}
              </Typography>
            </a>
          </Link>
        </Stack>
        {smUp ? (
          <Box p={3}>
            <Carousel className='carousel' {...settings}>
              {productList?.map((product) => (
                <ProductCard {...product} key={product.id} />
              ))}

              <div className={s.lookMoreBtn}>
                <Button color='secondary' variant='contained'>
                  <Link href={route}>
                    <Typography variant='body2'>{'Посмотреть все товары раздела >'}</Typography>
                  </Link>
                </Button>
              </div>
            </Carousel>
          </Box>
        ) : (
          <ProductListStyle>
            {productList?.map((product) => (
              <ProductCardStyle key={product.id}>
                <ProductCard {...product} />
              </ProductCardStyle>
            ))}

            <div className={s.lookMoreBtn}>
              <Button color='secondary' variant='contained'>
                <Link href={route}>
                  <Typography variant='body2'>{'Посмотреть все товары раздела >'}</Typography>
                </Link>
              </Button>
            </div>
          </ProductListStyle>
        )}
      </Box>
    </Paper>
  )
}

function PrevArrow({ onClick, disabled }: any) {
  return (
    <IconButton
      className={cn(s.prevArrow, {
        [s.disabled]: disabled,
      })}
      onClick={onClick}
    >
      <NavigateBefore />
    </IconButton>
  )
}

function NextArrow({ onClick, disabled }: any) {
  return (
    <IconButton
      className={cn(s.nextArrow, {
        [s.disabled]: disabled,
      })}
      onClick={onClick}
    >
      <NavigateNext />
    </IconButton>
  )
}

const ProductListStyle = styled(Box)({
  display: 'flex',
  flexWrap: 'nowrap',
  overflowX: 'auto',
  position: 'relative',
})

const ProductCardStyle = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    flexShrink: 0,
    width: 'calc(100% / 2 - 24px)',
  },
}))
