import { ReactElement } from 'react'
import { HistoryOrder, UserProfile } from '@components'
import { RootLayout } from 'layouts'
import { NextPageWithLayout } from 'pages/_app'

const UserAccount: NextPageWithLayout = () => {
  return (
    <div className='h-screen'>
      <UserProfile />
      <HistoryOrder />
    </div>
  )
}

UserAccount.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>
}

export default UserAccount
