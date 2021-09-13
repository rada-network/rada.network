export default function Privacy(props){
  return (
    <>
    <h1>Rada Privacy</h1>
    </>
  )
}

export async function getStaticProps(context) {
  return {
    // returns a redirect to an internal page `/another-page`
    props : {}
  }
}