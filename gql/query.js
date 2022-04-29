import { gql } from "@apollo/client";

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

export { GET_EVENT, GET_EVENTS };
