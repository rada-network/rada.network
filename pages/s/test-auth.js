import React from 'react'
import { useSession } from 'next-auth/client'
import AccessDenied from '../../components/AccessDenied'
import { signOut } from 'next-auth/client'

export default function Page () {
  const [ session, loading ] = useSession()

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session) { return <AccessDenied/> }

  // If session exists, display content
  return (
    <>
      <h1>Protected Page</h1>
      <p><strong>Welcome {session.user.name}</strong></p>

      <p>
        <a href="/api/auth/signout"
           onClick={(e) => {
           e.preventDefault()
           signOut()
        }}>Sign Out</a>
      </p>
    </>
  )
}

export async function getStaticProps(context) {
  console.log(context)
  return { 
    props: {}
  }
}