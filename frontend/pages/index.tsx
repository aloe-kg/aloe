import { ReactElement } from 'react'
import { Slider } from '@components'
import { PromoSlider } from '@components'
import { ICategory, IProduct, IProductsByCategory } from '@interfaces'
import { BASE_URL } from 'api'
import axios from 'axios'
import { RootLayout } from 'layouts'
import { loadCategories } from 'lib/fetchCategories'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'

import type { NextPageWithLayout } from './_app'

export const getStaticProps: GetStaticProps = async () => {
  const { categories } = await loadCategories()

  const arr = categories.map(({ id }) => ({ id }))

  const productsByCategory = await (await axios.post(`${BASE_URL}/categories/products`, arr)).data
    .filter((el: IProductsByCategory) => el.ten_products.length > 0)
    .sort((a: ICategory, b: ICategory) => (a.name > b.name ? 1 : -1))

  const popularProducts: ICategory[] = await (
    await axios(`${BASE_URL}/products/popular?limit=10`)
  ).data.results

  const newProducts: ICategory[] = await (
    await axios(`${BASE_URL}/products/new?limit=10`)
  ).data.results

  return {
    props: {
      popularProducts,
      newProducts,
      productsByCategory,
    },
  }
}

interface CategoryProduct {
  name: string
  ten_products: IProduct[]
  url_path: string
}

const Home: NextPageWithLayout = ({
  popularProducts,
  newProducts,
  productsByCategory,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <PromoSlider />
      <Slider title='Популярное' route='/popular' productList={popularProducts} />
      <Slider title='Новинки' route='/new' productList={newProducts} />
      {productsByCategory.map((el: CategoryProduct, index: number) => (
        <Slider
          title={el.name}
          route={`/${el.url_path}`}
          productList={el.ten_products}
          key={index + el.name + el.url_path}
        />
      ))}
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout {...page}>{page}</RootLayout>
}

export default Home
