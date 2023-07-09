import { ReactElement, useEffect, useState } from 'react'
import { Breadcrumbs, PageTitle, ProductList } from '@components'
import { IProduct } from '@interfaces'
import { Paper, Typography } from '@mui/material'
import axios from 'axios.config'
import { RootLayout } from 'layouts'
import { NextPageWithLayout } from 'pages/_app'
import { useAppSelector } from 'redux/hooks'

const Favorites: NextPageWithLayout = () => {
  const { favoriteList } = useAppSelector((s) => s.favorite)

  const [favorites, setFavorites] = useState<IProduct[]>([])

  useEffect(() => {
    axios.post('/products/ids/', favoriteList).then(({ data }) => setFavorites(data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favoriteList])

  return (
    <>
      <Breadcrumbs replaceList={{ url_path: 'favorites', name: 'Избранные товары' }} />
      <PageTitle title='Избранные товары' mb={2} />
      {favorites.length > 0 ? (
        <ProductList productList={favorites} />
      ) : (
        <Paper>
          <Typography variant='body1' p={3}>
            На данный момент, у Вас нет товаров в избранном!
          </Typography>
        </Paper>
      )}
    </>
  )
}

Favorites.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout title='Избранные товары'>{page}</RootLayout>
}

export default Favorites
