import Link from 'next/link'
import {observer} from "mobx-react";


export default observer((props) => {


})


export async function getServerSideProps(context) {
  return {
    // returns a redirect to an internal page `/another-page`
    redirect: {
      destination: "/" + 'tags/' + context.query.word,
      permanent: false
    }
  }
}