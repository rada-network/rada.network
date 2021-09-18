import Link from 'next/link'
import {observer} from "mobx-react";

export default function HowToRemoveUser(props){
  return (
    <>
    <h1>How to remove user</h1>
    </>
  )
}


export async function getStaticProps(context) {
  return {
    // returns a redirect to an internal page `/another-page`
    props : {},
  }
}