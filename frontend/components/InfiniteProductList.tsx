import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ProductCard } from '@components'
import { IProduct } from '@interfaces'
// import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { Grid } from '@mui/material'
import { BASE_URL } from 'api'
import axios from 'axios'
import { useRouter } from 'next/router'

interface ProductListProps {
  data: {
    results: IProduct[]
    next: null | string
    previous: null | string
    count: number
  }
  selectedBrands?: {
    name: string
    toggled: boolean
  }[]
}

export const InfiniteProductList = ({ data, selectedBrands = [] }: ProductListProps) => {
  const [productList, setProductList] = useState<IProduct[]>(data?.results || [])
  const [hasMore, setHasMore] = useState(!!data?.next)

  const { asPath } = useRouter()

  const brandsQuery = selectedBrands?.filter((el) => el.toggled)

  const getMoreProducts = async () => {
    let response

    if (brandsQuery.length > 0) {
      response = await await axios({
        method: 'post',
        url: `${BASE_URL}/categories${asPath}?limit=20&offset=${productList.length}/`,
        data: brandsQuery,
      })
      return
    }
    if (asPath.includes('popular') || asPath.includes('new')) {
      response = await (
        await axios(`${BASE_URL}/products${asPath}/?limit=20&offset=${productList.length}`)
      ).data
    } else {
      response = await (
        await axios(`${BASE_URL}/categories${asPath}?limit=20&offset=${productList.length}`)
      ).data
    }

    const fetchedProductList = response.results

    if (fetchedProductList) setProductList((product) => [...product, ...fetchedProductList])
    setHasMore(!!response.next)
  }

  useEffect(() => {
    setProductList(data?.results)
  }, [data?.results])

  useEffect(() => {
    setHasMore(!!data?.next)
  }, [data?.next])

  return (
    <InfiniteScroll
      dataLength={productList?.length}
      next={getMoreProducts}
      hasMore={hasMore}
      loader={''}
    >
      <Grid container>
        {productList?.map((product) => (
          <Grid xs={6} sm={4} md={3} lg={2.4} xl={2} key={product.id}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  )
}
