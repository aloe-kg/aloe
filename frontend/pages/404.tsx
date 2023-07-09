import { ReactElement } from 'react'
import { NotFoundCat, NotFoundCatAnim } from '@components'
import { RootLayout } from 'layouts'
import { NextPageWithLayout } from 'pages/_app'
import { isAnimated } from 'settings'

const PageNotFound: NextPageWithLayout = () => {
  return isAnimated ? <NotFoundCatAnim /> : <NotFoundCat />
}

PageNotFound.getLayout = function getLayout(page: ReactElement) {
  return (
    <RootLayout height='100vh' overflow='hidden' title='Page Not Found'>
      {page}
    </RootLayout>
  )
}

export default PageNotFound
