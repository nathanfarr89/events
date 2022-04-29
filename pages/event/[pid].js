import { useRouter } from "next/router";
import Link from 'next/link'
import { useQuery, gql } from '@apollo/client'
import Card from 'react-bootstrap/Card'

const GET_EVENT = gql`
  query event($id:ID!) {
    event(id: $id) {
      id
      name
      type
      release
    }
  } 
`;

const Event = () => {
  const router = useRouter()
  const { pid } = router.query
  const { loading, error, data } = useQuery(GET_EVENT, { variables: { id: pid }});

  if (loading) return <p>Loading...</p>

  if (error) return <p>Error!</p>

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{data.event.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{data.event.type}</Card.Subtitle>
        <Card.Text>
          Scheduled for release on {data.event.release}
        </Card.Text>
        <Link href="/">
          Return home
        </Link>
      </Card.Body>
    </Card>
  )
}

export default Event
