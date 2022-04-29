import React from 'react';
import { useRouter } from 'next/router'
import { useMutation, useApolloClient, gql } from '@apollo/client';
import UserForm from '../components/UserForm'

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`

const SignUp = () => {
  const client = useApolloClient();
  const router = useRouter()
  
  const [signUp, { loading, error}] = useMutation(SIGNUP_USER, {
    onCompleted: data => {
      localStorage.setItem('token', data.signUp)
      client.writeData({ data: { isLoggedIn: true } })
      router.push('/')
    }
  })


  return (
    <div>
      <UserForm action={signUp} formType="signup" />
      {loading && <p>Loading...</p>}
      {error && <p>Error creating an account!</p>}
    </div>
  )
}

export default SignUp;
