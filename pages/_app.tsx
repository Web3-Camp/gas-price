import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from "next/head";
import { ReactNode,ComponentType,ReactElement } from 'react';
import type { NextPage } from 'next'

export type Page<P = {}> = NextPage<P> & {
  // You can disable whichever you don't need
  getLayout?: (page: ReactElement) => ReactNode
  layout?: ComponentType
}

type IAppProps = AppProps & {
  Component: Page
}

function MyApp({ Component, pageProps }: IAppProps) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page)

  return <>
    <Head>
      <title>Gas Price</title>
      <meta name="description" content="Gas Price" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {getLayout(<Component {...pageProps} />)}
    <link rel="stylesheet" href="https://web3camp.us/globals.css"/>
  </>
}

export default MyApp
