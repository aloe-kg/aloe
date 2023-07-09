import { useState } from 'react'
import Carousel from 'react-slick'
import { NavigateBefore, NavigateNext } from '@mui/icons-material'
import { alpha, Box, Button, Paper, styled } from '@mui/material'
import Image from 'next/image'

const imgs = [
  {
    src: 'https://images.hdqwalls.com/download/rick-and-morty-5k-artwork-hy-1280x800.jpg',
  },
  {
    src: 'https://images.hdqwalls.com/download/rick-and-morty-different-dimensions-ab-1280x800.jpg',
  },
]

interface ArrowStyleProps {
  isHovered: boolean
}

export const PromoSlider = () => {
  const [isHovered, setIsHovered] = useState(false)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow isHovered={isHovered} />,
    nextArrow: <NextArrow isHovered={isHovered} />,
  }
  return (
    <PaperStyle onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Carousel {...settings} className='carouselBanner'>
        {imgs.map((img) => (
          <BoxStyle key={img.src}>
            <Image src={img.src} layout='fill' objectFit='cover' alt='promo' />
          </BoxStyle>
        ))}
      </Carousel>
    </PaperStyle>
  )
}

interface ArrowProps {
  onClick?: () => void
  isHovered: boolean
}

function PrevArrow({ onClick, isHovered }: ArrowProps) {
  return (
    <ArrowStyle isHovered={isHovered} onClick={onClick} sx={{ left: 0 }}>
      <NavigateBefore fontSize='inherit' />
    </ArrowStyle>
  )
}

function NextArrow({ onClick, isHovered }: ArrowProps) {
  return (
    <ArrowStyle isHovered={isHovered} onClick={onClick} sx={{ right: 0 }}>
      <NavigateNext fontSize='inherit' />
    </ArrowStyle>
  )
}

const PaperStyle = styled(Paper)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
  },
}))

const BoxStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  position: 'relative',
  aspectRatio: '2 / 1',
  [theme.breakpoints.up('sm')]: {
    aspectRatio: '4 / 1',
  },
}))

const ArrowStyle = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isHovered',
  name: 'ArrowStyleComponent',
  slot: 'Root',
})<ArrowStyleProps>(({ theme, isHovered }) => ({
  position: 'absolute',
  top: 0,
  height: 'calc(100% - 1rem - 1.5rem)',
  width: 70,
  backgroundColor: isHovered ? theme.palette.grey[500_48] : 'transparent',
  zIndex: 1,
  overflow: 'hidden',
  color: isHovered ? alpha('#fff', 0.8) : 'transparent',
  borderRadius: 0,
  fontSize: 100,
  '&:hover': {
    backgroundColor: theme.palette.grey[500_48],
    color: alpha('#fff', 0.8),
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: 150,
  },
}))
