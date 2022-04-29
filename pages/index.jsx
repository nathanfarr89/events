import Head from 'next/head'
import MonthTable from '../components/MonthTable'
import Container from 'react-bootstrap/Container'
import Navbar from '../components/Navbar'
import Button from 'react-bootstrap/Button'
import { useQuery, gql } from '@apollo/client'

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`

const GET_EVENTS = gql`
  query EventFeed($cursor: String) {
    eventFeed(cursor: $cursor) {
      cursor
      hasNextPage
      events {
        id
        name
        type
        release
      }
    }
  }
`

export default function Home() {
  const { data, loading, error, fetchMore } = useQuery(GET_EVENTS);
  const { data: loggedInStatus, client } = useQuery(IS_LOGGED_IN);

  if (loading) return <p>Loading...</p>

  if (error) return <p>Error!</p>

  return (
    <div className="flex flex-col min-h-screen py-2">
      <Head>
        <title>Upcoming Events</title>
      </Head>

      <Container>
        <Navbar />
        
        {loggedInStatus.isLoggedIn && <MonthTable data={data.eventFeed} />}
        {data.eventFeed.hasNextPage && loggedInStatus.isLoggedIn && (
          <Button
            variant="primary"
            onClick={() =>
              fetchMore({
                variables: {
                  cursor: data.eventFeed.cursor
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                  return {
                    eventFeed: {
                      cursor: fetchMoreResult.eventFeed.cursor,
                      hasNextPage: fetchMoreResult.eventFeed.hasNextPage,
                      events: [
                        ...previousResult.eventFeed.events,
                        ...fetchMoreResult.eventFeed.events
                      ],
                      _typename: 'EventFeed'
                    }
                  }
                }
              })
            }
          >
            Load more
          </Button>
        )}
      </Container>
      
    </div>
  )
}
