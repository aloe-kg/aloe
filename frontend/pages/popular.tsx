import { ReactElement } from 'react'
import { Breadcrumbs, InfiniteProductList, PageTitle } from '@components'
import { BASE_URL } from 'api'
import axios from 'axios'
import { RootLayout } from 'layouts'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { NextPageWithLayout } from 'pages/_app'

export const getStaticProps: GetStaticProps = async () => {
  const popularProducts = await (await axios(`${BASE_URL}/products/popular?limit=50`)).data

  return {
    props: {
      popularProducts,
    },
  }
}

const PopularProducts: NextPageWithLayout = ({
  popularProducts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Breadcrumbs replaceList={{ url_path: 'popular', name: 'Популярное' }} />
      <PageTitle title='Популярное' mb={2} />
      <InfiniteProductList data={popularProducts} />
    </>
  )
}

PopularProducts.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>
}

export default PopularProducts
