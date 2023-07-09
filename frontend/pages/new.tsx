import { ReactElement } from 'react'
import { BASE_URL } from 'api'
import axios from 'axios'
import { RootLayout } from 'layouts'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { NextPageWithLayout } from 'pages/_app'

import { Breadcrumbs, InfiniteProductList, PageTitle } from 'components'

export const getStaticProps: GetStaticProps = async () => {
  const newProducts = await (await axios(`${BASE_URL}/products/new?limit=50`)).data

  return {
    props: {
      newProducts,
    },
  }
}

const NewProducts: NextPageWithLayout = ({
  newProducts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Breadcrumbs replaceList={{ url_path: 'new', name: 'Новинки' }} />
      <PageTitle title='Новинки' mb={2} />
      <InfiniteProductList data={newProducts} />
    </>
  )
}

NewProducts.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>
}

export default NewProducts
