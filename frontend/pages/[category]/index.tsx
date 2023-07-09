import { ReactElement } from 'react'
import { Breadcrumbs, PageTitle, Slider } from '@components'
import { ICategory, IProductsByCategory } from '@interfaces'
import { BASE_URL } from 'api'
import axios from 'axios'
import { RootLayout } from 'layouts'
import { loadCategories } from 'lib/fetchCategories'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import type { NextPageWithLayout } from 'pages/_app'

export const getStaticProps: GetStaticProps = async (context) => {
  const { categories, subcategories } = await loadCategories()

  // получаем родительскую категорию
  const category = categories.find((c: ICategory) => c.url_path === context.params?.category)

  // получаем массив дочерних категорий
  const arr = subcategories
    .filter(({ parent }) => parent === category?.id)
    .map(({ id }) => ({
      id,
    }))

  const productsByCategory = await (await axios.post(`${BASE_URL}/categories/products`, arr)).data
    .filter((el: IProductsByCategory) => el.ten_products.length > 0)
    .sort((a: ICategory, b: ICategory) => (a.name > b.name ? 1 : -1))

  return {
    props: {
      productsByCategory,
      category,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const { categories } = await loadCategories()

  // const paths = categories.map(({ url_path }) => ({
  //   params: {
  //     category: url_path,
  //   },
  // }))

  return {
    paths: [],
    fallback: true,
  }
}

const Category: NextPageWithLayout = ({
  productsByCategory,
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Breadcrumbs />
      <PageTitle title={category?.name} mb={2} />
      {productsByCategory?.map((el: IProductsByCategory, index: number) => (
        <Slider
          title={el.name}
          route={`/${category.url_path}/${el.url_path}`}
          productList={el.ten_products}
          key={index + el.name + el.url_path}
        />
      ))}
    </>
  )
}

Category.getLayout = function getLayout(page: ReactElement) {
  const title = page.props.category?.name
  const meta_description = page.props.category?.description || title
  const meta_keyword = page.props.category?.description || title

  return (
    <RootLayout title={title} meta_description={meta_description} meta_keyword={meta_keyword}>
      {page}
    </RootLayout>
  )
}

export default Category
