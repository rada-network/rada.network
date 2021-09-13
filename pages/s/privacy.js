import Link from 'next/link'
import {observer} from "mobx-react";


export default observer((props) => {
  return (
    <>
    <h1>Privacy</h1>
    </>
  )
})


export async function getStaticProps(context) {
  return {
    // returns a redirect to an internal page `/another-page`
    props : {},
  }
}