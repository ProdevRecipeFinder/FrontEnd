import type { NextPage }  from 'next'
import React              from 'react'
import Head               from 'next/head'

const Home: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
        <meta name="description" content="Recipe Finder Home" />
      </Head>
    </React.Fragment>
  )
}

export default Home
