import type { NextPage }  from 'next'
import React              from 'react'
import Head               from 'next/head'

import { gql, useQuery }  from '@apollo/client'
import { initializeApollo } from '../utils/apollo'

const testQuery = gql`
  query {
    countries {
      name
      code
    }
  }
`
interface Props {
  initialApolloState: any
}

const Home: NextPage<Props> = ({initialApolloState}) => {
  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
        <meta name="description" content="Recipe Finder Home" />
      </Head>

      {JSON.stringify(initialApolloState, null, 2)}

    </React.Fragment>
  )
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo()
  await apolloClient.query({
    query: testQuery
  })
  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    }
  }
}

export default Home
