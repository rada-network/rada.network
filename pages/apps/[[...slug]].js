import {observer} from "mobx-react";

export default function AppSlug(props) {
  
}


export async function getServerSideProps(context) {
  console.log(context.params)
  if (context.params.slug){
    return {
      // returns a redirect to an internal page `/another-page`
      redirect: {
        destination: "/" + context.params.slug.join("/"),
        permanent: false
      }
    }
  }
  else{
    return {
      // returns a redirect to an internal page `/another-page`
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

}