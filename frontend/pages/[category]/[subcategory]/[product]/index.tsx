import { ReactElement } from 'react'
import { IProduct } from '@interfaces'
import { BASE_URL } from 'api'
import axios from 'axios'
import { RootLayout } from 'layouts'
import { loadCategories } from 'lib/fetchCategories'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import type { NextPageWithLayout } from 'pages/_app'

import { Breadcrumbs, Product as ProductView, Slider } from 'components'

export const getStaticProps: GetStaticProps = async (context) => {
  const product: IProduct = await (
    await axios(`${BASE_URL}/products/${context.params?.product}`)
  ).data

  const { subcategories } = await loadCategories()

  const subcategoryId = await subcategories.find((el) => el.id === product.category)?.id

  const subcategoryForSlider = await (
    await axios.post(`${BASE_URL}/categories/products`, [{ id: subcategoryId }])
  ).data[0]

  return {
    props: {
      product,
      subcategoryForSlider,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { categories, subcategories } = await loadCategories()
  const productsCount = await (await axios(`${BASE_URL}/products/?limit=1`)).data.count

  const fetchedProducts = await (await axios(`${BASE_URL}/products`)).data.results

  const paths = await fetchedProducts.map((product: IProduct) => {
    const category = categories.find((category) => category.id === product?.root_category)?.url_path

    const subcategory =
      subcategories.find((subcategory) => subcategory.id === product?.category)?.url_path ||
      'subcategory'

    return {
      params: {
        category,
        subcategory,
        product: product.id.toString(),
      },
    }
  })

  return {
    paths: [],
    fallback: true,
  }
}

const Product: NextPageWithLayout = ({
  product,
  subcategoryForSlider,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {
    query: { category, subcategory },
  } = useRouter()

  return (
    <>
      <Breadcrumbs replaceList={{ url_path: product?.id, name: product?.title }} />
      <ProductView {...product} />
      <Slider
        title={subcategoryForSlider?.name}
        route={`/${category}/${subcategory}`}
        productList={subcategoryForSlider?.ten_products}
        key={subcategoryForSlider?.name + subcategoryForSlider?.url_path}
      />
    </>
  )
}

Product.getLayout = function getLayout(page: ReactElement) {
  const title = page.props?.product?.title
  const meta_description = page.props?.product?.meta_description || title
  const meta_keyword = page.props?.product?.meta_keyword || title

  return (
    <RootLayout title={title} meta_keyword={meta_keyword} meta_description={meta_description}>
      {page}
    </RootLayout>
  )
}

export default Product
