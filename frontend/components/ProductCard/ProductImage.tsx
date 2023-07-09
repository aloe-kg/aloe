import { MouseEventHandler, useEffect, useState } from 'react'
import { IProduct } from '@interfaces'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import { favoriteAdded, favoriteRemoved } from '@redux/favoriteSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import axios from 'axios.config'
import Image from 'next/image'
import Link from 'next/link'
import { getTokenFromCookie } from 'utils/token'

import s from './ProductImage.module.scss'

interface ProductImageProps extends IProduct {
  link: string
}

export const ProductImage = ({ title, link, id, image }: ProductImageProps) => {
  const token = getTokenFromCookie()
  const dispatch = useAppDispatch()

  const { favoriteList } = useAppSelector((s) => s.favorite)

  const [isFavorite, setIsFavorite] = useState(false)

  const addToFavoriteHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    if (isFavorite) {
      if (token) {
        axios.post('/favorites/remove/', { id })
      }
      dispatch(favoriteRemoved(id))
    } else {
      if (token) {
        axios.post('/favorites/add/', { id })
      }
      dispatch(favoriteAdded(id))
    }
    setIsFavorite((prev) => !prev)
  }

  useEffect(() => {
    const isFavorite = favoriteList.find((fav) => fav.id === id)
    setIsFavorite(!!isFavorite)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(favoriteList)])

  return (
    <div className={s.image}>
      <Image src={`${image}`} alt={title} layout='fill' />
      <Link href={link}>
        <a>
          <div className={s.link}>
            <Typography variant='body1' className={s.linkBtn}>
              подробнее
            </Typography>
          </div>
        </a>
      </Link>
      <IconButton className={s.favoriteIcon} onClick={addToFavoriteHandler}>
        {isFavorite ? <Favorite color='primary' /> : <FavoriteBorder color='secondary' />}
      </IconButton>
    </div>
  )
}
