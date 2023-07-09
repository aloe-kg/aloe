import { ReactElement, useEffect, useMemo, useState } from 'react'
import { ICategory, IProduct } from '@interfaces'
import { Pagination, Stack } from '@mui/material'
import { BASE_URL } from 'api'
import axios from 'axios'
import { RootLayout } from 'layouts'
import { loadCategories } from 'lib/fetchCategories'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import type { NextPageWithLayout } from 'pages/_app'

import { Breadcrumbs, PageTitle, ProductList } from 'components'
import { FilterByBrands } from 'components/FilterByBrands'
import { NextSubcategory } from 'components/NextSubcategory'

export const getStaticProps: GetStaticProps = async (context) => {
  const { subcategories } = await loadCategories()

  const subcategory = subcategories.find(
    (c: ICategory) => c.url_path === context.params?.subcategory
  )

  return {
    props: {
      subcategory,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const { categories, subcategories } = await loadCategories()

  // const paths = subcategories.map(({ parent, url_path }) => {
  //   return {
  //     params: {
  //       category: categories.find(({ id }) => id === parent)?.url_path,
  //       subcategory: url_path,
  //     },
  //   }
  // })

  return {
    paths: [],
    fallback: true,
  }
}

interface Brand {
  name: string
  toggled: boolean
}

const SubCategory: NextPageWithLayout = ({
  subcategory,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { asPath } = useRouter()

  const updatedBrands = subcategory?.brands?.map((el: any) => ({
    ...el,
    toggled: false,
  }))

  const [brands, setBrands] = useState<Brand[] | []>(updatedBrands)

  const selectedBrands = useMemo(() => {
    return brands?.filter((brand) => brand.toggled)
  }, [brands])

  const [productList, setProductList] = useState<IProduct[]>([])
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 20,
  })

  const offset = (meta.page - 1) * meta.limit

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setMeta((prev) => ({ ...prev, page: value }))
  }

  const fetchProductList = () => {
    axios(`${BASE_URL}/categories${asPath}?limit=${meta.limit}&offset=${offset}`).then(
      ({ data }) => {
        setProductList(data.results)
        setMeta((prev) => ({ ...prev, total: data.count }))
      }
    )
  }

  const fetchProductListByBrands = () => {
    axios
      .post(
        `${BASE_URL}/categories${asPath}/by_brands/?limit=${meta.limit}&offset=${offset}`,
        selectedBrands
      )
      .then(({ data }) => {
        setProductList(data.results)
        setMeta((prev) => ({ ...prev, total: data.count }))
      })
  }

  useEffect(() => {
    setMeta((prev) => ({ ...prev, page: 1 }))
  }, [selectedBrands?.length])

  useEffect(() => {
    if (selectedBrands?.length > 0) {
      fetchProductListByBrands()
    } else {
      fetchProductList()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBrands, meta.page])

  return (
    <>
      <Breadcrumbs />
      <FilterByBrands brands={brands} setBrands={setBrands} setMeta={setMeta} />
      <PageTitle title={subcategory?.name} />

      <ProductList productList={productList} />
      <Stack alignItems='center'>
        <Pagination
          count={Math.ceil(meta.total / meta.limit)}
          page={meta.page}
          onChange={handleChange}
          showFirstButton
          showLastButton
        />
      </Stack>
      <NextSubcategory />
    </>
  )
}

SubCategory.getLayout = function getLayout(page: ReactElement) {
  const title = page.props?.subcategory?.name
  const meta_description = page.props?.subcategory?.description || title
  const meta_keyword = page.props?.subcategory?.description || title
  return (
    <RootLayout title={title} meta_description={meta_description} meta_keyword={meta_keyword}>
      {page}
    </RootLayout>
  )
}

export default SubCategory
