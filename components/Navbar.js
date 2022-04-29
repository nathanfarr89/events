import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { PersonCircle } from 'react-bootstrap-icons';

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`

const Navbar = () => {
  const { data, client } = useQuery(IS_LOGGED_IN);
  const router = useRouter()

  return (
    <div className="flex justify-between self-start">
      <h1>Upcoming Events</h1>
      <DropdownButton id="dropdown-basic-button" title={
        <span className='inline-block mr-1'>
          <PersonCircle />
        </span>
        }>
        <div className="flex flex-col">
          {!data.isLoggedIn &&
            <Dropdown.Item href="/signin">
              Sign In
            </Dropdown.Item>
          }
          {/* {!data.isLoggedIn && 
            <Dropdown.Item href="/signup">
              Sign Up
            </Dropdown.Item>
          } */}
          {data.isLoggedIn &&
            <Dropdown.Item
              onClick={() => {
                localStorage.removeItem('token');
                client.resetStore();
                client.writeData({ data: { isLoggedIn: false } })
                router.push('/')
              }}
            >
              Log Out
            </Dropdown.Item>
          }
        </div>
      </DropdownButton>
    </div>
  )
}

export default Navbar
