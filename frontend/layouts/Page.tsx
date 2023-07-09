import { PropsWithChildren } from 'react'
import Head from 'next/head'

interface PageProps {
  title?: string
}

export const Page = ({ children, ...other }: PropsWithChildren<PageProps>) => {
  const { title = 'Aloe' } = other

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </>
  )
}
