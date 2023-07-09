import { ReactElement, useEffect, useState } from 'react'
import { Breadcrumbs, PageTitle, ProductList } from '@components'
import { IProduct } from '@interfaces'
import { useAppSelector } from '@redux/hooks'
import { BASE_URL } from 'api'
import axios from 'axios'
import { RootLayout } from 'layouts'
import { NextPageWithLayout } from 'pages/_app'

const Search: NextPageWithLayout = () => {
  const { searchValue } = useAppSelector((s) => s.searchBar)

  const [foundItems, setFoundItems] = useState<IProduct[]>([])

  useEffect(() => {
    axios(`${BASE_URL}/products/search/?query=${searchValue}`)
      .then(({ data }) => setFoundItems(data.results))
      // eslint-disable-next-line no-console
      .catch((err) => console.warn(err))
  }, [searchValue])

  return (
    <>
      <Breadcrumbs replaceList={{ url_path: 'search', name: 'Поиск' }} />
      <PageTitle title={`Поиск по запросу: ${searchValue}`} mb={2} />
      <ProductList productList={foundItems} />
    </>
  )
}

Search.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout title='Поиск по запросу:'>{page}</RootLayout>
}

export default Search
