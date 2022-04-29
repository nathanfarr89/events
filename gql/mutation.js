import { gql } from '@apollo/client'

const NEW_EVENT = gql`
  mutation newEvent($name: String!, $type: String!, $release: String!) {
    newEvent(name: $name, type: $type, release: $release) {
      id
      name
      type
      release
    }
  }
`;

const EDIT_EVENT = gql`
  mutation updateEvent($id: ID!, $release: String!) {
    updateEvent(id: $id, release: $release) {
      id
      name
      type
      release
    }
  }
`;

const DELETE_EVENT = gql`
  mutation deleteEvent($id: ID!) {
    deleteEvent(id: $id)
  }
`;

export { DELETE_EVENT, EDIT_EVENT, NEW_EVENT };
