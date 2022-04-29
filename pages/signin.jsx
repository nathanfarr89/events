import React from 'react'
import { useRouter } from 'next/router'
import { useMutation, useApolloClient, gql } from '@apollo/client';
import UserForm from '../components/UserForm'

const SIGNIN_USER = gql`
  mutation signIn($email: String, $password: String!) {
    signIn(email: $email, password: $password)
  }
`

const SignIn = () => {
  const client = useApolloClient();
  const router = useRouter()

  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: data => {
      localStorage.setItem('token', data.signIn);
      client.writeData({ data: { isLoggedIn: true } });
      router.push('/');
    }
  })

  return (
    <div>
      <UserForm action={signIn} formType="signIn" />
      {loading && <p>Loading...</p>}
      {error && <p>Error signing in!</p>}
    </div>
  )
}

export default SignIn
